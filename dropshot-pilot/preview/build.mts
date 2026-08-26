/**
 * 비교 화면을 만든다.
 *
 *   cd dropshot-pilot/preview
 *   ../../node_modules/.bin/tsx ./build.mts
 *   ../../node_modules/.bin/tailwindcss -i ./input.css -o ./out.css --minify
 *   ../../node_modules/.bin/tsx ./inline.mts
 *
 * 클래스 문자열은 **실제 컴포넌트에서 뽑는다.** 손으로 옮겨 적으면 화면과 코드가
 * 어긋나므로 `inlineButtonVariants` 를 그대로 부른다.
 *
 * 드롭샷 `Button` 쪽은 그 저장소를 읽어 옮겨 적었다 (읽기 전용). 비교 대상이라
 * 값이 바뀌면 여기도 같이 고쳐야 한다.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { cva } from "class-variance-authority"
import { cn } from "@configs/tailwind"
import { inlineButtonVariants } from "../components/Button/InlineButton"

const HERE = path.dirname(fileURLToPath(import.meta.url))

/**
 * 드롭샷 `packages/design-system/components/Button/Button.tsx` 의 cva 를 옮겨 적은 것.
 * 비교용이며 이 저장소에서 고치는 값이 아니다.
 */
const dropshotButtonVariants = cva(
  "relative flex w-full flex-col items-center justify-center rounded-[69px] text-white",
  {
    variants: {
      themeColor: {
        primary: "bg-primary-400 hover:bg-primary-500 active:bg-primary-600",
        grayscale800: "bg-grayscale-800 hover:bg-grayscale-700 active:bg-grayscale-600",
        grayscale900:
          "border border-solid border-white bg-grayscale-900 hover:bg-grayscale-800 active:bg-grayscale-700",
        white:
          "bg-white text-grayscale-900 hover:bg-grayscale-75 active:bg-grayscale-200 disabled:text-grayscale-400",
        // ! hover·active 가 스케일 단계가 아니라 hex 로 박혀 있다. 원본 그대로다.
        red: "bg-secondary-red-400 hover:bg-[#EA4855] active:bg-[#ED5F6B]",
        blue: "bg-secondary-blue-400 hover:bg-secondary-blue-500 active:bg-secondary-blue-600",
        // ! hover 가 `fine:` 으로 감싸여 있다. 그 화면 정의는 앱 셋(aiStudio·canvas·stock)에만
        //   있고 packages/design-system 에는 없다 — Storybook 에서는 이 hover 가 죽는다.
        ghost:
          "fine:hover:bg-white fine:hover:text-grayscale-900 border border-solid border-white bg-transparent text-white active:border-transparent active:bg-grayscale-75 active:text-grayscale-900",
      },
      size: {
        XS: "font-button3 px-3 py-1.5",
        S: "font-button3 px-4 py-2",
        M: "font-button2 px-6 py-2",
        L: "font-button1 px-8 py-3",
      },
    },
    defaultVariants: { themeColor: "primary", size: "M" },
  }
)

const SIZES = ["XS", "S", "M", "L"] as const
const COLORS = ["primary", "grayscale800", "red", "blue", "outline", "ghost", "white"] as const
/** 드롭샷 Button 에는 `outline` 이 없다. `grayscale900` 이 그 자리에 가깝다. */
const DS_COLORS = ["primary", "grayscale800", "red", "blue", "grayscale900", "ghost", "white"] as const

/** 드롭샷 크기별 실제 높이 — 글꼴 행간 + 상하 패딩 */
const DS_HEIGHT: Record<string, string> = { XS: "34px", S: "38px", M: "40px", L: "50px" }
/** 여백이 만든 높이 + 투명 테두리 2px */
const IB_HEIGHT: Record<string, string> = { XS: "26px", S: "30px", M: "32px", L: "36px" }

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const card = (title: string, note: string, body: string) => `
  <section>
    <h2 class="font-subtitle1 text-white">${title}</h2>
    <p class="mt-1.5 max-w-[62ch] font-caption1 text-grayscale-400">${note}</p>
    <div class="mt-5 rounded-3 bg-grayscale-850 p-6">${body}</div>
  </section>`

// ── 크기 비교 ─────────────────────────────────────────────────────────────
const sizeRows = SIZES.map((size) => {
  const ds = cn(dropshotButtonVariants({ size, themeColor: "primary" }))
  const ib = cn(inlineButtonVariants({ size, themeColor: "primary", iconOnly: false }))
  return `
    <tr class="rule">
      <td class="num py-4 pr-6 align-middle font-subtitle2 text-white">${size}</td>
      <td class="py-4 pr-6 align-middle">
        <div class="w-[220px]"><button class="${ds}">버튼</button></div>
        <div class="num mt-2 font-caption2 text-grayscale-500">높이 ${DS_HEIGHT[size]} · 폭 100%</div>
      </td>
      <td class="py-4 align-middle">
        <button class="${ib}">버튼</button>
        <div class="num mt-2 font-caption2 text-grayscale-500">높이 ${IB_HEIGHT[size]} · 내용만큼</div>
      </td>
    </tr>`
}).join("")

