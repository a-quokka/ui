/**
 * 변환한 컴포넌트를 실제로 렌더해 한 화면에 모은다.
 *
 *   cd dropshot-pilot/preview
 *   ../../node_modules/.bin/tsx ./gallery.mts
 *   ../../node_modules/.bin/tailwindcss -c ./tailwind.config.js -i ./input.css -o ./gallery.css --minify
 *   ../../node_modules/.bin/tsx ./inline.mts gallery
 *
 * `react-dom/server` 로 서버 렌더한다. 클래스 문자열만 뽑는 것과 달리 **실제 DOM
 * 구조까지** 나오므로, 레이아웃이 깨지는 것도 눈에 보인다.
 *
 * ! 모든 컴포넌트가 이 방식으로 그려지지는 않는다. 열림 상태를 들고 있어야 하는 것
 *   (Dialog·Popover), 브라우저 API 를 부르는 것(Carousel), 필수 prop 이 있는 것은
 *   서버 렌더에서 실패한다. 실패한 것은 목록으로 남긴다 — 숨기지 않는다.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createElement as h } from "react"
import { renderToStaticMarkup } from "react-dom/server"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const COMPONENTS = path.resolve(HERE, "../packages/design-system/components")

/**
 * 화면에 세울 표본. 컴포넌트마다 무엇을 보여 줄지 정해 둔다.
 * 여기 없는 것은 기본 export 를 자식 없이 한 번 그려 본다.
 */
