/**
 * 이식한 컴포넌트가 드롭샷 규칙을 지키는지 검사한다.
 *
 *   cd dropshot-pilot/verify
 *   ../../node_modules/.bin/tsx ./check-rules.mts [검사할 폴더]
 *
 * 기본값은 `dropshot-pilot/components` 다. 폴더를 넘기면 그쪽을 본다.
 *
 * 타입 검사는 따로다.
 *   ../../node_modules/.bin/tsc --noEmit -p tsconfig.json
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const TARGET = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(HERE, "../components")

// ── 드롭샷 토큰 (configs/tailwind/src 에서 옮겨 적은 것) ────────────────────
const COLOR_SCALES: Record<string, number[]> = {
  primary: [900, 800, 700, 600, 500, 400, 300, 200, 100, 75, 50, 25],
  grayscale: [950, 900, 850, 800, 700, 600, 500, 400, 300, 200, 100, 75, 50],
}
const SECONDARY = ["blue", "red", "green", "pink", "orange"]
const SECONDARY_STEPS = [900, 800, 700, 600, 500, 400, 300, 200, 100]
const FLAT_COLORS = new Set([
  "white",
  "black",
  "alert",
  "info",
  "transparent",
  "inherit",
  "current",
  "emphasisHigh",
  "emphasisMedium",
  "emphasisLow",
])
const TYPO = new Set(
  (
    [
      ["headline", 7],
      ["subtitle", 4],
      ["body", 3],
      ["button", 4],
      ["caption", 2],
    ] as const
  ).flatMap(([k, n]) =>
    Array.from({ length: n }, (_, i) => `font-${k}${i + 1}`)
  )
)
const RADIUS = new Set([
  ...Array.from({ length: 6 }, (_, i) => `rounded-${i + 1}`),
  "rounded-full",
  "rounded-none",
])
/** `configs/tailwind/tailwind.config.ts` 가 기본 팔레트에서 지운 색 */
const DELETED_PALETTES = [
  "gray",
  "blue",
  "lightBlue",
  "warmGray",
  "trueGray",
  "coolGray",
  "blueGray",
]

/**
 * `error` — 드롭샷에서 확실히 동작하지 않는다. 고쳐야 한다.
 * `review` — 기계가 옳고 그름을 판단할 수 없다. 사람이 한 번 봐야 한다.
 */
type Severity = "error" | "review"
type Finding = { file: string; rule: string; detail: string; severity: Severity }
const findings: Finding[] = []
const add = (
  file: string,
  rule: string,
  detail: string,
  severity: Severity = "error"
) => findings.push({ file, rule, detail, severity })

/** 주석을 걷어낸다. 규칙 설명에 예시로 적은 문법이 오탐이 되지 않게. */
function stripComments(source: string) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((l) => !l.trim().startsWith("//"))
    .join("\n")
}

