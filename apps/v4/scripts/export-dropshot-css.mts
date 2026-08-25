/**
 * 내보낸 컴포넌트가 쓰는 스타일을 **완성된 CSS 한 장**으로 컴파일한다.
 *
 *   ../../node_modules/.bin/tsx ./scripts/export-dropshot-css.mts
 *
 * 왜 필요한가
 *   Dropshot 모노레포는 전부 Tailwind v3 이고 이 포크는 v4 다. 내보낸 컴포넌트에는
 *   `ring-3`·`in-data-[…]`·`**:data-[…]` 처럼 v3 가 아예 못 읽는 문법이 들어 있다.
 *   그래서 클래스를 v3 에게 만들라고 시키는 대신, 여기서 v4 로 미리 다 만들어
 *   CSS 파일로 넘긴다. 앱은 그 파일을 한 번 import 하기만 하면 된다.
 *
 * preflight(전역 리셋)는 넣지 않는다. 호스트 앱의 기존 스타일을 건드리지 않기 위해서다.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"
import tailwind from "@tailwindcss/postcss"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const V4 = path.resolve(HERE, "..")
const OUT = path.resolve(V4, "../../dropshot-export")
const PKG = path.join(OUT, "packages/design-system")
const GLOBALS = path.join(V4, "app/globals.css")

if (!fs.existsSync(path.join(PKG, "components"))) {
  console.error("먼저 export-dropshot.mts 를 돌려라. 내보낸 컴포넌트가 없다.")
  process.exit(1)
}

const g = fs.readFileSync(GLOBALS, "utf8")

/** 중괄호 짝을 세어 블록 하나를 통째로 떼어 온다. */
function block(start: string) {
  const i = g.indexOf(start)
  if (i < 0) return ""
  let k = g.indexOf("{", i)
  let depth = 0
  for (; k < g.length; k++) {
    if (g[k] === "{") depth++
    else if (g[k] === "}" && --depth === 0) break
  }
  return g.slice(i, k + 1)
}

/**
 * `@layer base` 안의 `.cn-*` 규칙. 컴포넌트가 이 이름을 클래스로 직접 쓴다
 * (예: AlertDialog 의 `cn-font-heading`). 빠뜨리면 그 자리만 스타일이 없다.
 * `@layer base` 통째로 가져오면 문서 사이트용 전역 규칙까지 따라오므로
 * `.cn-` 으로 시작하는 규칙만 골라 낸다.
 */
function cnBaseRules() {
  const base = block("@layer base")
  const out: string[] = []
  for (const m of base.matchAll(/\.cn-[a-z-]+\s*\{[^}]*\}/g)) out.push(m[0])
  return out
}

const parts = [
  ...[...g.matchAll(/@font-face\s*\{[^}]*\}/g)].map((m) => m[0]),
  "@custom-variant dark (&:is(.dark *));",
  block("@theme inline"),
  block(":root {"),
  block(".dark {"),
  ...(cnBaseRules().length
    ? [`@layer base {\n  ${cnBaseRules().join("\n  ")}\n}`]
    : []),
].filter(Boolean)

const input = `/* Dropshot UI — 미리 컴파일한 스타일. 손으로 고치지 마라. */
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@source "${path.join(PKG, "components")}";

${parts.join("\n\n")}
`

// 빌드는 반드시 apps/v4 안에서 돈다. 저장소 루트의 tailwindcss 는 v3 이고
// v4 는 apps/v4/node_modules 에만 있어서, 밖에서 돌리면 v3 가 잡힌다.
const buildDir = path.join(V4, ".dropshot-css-build")
fs.mkdirSync(buildDir, { recursive: true })
const inputPath = path.join(buildDir, "input.css")
fs.writeFileSync(inputPath, input)

const outPath = path.join(PKG, "dropshot-ui.css")
const result = await postcss([tailwind()]).process(input, {
  from: inputPath,
  to: outPath,
})

fs.writeFileSync(outPath, result.css)
const kb = (result.css.length / 1024).toFixed(0)
console.log(`\ndropshot-ui.css 생성 — ${kb} KB`)