const sizeTable = `
  <table class="w-full border-collapse text-left">
    <thead>
      <tr>
        <th class="pb-3 pr-6 font-caption1 text-grayscale-400">크기</th>
        <th class="pb-3 pr-6 font-caption1 text-grayscale-400">드롭샷 <span class="text-grayscale-600">Button</span></th>
        <th class="pb-3 font-caption1 text-grayscale-400">새로 만든 <span class="text-primary-300">InlineButton</span></th>
      </tr>
    </thead>
    <tbody>${sizeRows}</tbody>
  </table>`

// ── 색 비교 ───────────────────────────────────────────────────────────────
const colorRows = COLORS.map((themeColor, i) => {
  const dsColor = DS_COLORS[i]
  const ds = cn(dropshotButtonVariants({ size: "M", themeColor: dsColor }))
  const ib = cn(inlineButtonVariants({ size: "M", themeColor, iconOnly: false }))
  const label = dsColor === themeColor ? themeColor : `${dsColor} / ${themeColor}`
  return `
    <tr class="rule">
      <td class="py-4 pr-6 align-middle font-caption1 text-grayscale-300">${label}</td>
      <td class="py-4 pr-6 align-middle"><div class="w-[180px]"><button class="${ds}">버튼</button></div></td>
      <td class="py-4 align-middle"><button class="${ib}">버튼</button></td>
    </tr>`
}).join("")

const colorTable = `
  <table class="w-full border-collapse text-left">
    <thead>
      <tr>
        <th class="pb-3 pr-6 font-caption1 text-grayscale-400">themeColor</th>
        <th class="pb-3 pr-6 font-caption1 text-grayscale-400">드롭샷 Button</th>
        <th class="pb-3 font-caption1 text-grayscale-400">InlineButton</th>
      </tr>
    </thead>
    <tbody>${colorRows}</tbody>
  </table>`

// ── 아이콘 전용 ───────────────────────────────────────────────────────────
const iconRow = SIZES.map((size) => {
  const cls = cn(inlineButtonVariants({ size, themeColor: "ghost", iconOnly: true }))
  return `<div class="flex flex-col items-center gap-2">
    <button class="${cls}"><span aria-hidden="true">＋</span></button>
    <span class="font-caption2 text-grayscale-500">${size}</span>
  </div>`
}).join("")

// ── 꺼진 상태 ─────────────────────────────────────────────────────────────
const disabledRow = (["primary", "outline", "ghost"] as const)
  .map((themeColor) => {
    const cls = cn(inlineButtonVariants({ size: "M", themeColor, iconOnly: false }))
    return `<div class="flex flex-col items-center gap-2">
      <button class="${cls}" disabled>보낼 수 없음</button>
      <span class="font-caption2 text-grayscale-500">${themeColor}</span>
    </div>`
  })
  .join("")

// ── 폭 차이 ───────────────────────────────────────────────────────────────
const widthDemo = `
  <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
    <div>
      <div class="font-caption1 text-grayscale-400">드롭샷 Button — 부모를 꽉 채운다</div>
      <div class="mt-3 stage stage-warn">
        <div class="flex gap-2">
          <button class="${cn(dropshotButtonVariants({ size: "S", themeColor: "grayscale800" }))}">이전</button>
          <button class="${cn(dropshotButtonVariants({ size: "S", themeColor: "primary" }))}">다음</button>
        </div>
      </div>
      <div class="mt-2 font-caption2 text-secondary-red-300">
        나란히 놓으면 둘 다 늘어나 자리를 반씩 차지한다
      </div>
    </div>
    <div>
      <div class="font-caption1 text-grayscale-400">InlineButton — 내용만큼만</div>
      <div class="mt-3 stage stage-ok">
        <div class="flex gap-2">
          <button class="${cn(inlineButtonVariants({ size: "S", themeColor: "grayscale800", iconOnly: false }))}">이전</button>
          <button class="${cn(inlineButtonVariants({ size: "S", themeColor: "primary", iconOnly: false }))}">다음</button>
        </div>
      </div>
      <div class="mt-2 font-caption2 text-secondary-green-300">
        사이드바 토글·캐러셀 화살표는 이 동작이 필요하다
      </div>
    </div>
  </div>`

/**
 * 페이지 자체도 드롭샷 토큰으로 그린다. 검증 대상인 디자인 시스템이 곧 이 화면의
 * 디자인 시스템이다. 아래 `<style>` 은 드롭샷 설정에 없는 것만 담는다.
 */
