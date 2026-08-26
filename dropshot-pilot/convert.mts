/**
 * shadcn 컴포넌트를 드롭샷 규칙으로 옮긴다.
 *
 *   cd dropshot-pilot
 *   ../node_modules/.bin/tsx ./convert.mts
 *
 * 입력  dropshot-export/packages/design-system/components/<Pascal>/<Pascal>.tsx
 * 출력  dropshot-pilot/packages/design-system/components/<Pascal>/<Pascal>.tsx
 *
 * 규칙은 `RULES.md` 에 있다. 여기서는 **기계적으로 확실한 것만** 바꾸고, 판단이
 * 필요한 것은 손대지 않고 목록으로 남긴다. 결과는 `verify/check-rules.mts` 로 확인한다.
 *
 * 원칙: 색과 글꼴은 드롭샷, 나머지 px 값은 shadcn.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.resolve(HERE, "../dropshot-export/packages/design-system/components")
const OUT = path.join(HERE, "packages/design-system/components")

/** `ds-dropshot` 에 이미 있는 것. 여기서 다루지 않는다 — COMPARE.md 참고. */
const EXISTING = ["Button", "Skeleton", "Spinner", "Switch", "Toast", "Tooltip"]
/**
 * 손으로 이식해 둔 것. 기계 변환보다 낫다 — prop 이름을 드롭샷 어휘로 바꾸고
 * 프리미티브를 걷어냈다. **덮어쓰지 않는다.**
 */
const HAND_PORTED = ["Alert", "Badge", "Separator", "Toggle"]
const SKIP = new Set([...EXISTING, ...HAND_PORTED])

// ── 색 ────────────────────────────────────────────────────────────────────
/** shadcn 시맨틱 색 → 드롭샷 스케일. 값 출처는 configs/tailwind/src/colors.ts 다. */
const COLOR: Record<string, string> = {
  background: "grayscale-900",
  foreground: "white",
  card: "grayscale-850",
  "card-foreground": "white",
  popover: "grayscale-850",
  "popover-foreground": "white",
  primary: "primary-400",
  "primary-foreground": "white",
  secondary: "grayscale-800",
  "secondary-foreground": "white",
  muted: "grayscale-800",
  "muted-foreground": "grayscale-400",
  accent: "grayscale-800",
  "accent-foreground": "white",
  destructive: "secondary-red-400",
  "destructive-foreground": "white",
  border: "grayscale-700",
  input: "grayscale-700",
  ring: "primary-400",
  sidebar: "grayscale-850",
  "sidebar-foreground": "white",
  "sidebar-primary": "primary-400",
  "sidebar-primary-foreground": "white",
  "sidebar-accent": "grayscale-800",
  "sidebar-accent-foreground": "white",
  "sidebar-border": "grayscale-700",
  "sidebar-ring": "primary-400",
}
/** 색을 받는 유틸리티 접두사. 긴 것부터 봐야 `bg-` 가 `bg-clip-` 을 삼키지 않는다. */
const COLOR_PREFIX = [
  "bg",
  "text",
  "border",
  "ring",
  "shadow",
  "fill",
  "stroke",
  "from",
  "to",
  "via",
  "divide",
  "outline",
  "decoration",
  "accent",
  "caret",
  "placeholder",
]

// ── 글꼴 ──────────────────────────────────────────────────────────────────
/** `text-*` 와 굵기의 조합 → 드롭샷 램프 한 클래스. */
const FONT: Record<string, string> = {
  "text-xs": "font-caption1",
  "text-xs|font-medium": "font-button4",
  "text-xs|font-semibold": "font-button4",
  "text-sm": "font-body3",
  "text-sm|font-medium": "font-subtitle4",
  "text-sm|font-semibold": "font-subtitle2",
  "text-sm|font-bold": "font-subtitle2",
  "text-base": "font-body1",
  "text-base|font-medium": "font-button2",
  "text-base|font-semibold": "font-subtitle1",
  "text-base|font-bold": "font-subtitle1",
  "text-lg": "font-body1",
  "text-lg|font-semibold": "font-headline7",
  "text-lg|font-bold": "font-headline7",
  "text-xl|font-bold": "font-headline6",
  "text-2xl|font-bold": "font-headline5",
}
const WEIGHTS = ["font-medium", "font-semibold", "font-bold"]

