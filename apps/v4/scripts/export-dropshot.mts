/**
 * Dropshot 내보내기 — 이 포크의 컴포넌트를 `ds-dropshot` 폴더 모양으로 뽑는다.
 *
 *   ../../node_modules/.bin/tsx ./scripts/export-dropshot.mts
 *
 * 입력  apps/v4/styles/base-nova/ui/*.tsx      (registry:build 산출물)
 * 출력  dropshot-export/packages/design-system/…
 *
 * `ds-dropshot` 패키지 구조를 그대로 뜬다. 그래서 결과물을 드롭샷 저장소 루트에
 * 겹쳐 놓기만 하면 자리가 맞는다.
 *
 *   packages/design-system/components/<Pascal>/<Pascal>.tsx
 *   packages/design-system/stories/<Pascal>/<Pascal>.stories.ts
 *
 * 무엇을 바꾸나
 *   1. 파일 이름·폴더        bubble.tsx        → Bubble/Bubble.tsx
 *   2. cn 의 출처            @/lib/utils       → @configs/tailwind
 *   3. 형제 컴포넌트 import  @/styles/…/button → ../Button/Button
 *   4. default export 추가   기존 named export 는 그대로 둔다
 *
 * 이름이 겹치는 여섯 개(Button·Skeleton·Spinner·Switch·Toast·Tooltip)도 함께 낸다.
 * **덮어쓰면 안 된다.** 손으로 합칠 대상이라 MERGE-REQUIRED.md 에 따로 정리한다.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const V4 = path.resolve(HERE, "..")
const SRC = path.join(V4, "styles/base-nova/ui")
const OUT = path.resolve(V4, "../../dropshot-export")

/** `ds-dropshot` 에 이미 있는 컴포넌트. 덮지 말고 합쳐야 한다. */
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

/** `export { A, B }` 와 `export const/function X` 에서 심볼을 걷는다. */
function exportedSymbols(source: string) {
  const out = new Set<string>()
  for (const m of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const raw of m[1].split(",")) {
      const sym = raw.trim().split(/\s+as\s+/).pop()?.trim()
      if (sym) out.add(sym)
    }
  }
  for (const m of source.matchAll(
    /export\s+(?:function|const|class)\s+(\w+)/g
  )) {
    out.add(m[1])
  }
  return out
}