const chrome = `
  :root { color-scheme: dark; }
  /* Dropshot Sans — 사내 CDN 은 아티팩트에서 막히므로 파일을 페이지 안에 심는다.
     세 웨이트(400·500·700) 합계 약 718KB. 램프의 굵기가 전부 이 셋 안에 있다. */
  body {
    background: #15191E;
    font-family: 'Dropshot Sans', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
  }
  .num { font-variant-numeric: tabular-nums; }
  .rule { border-top: 1px solid #393E46; }
  /* 실물이 놓이는 자리. 폭이 어디까지 뻗는지 보이게 점선으로 경계를 긋는다 */
  .stage { border: 1px dashed #5E656F; border-radius: 8px; padding: 12px; }
  .stage-warn { border-color: #E62E48; }
  .stage-ok { border-color: #29DC7F; }
  .scroll { overflow-x: auto; }
  :where(a, button):focus-visible { outline: 2px solid #6633FF; outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
`

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>InlineButton 대조</title>
<link rel="stylesheet" href="./out.css">
<style>${chrome}</style>
</head>
<body class="font-body3 text-white antialiased">
  <main class="mx-auto max-w-[1080px] px-6 py-14">

    <header class="mb-12">
      <div class="font-caption2 tracking-widest text-primary-300">드롭샷 디자인 시스템 · 이식 검토</div>
      <h1 class="mt-3 font-headline5 text-white">InlineButton</h1>
      <p class="mt-3 max-w-[62ch] font-body3 text-grayscale-400">
        드롭샷 <code class="rounded-1 bg-grayscale-800 px-1.5 py-0.5 font-caption1">Button</code> 은
        한 글자도 고치지 않는다. 줄 안에 놓이는 작은 버튼이 필요한 자리를 위해
        <code class="rounded-1 bg-grayscale-800 px-1.5 py-0.5 font-caption1">Button/</code> 폴더에
        형제로 넣는다. <code class="rounded-1 bg-grayscale-800 px-1.5 py-0.5 font-caption1">IconButton</code>·
        <code class="rounded-1 bg-grayscale-800 px-1.5 py-0.5 font-caption1">CloseButton</code> 과 같은 방식이다.
      </p>
      <div class="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-caption1 text-grayscale-500">
        <span>색·글꼴·반경 — 드롭샷 토큰</span>
        <span>높이·여백·간격 — shadcn 수치</span>
        <span class="num">클래스 109개 전부 v3 에서 생성 확인</span>
      </div>
    </header>

    <div class="grid gap-10">
      ${card(
        "폭",
        "드롭샷 Button 을 바꾸지 않기로 한 이유. 반경이 아니라 이것이다",
        widthDemo
      )}
      ${card(
        "크기",
        "치수는 shadcn 그대로, 색과 글꼴만 드롭샷이다. 드롭샷은 글꼴 행간 + 상하 패딩으로 높이가 정해져 8~14px 더 크다",
        `<div class="scroll">${sizeTable}</div>`
      )}
      ${card(
        "색",
        "드롭샷 토큰을 그대로 쓴다. 드롭샷 Button 에 없는 outline 이 하나 더 있고, 그 자리에 가장 가까운 grayscale900 과 나란히 놓았다",
        `<div class="scroll">${colorTable}</div>`
      )}
      ${card(
        "아이콘 전용",
        "shadcn 은 size 안에 icon-sm 같은 모양 변형을 섞어 두었다. 드롭샷 규칙대로 iconOnly 로 갈랐다",
        `<div class="flex flex-wrap items-end gap-8">${iconRow}</div>`
      )}
      ${card(
        "꺼진 상태",
        "면을 채우는 것과 비우는 것의 처리가 다르다. 드롭샷 Button 이 compoundVariants 로 하는 구분을 그대로 따랐다",
        `<div class="flex flex-wrap items-end gap-8">${disabledRow}</div>`
      )}
    </div>

    <footer class="rule mt-12 pt-6 font-caption2 text-grayscale-600">
      <p>
        실물의 클래스 문자열은 <code>InlineButton.tsx</code> 의
        <code>inlineButtonVariants</code> 를 직접 불러 뽑았다. 화면과 코드가 어긋날 수 없다.
      </p>
      <p class="mt-2">
        드롭샷 Button 쪽 값과 Tailwind 설정은 jiro-developers/dropshot 을 읽어 옮겨 적었다.
        그 저장소는 읽기만 했고 어떤 변경도 만들지 않았다.
      </p>
      <p class="mt-2">
        글꼴은 Dropshot Sans 다. 사내 CDN 을 부를 수 없는 자리라 세 웨이트를 페이지 안에
        심었다. 크기·굵기·행간·자간도 드롭샷 램프 실측값 그대로다.
      </p>
    </footer>
  </main>
</body>
</html>
`

fs.writeFileSync(path.join(HERE, "index.html"), html)
fs.writeFileSync(
  path.join(HERE, "input.css"),
  "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n"
)
console.log(`화면 생성 — ${path.join(HERE, "index.html")}`)
console.log(`  ${esc("").length === 0 ? "" : ""}드롭샷 Button ${SIZES.length}크기 · ${DS_COLORS.length}색`)
console.log(`  InlineButton ${SIZES.length}크기 · ${COLORS.length}색 · 아이콘 전용 ${SIZES.length}`)