// ── 반경 ──────────────────────────────────────────────────────────────────
/** shadcn 값은 `--radius: 10px` 에서 파생된다. 드롭샷은 4px 배수뿐이다. */
const RADIUS_STEP: Record<string, string> = {
  sm: "1", //  6 → 4
  md: "2", //  8 → 8
  lg: "2", // 10 → 8
  xl: "3", // 14 → 12
  "2xl": "4", // 18 → 16
  "3xl": "5", // 22 → 20
  "4xl": "6", // 26 → 24
}
/** `rounded-t-lg`·`rounded-bl-md` 처럼 방향이 붙은 것도 같이 본다. */
const RADIUS_RE = /^rounded(-(?:t|r|b|l|tl|tr|bl|br|s|e|ss|se|es|ee))?-(sm|md|lg|xl|2xl|3xl|4xl)$/
function convertRadius(base: string) {
  const m = RADIUS_RE.exec(base)
  return m ? `rounded${m[1] ?? ""}-${RADIUS_STEP[m[2]]}` : null
}

// ── 그림자·층 ─────────────────────────────────────────────────────────────
const SHADOW: Record<string, string> = {
  "shadow-md": "shadow-darkShadow",
  "shadow-lg": "shadow-darkShadow",
  "shadow-xl": "shadow-dropBox",
  "shadow-2xl": "shadow-dropBox",
}
/** 드롭샷은 면 색으로 깊이를 낸다. 작은 그림자는 뺀다. */
const SHADOW_DROP = new Set(["shadow-sm", "shadow-xs", "shadow"])

type Note = { file: string; kind: string; detail: string }
const notes: Note[] = []

/**
 * 접두 변형(`hover:`·`md:` 등)과 중요 표시(`!`)를 떼어 낸다.
 *
 * ! `!rounded-xl` 처럼 `!` 가 붙어 있으면 매핑이 안 걸린다. 떼었다가 다시 붙인다.
 */
function split(token: string) {
  const i = token.lastIndexOf(":")
  // 임의 값 안의 콜론(`[&_svg:not(...)]`)은 변형 구분자가 아니다
  const hasMods = i >= 0 && !token.slice(i).includes("]")
  let mods = hasMods ? token.slice(0, i + 1) : ""
  let base = hasMods ? token.slice(i + 1) : token
  if (base.startsWith("!")) {
    mods += "!"
    base = base.slice(1)
  }
  return { mods, base }
}

function convertColor(base: string, file: string) {
  for (const p of COLOR_PREFIX) {
    if (!base.startsWith(p + "-")) continue
    let rest = base.slice(p.length + 1)
    let alpha = ""
    const slash = rest.lastIndexOf("/")
    if (slash > 0) {
      alpha = rest.slice(slash)
      rest = rest.slice(0, slash)
    }
    const mapped = COLOR[rest]
    if (!mapped) return null
    if (alpha) {
      notes.push({
        file,
        kind: "불투명도",
        detail: `\`${base}\` — 드롭샷은 색을 단계로 만든다. 스케일 한 단계로 바꿀지 사람이 봐야 한다`,
      })
    }
    return `${p}-${mapped}${alpha}`
  }
  return null
}

/** 클래스 목록 하나를 통째로 바꾼다. 글꼴은 조합을 봐야 해서 목록 단위로 처리한다. */
function convertClassList(list: string, file: string) {
  let tokens = list.split(/\s+/).filter(Boolean)

  // 글꼴 — 같은 변형 접두사끼리 짝지어 본다
  const byMods = new Map<string, string[]>()
  for (const t of tokens) {
    const { mods, base } = split(t)
    if (!byMods.has(mods)) byMods.set(mods, [])
    byMods.get(mods)!.push(base)
  }
  const fontReplace = new Map<string, string>()
  for (const [mods, bases] of byMods) {
    const size = bases.find((b) => /^text-(xs|sm|base|lg|xl|2xl)$/.test(b))
    if (!size) continue
    const weight = bases.find((b) => WEIGHTS.includes(b))
    const key = weight ? `${size}|${weight}` : size
    const ramp = FONT[key] ?? FONT[size]
    if (!ramp) continue
    fontReplace.set(mods + size, mods + ramp)
    if (weight) fontReplace.set(mods + weight, "")
  }

  const out: string[] = []
  for (const t of tokens) {
    if (fontReplace.has(t)) {
      const v = fontReplace.get(t)!
      if (v) out.push(v)
      continue
    }
    const { mods, base } = split(t)

    if (SHADOW_DROP.has(base)) {
      notes.push({
        file,
        kind: "작은 그림자 제거",
        detail: `\`${t}\` — 드롭샷은 면 색으로 깊이를 낸다`,
      })
      continue
    }
    if (SHADOW[base]) {
      out.push(mods + SHADOW[base])
      continue
    }
    const radius = convertRadius(base)
    if (radius) {
      out.push(mods + radius)
      continue
    }
    if (base === "z-50") {
      out.push(mods + "z-modal")
      notes.push({
        file,
        kind: "z-index",
        detail: "`z-50` → `z-modal`(150). 자리에 따라 z-modalAbove·z-tooltip 이 맞을 수 있다",
      })
      continue
    }
    if (base === "animate-pulse") {
      out.push(mods + "animate-skeleton")
      continue
    }
    const color = convertColor(base, file)
    if (color) {
      out.push(mods + color)
      continue
    }
    out.push(t)
  }
  return out.join(" ")
}