type Spec = { exportName?: string; props?: Record<string, unknown>; children?: unknown }
const SPECS: Record<string, Spec[]> = {
  Alert: [
    { props: {}, children: ["알림 제목과 본문이 이렇게 보입니다."] },
  ],
  Badge: [
    { props: { themeColor: "primary" }, children: ["기본"] },
    { props: { themeColor: "grayscale800" }, children: ["보조"] },
    { props: { themeColor: "red" }, children: ["위험"] },
    { props: { themeColor: "outline" }, children: ["외곽선"] },
  ],
  Separator: [{ props: {} }],
  Toggle: [
    { props: { pressed: false, onPressedChange: () => {} }, children: ["꺼짐"] },
    { props: { pressed: true, onPressedChange: () => {} }, children: ["켜짐"] },
  ],
  Button: [
    { exportName: "InlineButton", props: { themeColor: "primary" }, children: ["버튼"] },
    { exportName: "InlineButton", props: { themeColor: "outline" }, children: ["외곽선"] },
    { exportName: "InlineButton", props: { themeColor: "ghost" }, children: ["고스트"] },
  ],
  Card: [{ props: {}, children: ["카드 안의 내용"] }],
  Kbd: [{ props: {}, children: ["⌘K"] }],
  Label: [{ props: {}, children: ["라벨"] }],
  Input: [{ props: { placeholder: "입력하세요" } }],
  Textarea: [{ props: { placeholder: "여러 줄 입력" } }],
  Table: [{ props: {} }],
  Progress: [{ props: { value: 60 } }],
  Empty: [{ props: {}, children: ["결과가 없습니다"] }],
  AspectRatio: [{ props: { ratio: 16 / 9 }, children: ["16:9"] }],
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

type Result = { name: string; html?: string; error?: string; count: number }
const results: Result[] = []

const dirs = fs.readdirSync(COMPONENTS).sort()

for (const name of dirs) {
  const file = path.join(COMPONENTS, name, `${name}.tsx`)
  const alt = fs.existsSync(file)
    ? file
    : fs.readdirSync(path.join(COMPONENTS, name)).map((f) => path.join(COMPONENTS, name, f))[0]
  let mod: Record<string, unknown>
  try {
    mod = (await import(alt)) as Record<string, unknown>
  } catch (e) {
    results.push({ name, error: `불러오기 실패 — ${(e as Error).message.split("\n")[0]}`, count: 0 })
    continue
  }

  const specs = SPECS[name] ?? [{}]
  const pieces: string[] = []
  let failed: string | undefined
  for (const spec of specs) {
    const key = spec.exportName ?? name
    const Comp = (mod[key] ?? mod.default) as never
    if (typeof Comp !== "function") {
      failed = `\`${key}\` 를 컴포넌트로 부를 수 없다`
      break
    }
    try {
      const el = spec.children
        ? h(Comp, (spec.props ?? {}) as never, ...(spec.children as never[]))
        : h(Comp, (spec.props ?? {}) as never)
      pieces.push(renderToStaticMarkup(el))
    } catch (e) {
      failed = (e as Error).message.split("\n")[0]
      break
    }
  }
  if (failed) results.push({ name, error: failed, count: 0 })
  else results.push({ name, html: pieces.join("\n"), count: pieces.length })
}

// ── 화면 ──────────────────────────────────────────────────────────────────
const ok = results.filter((r) => r.html)
const bad = results.filter((r) => r.error)

const cards = ok
  .map(
    (r) => `
  <section>
    <h2 class="font-subtitle2 text-white">${r.name}</h2>
    <div class="mt-3 rounded-3 bg-grayscale-850 p-5">
      <div class="flex flex-wrap items-center gap-3">${r.html}</div>
    </div>
  </section>`
  )
  .join("")

const failList = bad
  .map(
    (r) => `
    <tr class="rule">
      <td class="py-2.5 pr-6 align-top font-caption1 text-grayscale-300">${r.name}</td>
      <td class="py-2.5 align-top font-caption2 text-grayscale-500">${esc(r.error!)}</td>
    </tr>`
  )
  .join("")

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>변환 결과 갤러리</title>
<link rel="stylesheet" href="./gallery.css">
<style>
  :root { color-scheme: dark; }
  body { background:#15191E; font-family:'Dropshot Sans','Apple SD Gothic Neo','Malgun Gothic',system-ui,sans-serif; }
  .rule { border-top: 1px solid #393E46; }
  .scroll { overflow-x: auto; }
</style>
</head>
<body class="font-body3 text-white antialiased">
  <main class="mx-auto max-w-[1080px] px-6 py-14">
    <header class="mb-10">
      <div class="font-caption2 tracking-widest text-primary-300">드롭샷 디자인 시스템 · 변환 결과</div>
      <h1 class="mt-3 font-headline5 text-white">변환 결과 갤러리</h1>
      <p class="mt-3 max-w-[62ch] font-body3 text-grayscale-400">
        shadcn 컴포넌트 ${results.length}개를 드롭샷 규칙으로 옮긴 결과다.
        <code class="rounded-1 bg-grayscale-800 px-1.5 py-0.5 font-caption1">react-dom/server</code>
        로 실제 렌더했으므로 클래스뿐 아니라 DOM 구조까지 그대로다.
      </p>
      <div class="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-caption1 text-grayscale-500">
        <span>그려진 것 ${ok.length}개</span>
        <span>서버 렌더가 안 되는 것 ${bad.length}개</span>
        <span>규칙 위반 0건</span>
      </div>
    </header>

    <div class="grid gap-8">${cards}</div>

    ${
      bad.length
        ? `<section class="mt-12">
      <h2 class="font-subtitle1 text-white">여기서 그릴 수 없는 것</h2>
      <p class="mt-1.5 max-w-[62ch] font-caption1 text-grayscale-400">
        열림 상태를 들고 있어야 하거나(Dialog·Popover), 브라우저 API 를 부르거나
        (Carousel), 필수 prop 이 있는 컴포넌트다. 변환이 잘못된 것이 아니라 정적
        렌더로는 그릴 수 없는 것이다. 숨기지 않고 적어 둔다.
      </p>
      <div class="mt-5 scroll rounded-3 bg-grayscale-850 p-5">
        <table class="w-full border-collapse text-left">
          <tbody>${failList}</tbody>
        </table>
      </div>
    </section>`
        : ""
    }

    <footer class="rule mt-12 pt-6 font-caption2 text-grayscale-600">
      드롭샷 Tailwind v3 설정을 재현해 만든 화면이다. 클래스가 그 설정에서
      만들어지지 않으면 여기서 티가 난다.
    </footer>
  </main>
</body>
</html>
`

fs.writeFileSync(path.join(HERE, "gallery.html"), html)
fs.writeFileSync(
  path.join(HERE, "input.css"),
  "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n"
)
console.log(`\n갤러리 — 그려진 것 ${ok.length}개 · 못 그린 것 ${bad.length}개`)
for (const r of bad.slice(0, 10)) console.log(`  ${r.name}: ${r.error}`)
