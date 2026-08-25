/**
 * Dropshot 내보내기 — 이 포크의 컴포넌트를 `ds-dropshot` 폴더 모양으로 뽑는다.
 *
 *   ../../node_modules/.bin/tsx ./scripts/export-dropshot.mts
 *
 * 입력  apps/v4/styles/base-nova/ui/*.tsx      (registry:build 산출물)
 * 출력  dropshot-export/components/<Pascal>/<Pascal>.tsx
 *
 * 무엇을 바꾸나
 *   1. 파일 이름·폴더        bubble.tsx        → Bubble/Bubble.tsx
 *   2. cn 의 출처            @/lib/utils       → @configs/tailwind
 *   3. 형제 컴포넌트 import  @/styles/…/button → ../Button/Button
 *   4. default export 추가   기존 named export 는 그대로 둔다
 *
 * `ds-dropshot` 에 이미 있는 이름은 덮지 않는다. `_conflicts/` 로 따로 뺀다.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const V4 = path.resolve(HERE, "..")
const SRC = path.join(V4, "styles/base-nova/ui")
const OUT = path.resolve(V4, "../../dropshot-export")

/**
 * 결과물을 `components/ui/` 아래로 묶는다.
 *
 * `components/` 바로 밑에 풀면 `ds-dropshot` 이 이미 갖고 있는 여섯 개
 * (Button·Skeleton·Spinner·Switch·Toast·Tooltip)와 폴더 이름이 부딪힌다.
 * 게다가 신규 컴포넌트 14곳이 그 여섯 개를 **shadcn 쪽 API 로** 가져다 쓰므로
 * (Sidebar 가 `variant="ghost"` 버튼을 쓰는 식) 같은 자리에 두면 제품이 깨진다.
 * 한 단계만 내리면 두 벌이 나란히 살고 기존 코드는 한 줄도 안 바뀐다.
 */
const GROUP = "ui"

/** `ds-dropshot` 에 이미 있는 컴포넌트. 안내에만 쓴다 — `ui/` 아래라 부딪히지 않는다. */
const EXISTING = new Set([
  "Button",
  "Dropdown",
  "ExpandableText",
  "Orbit",
  "SegmentedControl",
  "Skeleton",
  "Spinner",
  "Switch",
  "Toast",
  "Tooltip",
])

/** 컴포넌트 폴더 안에 같이 넣어 주는 파일. 별도 hooks 디렉터리를 만들지 않는다. */
const COLOCATED: Record<string, { owner: string; file: string }> = {
  "@/hooks/use-mobile": { owner: "Sidebar", file: "useMobile.ts" },
}

const pascal = (name: string) =>
  name
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("")

/** `export { A, B }` 와 `export default X` 에서 심볼을 걷는다. */
function exportedSymbols(source: string) {
  const out = new Set<string>()
  for (const m of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const raw of m[1].split(",")) {
      const sym = raw.trim().split(/\s+as\s+/).pop()?.trim()
      if (sym) out.add(sym)
    }
  }
  for (const m of source.matchAll(/export\s+(?:function|const|class)\s+(\w+)/g)) {
    out.add(m[1])
  }
  return out
}

function transform(source: string, self: string) {
  let out = source

  // cn 의 출처를 Dropshot 것으로
  out = out.replace(
    /from\s+"@\/lib\/utils"/g,
    'from "@configs/tailwind"'
  )

  // 형제 컴포넌트 import 를 상대경로로
  out = out.replace(
    /from\s+"@\/styles\/base-nova\/ui\/([a-z0-9-]+)"/g,
    (_all, kebab: string) => {
      const P = pascal(kebab)
      return `from "../${P}/${P}"`
    }
  )

  // 같은 폴더에 넣어 주는 파일
  for (const [alias, info] of Object.entries(COLOCATED)) {
    const rel = info.file.replace(/\.tsx?$/, "")
    out = out.replace(
      new RegExp(`from\\s+"${alias.replace(/[/@-]/g, "\\$&")}"`, "g"),
      `from "./${rel}"`
    )
  }

  // default export 추가 — 파일 이름과 같은 심볼이 있을 때만
  const symbols = exportedSymbols(out)
  // `input-otp` → `InputOTP` 처럼 대소문자가 어긋나는 경우가 있어 무시하고도 찾는다
  const primary =
    [...symbols].find((s) => s === self) ??
    [...symbols].find((s) => s.toLowerCase() === self.toLowerCase())
  if (primary && !/export\s+default/.test(out)) {
    out = `${out.trimEnd()}\n\nexport default ${primary}\n`
  }
  return out
}