function check(file: string, raw: string) {
  const s = stripComments(raw)
  const rel = path.relative(TARGET, file)

  // 1. 반응형 접두사 — 드롭샷은 max 기준이라 shadcn 과 뜻이 뒤집힌다
  for (const m of s.matchAll(/\b(xs|sm|md|lg|xl|xxl|2xl):[a-z[]/g)) {
    add(
      rel,
      "반응형 접두사",
      `\`${m[1]}:\` — 드롭샷은 max-width 기준(데스크톱 우선)이다. shadcn 원본을 그대로 옮겼다면 뜻이 반대다`,
      "review"
    )
  }

  // 2. 색 토큰
  for (const m of s.matchAll(
    /\b(?:bg|text|border|ring|shadow|from|to|via|fill|stroke|divide|outline|decoration|accent|caret)-((?:secondary-)?[a-zA-Z]+(?:-\d+)?)\b/g
  )) {
    const tok = m[1]
    if (FLAT_COLORS.has(tok)) continue
    if (tok.startsWith("secondary-")) {
      const [, fam, step] = tok.split("-")
      if (!SECONDARY.includes(fam) || !SECONDARY_STEPS.includes(Number(step))) {
        add(rel, "없는 색", `\`${tok}\``)
      }
      continue
    }
    const dash = tok.lastIndexOf("-")
    if (dash < 0) continue // 유틸리티 이름일 뿐 색이 아니다 (bg-clip 등)
    const fam = tok.slice(0, dash)
    const step = Number(tok.slice(dash + 1))
    if (!(fam in COLOR_SCALES)) continue
    if (!COLOR_SCALES[fam].includes(step)) {
      add(rel, "없는 색 단계", `\`${tok}\` — ${fam} 는 ${COLOR_SCALES[fam].join("·")} 만 있다`)
    }
  }

  // 3. 드롭샷이 지운 기본 팔레트
  for (const p of DELETED_PALETTES) {
    const re = new RegExp(`\\b(?:bg|text|border|ring)-${p}-\\d+\\b`, "g")
    for (const m of s.matchAll(re)) {
      add(rel, "지워진 팔레트", `\`${m[0]}\` — 드롭샷 설정이 ${p} 를 지웠다`)
    }
  }

  // 4. 글꼴·반경
  for (const m of s.matchAll(
    /\bfont-(?:headline|subtitle|body|button|caption)\d+\b/g
  )) {
    if (!TYPO.has(m[0])) add(rel, "없는 글꼴", `\`${m[0]}\``)
  }
  for (const m of s.matchAll(/\brounded-(?:\w+)\b/g)) {
    if (m[0].startsWith("rounded-[")) continue
    if (!RADIUS.has(m[0])) {
      add(rel, "없는 반경", `\`${m[0]}\` — rounded-1~6 · full · none 만 있다`)
    }
  }

  // 5. Tailwind v4 전용 문법 — 드롭샷은 v3 다
  const V4: [RegExp, string][] = [
    [/\*\*:/g, "`**:` 하위 전체 선택자"],
    [/\*:\[/g, "`*:[…]` 직계 자식 선택자"],
    [/\bsize-\d[\d.]*!/g, "`size-4!` 뒤에 붙는 중요 표시"],
    [/\bhas-data-\[/g, "`has-data-[…]`"],
    [/\bin-data-\[/g, "`in-data-[…]`"],
    [/\bnot-aria-\[/g, "`not-aria-[…]`"],
    [/\bdata-(?:horizontal|vertical|open|closed|checked)\s*:/g, "`data-…:` 축약형"],
    [/\baria-invalid:/g, "`aria-invalid:` 변형"],
    [/\bring-3\b/g, "`ring-3`"],
    [/\bunderline-offset-3\b/g, "`underline-offset-3`"],
  ]
  for (const [re, label] of V4) {
    if (re.test(s)) add(rel, "v4 전용 문법", label)
  }

  /**
   * 6. 클래스 안의 큰따옴표.
   *
   * `[&_svg:not([class*="size-"])]:size-4` 처럼 클래스 문자열에 `"` 가 들어가면
   * 렌더된 `class="..."` 속성이 거기서 닫힌다. **그 뒤 클래스가 통째로 사라진다.**
   * 컴파일도 되고 타입 검사도 통과하므로 화면을 봐야만 알아챈다 — 실제로 여백이
   * 사라진 채로 한참 갔다. shadcn 원본은 작은따옴표를 쓴다.
   */
  for (const m of s.matchAll(/\[[^\]]*\*="[^"]*"[^\]]*\]/g)) {
    add(
      rel,
      "클래스 안 큰따옴표",
      `\`${m[0]}\` — 렌더된 class 속성이 여기서 닫혀 뒤 클래스가 사라진다. 작은따옴표를 쓴다`
    )
  }

  // 7. 코드 규칙
  if (/export\s+default/.test(s)) {
    add(rel, "export 규칙", "`export default` 대신 파일 맨 아래 named export 로 모은다")
  }
  for (const m of s.matchAll(/import\s*\{[^}]*\btype\s+\w/g)) {
    add(rel, "type import", "`import type { … }` 으로 분리한다 (consistent-type-imports)")
  }
  if (/:\s*any\b/.test(s)) {
    add(rel, "any 금지", "`typescript/no-explicit-any` 가 error 다")
  }
}

// ── 실행 ──────────────────────────────────────────────────────────────────
const files: string[] = []
const walk = (dir: string) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith(".tsx")) files.push(p)
  }
}
walk(TARGET)

for (const f of files) check(f, fs.readFileSync(f, "utf8"))

console.log(`\n검사 대상 ${files.length}개 — ${TARGET}`)

const report = (severity: Severity, label: string) => {
  const rows = findings.filter((f) => f.severity === severity)
  const byFile = new Map<string, Finding[]>()
  for (const f of rows) {
    if (!byFile.has(f.file)) byFile.set(f.file, [])
    byFile.get(f.file)!.push(f)
  }
  if (rows.length === 0) {
    console.log(`\n${label}: 없음`)
    return 0
  }
  console.log(`\n${label} ${rows.length}건 · 파일 ${byFile.size}개`)
  for (const [file, list] of [...byFile].sort()) {
    console.log(`  ${file}`)
    const seen = new Set<string>()
    for (const f of list) {
      const key = `${f.rule}|${f.detail}`
      if (seen.has(key)) continue
      seen.add(key)
      console.log(`    [${f.rule}] ${f.detail}`)
    }
  }
  return byFile.size
}

report("error", "고쳐야 하는 것")
report("review", "사람이 봐야 하는 것")
console.log()

// `review` 는 실패로 치지 않는다. 판단이 필요한 자리이지 틀린 곳이 아니다.
if (findings.some((f) => f.severity === "error")) process.exitCode = 1