function transform(source: string, self: string) {
  let out = source

  out = out.replace(/from\s+"@\/lib\/utils"/g, 'from "@configs/tailwind"')

  out = out.replace(
    /from\s+"@\/styles\/base-nova\/ui\/([a-z0-9-]+)"/g,
    (_all, kebab: string) => {
      const P = pascal(kebab)
      return `from "../${P}/${P}"`
    }
  )

  for (const [alias, info] of Object.entries(COLOCATED)) {
    const rel = info.file.replace(/\.tsx?$/, "")
    out = out.replace(
      new RegExp(`from\\s+"${alias.replace(/[/@-]/g, "\\$&")}"`, "g"),
      `from "./${rel}"`
    )
  }

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

/** `<Button variant="ghost" size="icon">` 에서 넘기는 prop 과 값을 걷는다. */
function usageOf(component: string, source: string) {
  const props = new Map<string, Set<string>>()
  const re = new RegExp(`<${component}\\b([^>]*?)/?>`, "gs")
  for (const m of source.matchAll(re)) {
    for (const p of m[1].matchAll(/(\w[\w-]*)=(?:"([^"]*)"|\{([^}]*)\})/g)) {
      const name = p[1]
      const value = (p[2] ?? p[3] ?? "").trim()
      if (!props.has(name)) props.set(name, new Set())
      if (value && value.length < 40) props.get(name)!.add(value)
    }
  }
  return props
}

// ── 실행 ──────────────────────────────────────────────────────────────────
fs.rmSync(OUT, { recursive: true, force: true })

const files = fs
  .readdirSync(SRC)
  .filter((f) => f.endsWith(".tsx"))
  .sort()

/** `ds-dropshot` 패키지 루트. 드롭샷 저장소 루트에 그대로 겹쳐 놓을 수 있게 뜬다. */
const PKG = path.join(OUT, "packages/design-system")
const ROOT = path.join(PKG, "components")
const STORIES = path.join(PKG, "stories")
const written: string[] = []
const mergeNeeded: string[] = []
const noDefault: string[] = []
/** 겹치는 컴포넌트를 쓰는 곳: 컴포넌트 → (파일 → prop 사용) */
const dependents = new Map<string, Map<string, Map<string, Set<string>>>>()

for (const file of files) {
  const kebab = file.replace(/\.tsx$/, "")
  const P = pascal(kebab)
  const source = fs.readFileSync(path.join(SRC, file), "utf8")
  const code = transform(source, P)

  if (!/export\s+default/.test(code)) noDefault.push(P)
  if (EXISTING.has(P)) mergeNeeded.push(P)

  const dir = path.join(ROOT, P)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${P}.tsx`), code)
  written.push(P)

  // 스토리도 같은 규칙으로 만든다 — stories/<Pascal>/<Pascal>.stories.ts
  const def = code.match(/export default (\w+)\s*$/m)?.[1]
  const named = [...exportedSymbols(code)].find(
    (s) => s.toLowerCase() === P.toLowerCase()
  )
  const target = def ?? named
  if (target) {
    const importLine = def
      ? `import ${def} from '@ds-dropshot/components/${P}/${P}';`
      : `import { ${named} } from '@ds-dropshot/components/${P}/${P}';`
    const storyDir = path.join(STORIES, P)
    fs.mkdirSync(storyDir, { recursive: true })
    fs.writeFileSync(
      path.join(storyDir, `${P}.stories.ts`),
      [
        importLine,
        "import type { Meta, StoryObj } from '@storybook/nextjs';",
        "",
        "const meta = {",
        `  title: 'components/${P}',`,
        `  component: ${target},`,
        "  parameters: {",
        "    layout: 'centered',",
        "  },",
        "  tags: ['autodocs'],",
        `} satisfies Meta<typeof ${target}>;`,
        "export default meta;",
        "",
        "type Story = StoryObj<typeof meta>;",
        "",
        "// ! args 는 비어 있다. 컴포넌트마다 필수 prop 이 달라 자동으로 채우지 않았다.",
        "export const Default = {",
        "  args: {},",
        "} satisfies Story;",
        "",
      ].join("\n")
    )
  }

  // 이 파일이 겹치는 컴포넌트를 쓰는지
  for (const dep of EXISTING) {
    if (dep === P) continue
    if (!code.includes(`../${dep}/${dep}`)) continue
    const use = usageOf(dep, code)
    if (!dependents.has(dep)) dependents.set(dep, new Map())
    dependents.get(dep)!.set(P, use)
  }
}

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
  exportsMap[`./${key}`] = `./components/${P}/${P}.tsx`
}
fs.writeFileSync(
  path.join(OUT, "package.exports.json"),
  JSON.stringify({ exports: exportsMap }, null, 2) + "\n"
)

// 손으로 합쳐야 하는 것 정리
const merge: string[] = [
  "# 손으로 합쳐야 하는 컴포넌트",
  "",
  "`ds-dropshot` 에 같은 이름이 이미 있다. **덮어쓰지 마라.** 제품 코드가 기존 API",
  "(`themeColor` 등)를 쓰고 있어 그대로 바꾸면 호출부가 깨진다.",
  "",
  "shadcn 쪽에서 가져올 것은 **형태(px 값)** 뿐이다. 색·글꼴·prop 이름은 드롭샷 것을",
  "유지한다. 규칙은 `dropshot-pilot/RULES.md` 에 있다.",
  "",
  "## `@base-ui/react` 는 들이기로 정했다",
  "",
  "아래 표에 `render`·`nativeButton` 이 보이면 그건 `@base-ui/react` 의 prop 이다.",
  "드롭샷에는 이 의존성이 없어 한때 걷어낼지 고민했는데, **62개 중 38개**가 이 부품을",
  "쓴다. 걷어내려면 38개를 다시 써야 하고 그중에 대화상자·드롭다운·셀렉트·툴팁·",
  "슬라이더가 들어 있다 — 포커스 가두기와 위치 계산은 직접 만들면 거의 틀리는 자리다.",
  "",
  "그래서 `packages/design-system/package.json` 에 한 줄을 더한다.",
  "",
  '```json',
  '"@base-ui/react": "^1.6.0"',
  "```",
  "",
  "**대신 이 부품에서 얻는 게 `render`(다른 태그로 그리기)뿐인 컴포넌트는 계속 걷어낸다.**",
  "`dropshot-pilot/` 의 Badge·Separator·Toggle 이 그렇게 만든 예다.",
  "",
]
for (const P of mergeNeeded) {
  merge.push(`## ${P}`, "")
  const deps = dependents.get(P)
  if (!deps || deps.size === 0) {
    merge.push("이 내보내기 안에서 이 컴포넌트를 쓰는 곳은 없다. 형태만 비교하면 된다.", "")
    continue
  }
  merge.push(
    `내보낸 컴포넌트 ${deps.size}곳이 이걸 **shadcn API 로** 쓴다. 합친 결과가 아래를`,
    "전부 받아 줘야 한다.",
    ""
  )
  const all = new Map<string, Set<string>>()
  for (const use of deps.values()) {
    for (const [k, vs] of use) {
      if (!all.has(k)) all.set(k, new Set())
      for (const v of vs) all.get(k)!.add(v)
    }
  }
  merge.push("| prop | 넘기는 값 |", "| --- | --- |")
  for (const [k, vs] of [...all].sort()) {
    merge.push(`| \`${k}\` | ${[...vs].sort().map((v) => `\`${v}\``).join(", ") || "—"} |`)
  }
  merge.push("", `쓰는 곳: ${[...deps.keys()].sort().join(", ")}`, "")
}
fs.writeFileSync(path.join(OUT, "MERGE-REQUIRED.md"), merge.join("\n"))

fs.writeFileSync(
  path.join(OUT, "README.md"),
  [
    "# Dropshot 내보내기 결과",
    "",
    "`shadcn-ui` 포크에서 `apps/v4/scripts/export-dropshot.mts` 로 뽑은 것이다.",
    "손으로 고치지 마라 — 다시 뽑으면 지워진다. 고칠 것은 포크 쪽 원본을 고친다.",
    "",
    "`ds-dropshot` 패키지 구조를 그대로 떴다. 경로가 이미 맞으므로 드롭샷 저장소",
    "루트에 겹쳐 놓기만 하면 된다.",
    "",
    "```",
    "packages/design-system/components/Badge/Badge.tsx",
    "packages/design-system/stories/Badge/Badge.stories.ts",
    "packages/design-system/dropshot-ui.css",
    "```",
    "",
    "## 옮기는 법",
    "",
    `1. \`packages/\` 를 드롭샷 저장소 루트에 겹쳐 놓는다. 단 **MERGE-REQUIRED.md 에`,
    `   적힌 ${mergeNeeded.length}개 폴더는 빼고** 옮긴다 (기존 것을 덮으면 안 된다)`,
    "2. `package.exports.json` 의 항목을 `packages/design-system/package.json` 의",
    "   `exports` 에 합치기",
    '3. 같은 `package.json` 의 `dependencies` 에 `"@base-ui/react": "^1.6.0"` 추가',
    "   (이유는 MERGE-REQUIRED.md 에 적어 두었다)",
    "4. `dropshot-ui.css` 를 앱의 전역 CSS 에서 한 번 import",
    "",
    "## 먼저 읽을 것",
    "",
    `- \`MERGE-REQUIRED.md\` — 이름이 겹치는 ${mergeNeeded.length}개. 덮지 말고 합쳐야 한다`,
    "- `../dropshot-pilot/RULES.md` — 드롭샷 코드 규칙과 토큰 매핑표",
    "",
    "**이 결과물은 아직 드롭샷 코드 규칙으로 다시 쓰이지 않았다.** shadcn 원형에서",
    "경로·import·export 만 맞춘 상태다. 색·글꼴·prop 이름을 드롭샷 것으로 바꾸는",
    "작업은 `dropshot-pilot/` 에 예시가 있다.",
    "",
  ].join("\n")
)

console.log(`\n내보내기 완료 → ${OUT}`)
console.log(
  `  컴포넌트 ${written.length}개  packages/design-system/components/<Pascal>/<Pascal>.tsx`
)
console.log(
  `  손으로 합쳐야 하는 것 ${mergeNeeded.length}개 → MERGE-REQUIRED.md (${mergeNeeded.join(", ")})`
)
if (noDefault.length) {
  console.log(
    `  default export 없음 ${noDefault.length}개 — 파일명과 같은 심볼이 없다: ${noDefault.join(", ")}`
  )
}