// ── 실행 ──────────────────────────────────────────────────────────────────
fs.rmSync(OUT, { recursive: true, force: true })

const files = fs
  .readdirSync(SRC)
  .filter((f) => f.endsWith(".tsx"))
  .sort()

const written: string[] = []
const sameName: string[] = []
const noDefault: string[] = []
const ROOT = path.join(OUT, "components", GROUP)

for (const file of files) {
  const kebab = file.replace(/\.tsx$/, "")
  const P = pascal(kebab)
  const source = fs.readFileSync(path.join(SRC, file), "utf8")
  const code = transform(source, P)

  if (!/export\s+default/.test(code)) noDefault.push(P)
  if (EXISTING.has(P)) sameName.push(P)

  const dir = path.join(ROOT, P)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${P}.tsx`), code)
  written.push(P)
}

// 같은 폴더에 넣어 주는 파일 복사
for (const [alias, info] of Object.entries(COLOCATED)) {
  const from = path.join(V4, `${alias.replace("@/", "")}.ts`)
  const to = path.join(ROOT, info.owner, info.file)
  if (fs.existsSync(from) && fs.existsSync(path.dirname(to))) {
    fs.copyFileSync(from, to)
  }
}

// package.json 에 붙일 exports 조각
const exportsMap: Record<string, string> = {}
for (const P of written) {
  const key = P.charAt(0).toLowerCase() + P.slice(1)
  exportsMap[`./${GROUP}/${key}`] = `./components/${GROUP}/${P}/${P}.tsx`
}
fs.writeFileSync(
  path.join(OUT, "package.exports.json"),
  JSON.stringify({ exports: exportsMap }, null, 2) + "\n"
)

fs.writeFileSync(
  path.join(OUT, "README.md"),
  [
    "# Dropshot 내보내기 결과",
    "",
    "`shadcn-ui` 포크에서 `apps/v4/scripts/export-dropshot.mts` 로 뽑은 것이다.",
    "손으로 고치지 마라 — 다시 뽑으면 지워진다. 고칠 것은 포크 쪽 원본을 고친다.",
    "",
    "## 옮기는 법",
    "",
    "1. `components/ui/` 폴더를 통째로 `packages/design-system/components/` 에 복사",
    "2. `package.exports.json` 의 항목을 `packages/design-system/package.json` 의",
    "   `exports` 에 합치기",
    "3. `dropshot-ui.css` 를 앱의 전역 CSS 에서 한 번 import",
    "",
    "**기존 파일은 하나도 바뀌지 않는다.** `components/ui/` 는 새로 생기는",
    "폴더이고, 기존 열 개는 `components/Button/` 처럼 원래 자리에 그대로 있다.",
    "",
    "## 왜 `ui/` 한 단계가 더 있나",
    "",
    "`components/` 바로 밑에 풀면 `ds-dropshot` 이 이미 갖고 있는 여섯 개와",
    "폴더 이름이 부딪힌다. 게다가 여기 신규 컴포넌트 14곳이 그 여섯 개를",
    "**shadcn 쪽 API 로** 가져다 쓴다 — 예를 들어 `Sidebar` 는 `variant=\"ghost\"`",
    "버튼을 쓰는데 Dropshot 의 `Button` 은 `themeColor` 를 요구한다. 같은 자리에",
    "두면 제품이 깨진다. 한 단계 내리면 두 벌이 나란히 산다.",
    "",
    `- 내보낸 컴포넌트 ${written.length}개`,
    `- 그중 이름이 같은 것 ${sameName.length}개 — ${sameName.join(", ")}`,
    "  제품 코드는 계속 기존 것을 쓰면 된다. 여기 것은 신규 컴포넌트의",
    "  내부 의존성으로만 쓰인다.",
    "",
  ].join("\n")
)

console.log(`\n내보내기 완료 → ${OUT}`)
console.log(`  컴포넌트 ${written.length}개  components/${GROUP}/`)
console.log(
  `  이름이 겹치는 것 ${sameName.length}개 (${sameName.join(", ")}) — ${GROUP}/ 아래라 부딪히지 않는다`
)
if (noDefault.length) {
  console.log(
    `  default export 없음 ${noDefault.length}개 — 파일명과 같은 심볼이 없다: ${noDefault.join(", ")}`
  )
}