/** 파일 전체의 문자열 리터럴을 훑어 클래스 목록으로 보이는 것만 바꾼다. */
function convertStrings(source: string, file: string) {
  /**
   * 클래스 목록으로 볼 문자열인지 본다.
   *
   * ! 처음에는 허용 문자를 좁게 잡았다가 `group-data-[viewport=false]` 의 `=` 나
   *   `[class*='size-']` 의 작은따옴표 하나 때문에 문자열 전체를 건너뛰었다.
   *   그래서 `rounded-lg` 36곳이 그대로 남았다. 이제 토큰 모양으로 판별한다.
   */
  // `^`·`|` 는 속성 선택자에 쓴다 — `data-[motion^=from-]`
  const TOKEN = /^[!a-z0-9@[\]*&_>~$?^|='"%#,.:/\\()+-]+$/i
  const looksLikeClasses = (body: string) => {
    const t = body.trim().split(/\s+/)
    if (t.length === 0) return false
    if (!t.every((x) => TOKEN.test(x))) return false
    // 경로·URL·한 낱말 문자열을 거른다
    return t.some((x) => /-/.test(x) || /^(flex|grid|block|hidden|relative|absolute|group|peer)$/.test(x))
  }
  return source.replace(/(["'`])((?:[^\\\n]|\\.)*?)\1/g, (all, q, body) => {
    if (!looksLikeClasses(body)) return all
    if (!/\s/.test(body) && !/^(bg|text|rounded|shadow|border|z|animate|font)-/.test(body)) {
      return all
    }
    const converted = convertClassList(body, file)
    return converted === body ? all : q + converted + q
  })
}

/** v4 전용 문법을 v3 로. 드롭샷은 Tailwind v3 다. */
function convertSyntax(s: string) {
  return (
    s
      /**
       * ! 이 규칙이 **가장 먼저** 와야 한다.
       *
       * `data-slot:`·`data-activation-direction=left:` 처럼 대괄호 없는 v4 축약을
       * 먼저 `data-[…]:` 로 펴 두어야, 아래의 `has-data-[…]`·`in-data-[…]` 규칙이
       * 그 결과까지 함께 처리한다. 순서를 뒤집으면 `has-data-[state=checked]:` 가
       * 새로 만들어진 뒤 아무도 손대지 못하고 남는다.
       */
      .replace(/\bdata-([a-z][\w-]*(?:=[\w-]+)?):(?!\[)/g, (_m, k) => `data-[${k}]:`)
      // `size-4!` → `!size-4`
      .replace(/\b([a-z-]+-[\w.[\]/]+)!/g, "!$1")
      // `**:data-[x]:y` → `[&_[data-x]]:y`
      .replace(/\*\*:data-\[([^\]]+)\]:/g, (_m, d) => `[&_[data-${d}]]:`)
      // 대괄호가 겹친 선택자는 정규식으로 못 자른다. 표시만 해 두고 아래에서 짝을 센다
      .replace(/\*\*:\[/g, "\u0001_[")
      .replace(/(?<![*\w])\*:\[/g, "\u0001>[")
      // 대괄호가 없는 일반형
      .replace(/\*\*:(?=[a-z!])/g, "[&_*]:")
      .replace(/(?<![*\w])\*:(?=[a-z!])/g, "[&>*]:")
      // `*:data-[x]:y` → `[&>[data-x]]:y`
      .replace(/(?<!\*)\*:data-\[([^\]]+)\]:/g, (_m, d) => `[&>[data-${d}]]:`)
      // `*:[svg]:y` → `[&>svg]:y`
      .replace(/(?<!\*)\*:\[([^\]]+)\]:/g, (_m, sel) => `[&>${sel}]:`)
      // `has-data-[x]:y` → `has-[[data-x]]:y`
      .replace(/\bhas-data-\[([^\]]+)\](\/[\w-]+)?:/g, (_m, d, g) => `has-[[data-${d}]]${g ?? ""}:`)
      // `in-data-[x]:y` → `[[data-x]_&]:y`
      .replace(/\bin-data-\[([^\]]+)\]:/g, (_m, d) => `[[data-${d}]_&]:`)
      // `group-data-[x]/n:y` 는 v3 에도 있다. 건드리지 않는다.
      // v4 의 CSS 변수 축약 `rounded-(--x)` → v3 의 `rounded-[var(--x)]`
      .replace(/-\((--[\w-]+)\)/g, "-[var($1)]")
      // `aria-invalid:` → v3 에 없는 변형
      .replace(/\baria-invalid:/g, "aria-[invalid=true]:")
      // `not-aria-[x]:y` → `[&:not([x])]:y`
      .replace(/\bnot-aria-\[([^\]]+)\]:/g, (_m, a) => `[&:not([aria-${a}])]:`)
      .replace(/\bring-3\b/g, "ring-[3px]")
      .replace(/\bunderline-offset-3\b/g, "underline-offset-[3px]")
      // 클래스 안 큰따옴표는 렌더된 class 속성을 끊는다
      .replace(/\[class\*="([^"]*)"\]/g, "[class*='$1']")
      // `dark:` 는 드롭샷 토큰이 이미 어두운 면 기준이라 지운다
      .replace(/(^|[\s"'`])dark:[\w[\]/.:-]+/g, "$1")
  )
}

/**
 * `\u0001_[` · `\u0001>[` 로 표시해 둔 자리에서 대괄호 짝을 세어
 * `[&_sel]` · `[&>sel]` 로 닫는다. `[[cmdk-group-heading]]` 처럼 겹친 대괄호는
 * 정규식만으로 자를 수 없다.
 */
function closeSelectors(src: string) {
  let out = ""
  for (let i = 0; i < src.length; i++) {
    if (src[i] !== "\u0001") {
      out += src[i]
      continue
    }
    const combinator = src[i + 1] // `_` 또는 `>`
    let depth = 1
    let j = i + 3 // `\u0001`·결합자·여는 대괄호 다음부터
    for (; j < src.length && depth > 0; j++) {
      if (src[j] === "[") depth++
      else if (src[j] === "]") depth--
    }
    out += `[&${combinator}${src.slice(i + 3, j - 1)}]`
    i = j - 1
  }
  return out
}

/**
 * `../Button/Button` 을 부르는 자리를 `InlineButton` 으로 돌린다.
 *
 * 드롭샷 `Button` 은 `w-full flex-col` 이라 부모 폭을 꽉 채운다. 사이드바 토글·
 * 캐러셀 화살표·페이지네이션 숫자처럼 줄 안에 놓이는 자리에 그걸 쓰면 폭을 잃는다.
 * 그래서 형제로 만든 `InlineButton` 을 쓴다 — COMPARE.md 의 결정이다.
 *
 * prop 어휘도 함께 옮긴다. 값이 리터럴이 아닌 것(`variant={variant}`)은 손대지
 * 않고 목록에 남긴다 — 그 컴포넌트의 prop 타입까지 봐야 하는 자리다.
 */
const BUTTON_THEME: Record<string, string> = {
  default: "primary",
  secondary: "grayscale800",
  destructive: "red",
  outline: "outline",
  ghost: "ghost",
}
const BUTTON_SIZE: Record<string, string> = {
  xs: 'size={"XS"}',
  sm: 'size={"S"}',
  default: 'size={"M"}',
  lg: 'size={"L"}',
  icon: 'size={"M"} iconOnly',
  "icon-xs": 'size={"XS"} iconOnly',
  "icon-sm": 'size={"S"} iconOnly',
  "icon-lg": 'size={"L"} iconOnly',
}

function useInlineButton(s: string, file: string) {
  if (!s.includes('"../Button/Button"')) return s

  s = s.replace(
    /import\s*\{([^}]*)\}\s*from\s*"\.\.\/Button\/Button"/g,
    (_all, inner: string) => {
      const names = inner
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean)
        .map((n) => (n === "Button" ? "InlineButton" : n === "buttonVariants" ? "inlineButtonVariants" : n))
      return `import { ${names.join(", ")} } from "../Button/InlineButton"`
    }
  )
  s = s.replace(/<Button(?=[\s/>])/g, "<InlineButton").replace(/<\/Button>/g, "</InlineButton>")
  s = s.replace(/\bbuttonVariants\(/g, "inlineButtonVariants(")

  // 리터럴 값만 옮긴다
  s = s.replace(/\bvariant="([a-z-]+)"/g, (all, v: string) => {
    const mapped = BUTTON_THEME[v]
    if (!mapped) {
      notes.push({ file, kind: "Button 변형", detail: `\`variant="${v}"\` 에 대응하는 themeColor 가 없다` })
      return all
    }
    return `themeColor="${mapped}"`
  })
  s = s.replace(/\bsize="([a-z-]+)"/g, (all, v: string) => BUTTON_SIZE[v] ?? all)

  for (const m of s.matchAll(/\b(variant|size)=\{([^}]*)\}/g)) {
    if (/^"/.test(m[2])) continue
    notes.push({
      file,
      kind: "Button prop 이 동적",
      detail: `\`${m[0]}\` — 값이 리터럴이 아니라 자동으로 못 옮긴다. 이 컴포넌트의 prop 타입까지 봐야 한다`,
    })
  }
  return s
}

/** 파일 단위 규칙 — export·type import. */
function convertFile(s: string, file: string) {
  // `export default X` 는 옛 관례다. named 로 통일한다.
  s = s.replace(/\n+export default \w+\n?$/, "\n")
  // 인라인 type import 를 분리한다
  s = s.replace(
    /import\s*\{([^}]*)\}\s*from\s*(['"][^'"]+['"])/g,
    (all, inner: string, from: string) => {
      const parts = inner.split(",").map((p) => p.trim()).filter(Boolean)
      const types = parts.filter((p) => p.startsWith("type ")).map((p) => p.slice(5).trim())
      const values = parts.filter((p) => !p.startsWith("type "))
      if (types.length === 0) return all
      const lines: string[] = []
      lines.push(`import type { ${types.join(", ")} } from ${from}`)
      if (values.length) lines.push(`import { ${values.join(", ")} } from ${from}`)
      return lines.join("\n")
    }
  )
  if (/\bReact\.ComponentProps|\bReact\.\w+/.test(s) && !/import \* as React/.test(s)) {
    notes.push({ file, kind: "React 네임스페이스", detail: "`React.*` 를 쓰는데 import 가 없다" })
  }
  return s
}

// ── 실행 ──────────────────────────────────────────────────────────────────
// ! 통째로 지우지 않는다. 손으로 이식한 것과 같은 트리를 쓰기 때문이다.
for (const d of fs.existsSync(OUT) ? fs.readdirSync(OUT) : []) {
  if (!SKIP.has(d) && d !== "Button") fs.rmSync(path.join(OUT, d), { recursive: true, force: true })
}
const dirs = fs.readdirSync(SRC).filter((d) => !SKIP.has(d))
let count = 0

for (const d of dirs) {
  const src = path.join(SRC, d, `${d}.tsx`)
  if (!fs.existsSync(src)) continue
  let s = fs.readFileSync(src, "utf8")
  s = convertSyntax(s)
  s = closeSelectors(s)
  s = convertStrings(s, d)
  s = convertFile(s, d)
  s = useInlineButton(s, d)
  const dir = path.join(OUT, d)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${d}.tsx`), s)
  // 같은 폴더에 딸린 파일도 옮긴다
  for (const f of fs.readdirSync(path.join(SRC, d))) {
    if (f === `${d}.tsx`) continue
    fs.copyFileSync(path.join(SRC, d, f), path.join(dir, f))
  }
  count++
}

console.log(`\n변환 ${count}개 → ${OUT}`)
const byKind = new Map<string, Note[]>()
for (const n of notes) {
  if (!byKind.has(n.kind)) byKind.set(n.kind, [])
  byKind.get(n.kind)!.push(n)
}
if (byKind.size) {
  console.log("\n사람이 봐야 하는 것")
  for (const [kind, list] of [...byKind].sort((a, b) => b[1].length - a[1].length)) {
    const files = [...new Set(list.map((n) => n.file))]
    console.log(`  ${kind}  ${list.length}건 · 파일 ${files.length}개`)
    console.log(`    ${files.slice(0, 8).join(", ")}${files.length > 8 ? " …" : ""}`)
  }
}
