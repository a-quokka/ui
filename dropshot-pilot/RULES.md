# shadcn 컴포넌트를 Dropshot 규칙으로 옮기는 법

`jiro-developers/dropshot` 의 `packages/design-system` 을 읽고 정리한 규칙이다.
저장소는 읽기만 했다.

**원칙:** Dropshot 에서 지킬 것은 **색 토큰·글꼴·코드 규칙**이고,
shadcn 에서 가져올 것은 **색과 글꼴을 뺀 나머지 형태(px 값)** 다.

---

## 1. Dropshot 코드 규칙

### 파일

```
packages/design-system/components/<Pascal>/<Pascal>.tsx    컴포넌트
packages/design-system/stories/<Pascal>/<Pascal>.stories.ts  스토리
```

한 폴더에 관련 컴포넌트를 함께 둔다 (`Button/` 안에 `Button`·`IconButton`·`CloseButton`).
별도 `index.ts` 배럴은 쓰지 않는다. 대신 `package.json` 의 `exports` 에 한 줄 등록한다.

```json
"./badge": "./components/Badge/Badge.tsx"
```

빌드 단계가 없다. `.tsx` 원본을 그대로 내보낸다.

### import

| 무엇 | 어떻게 |
| --- | --- |
| 타입 | `import type { ComponentProps } from 'react';` — **반드시 분리**. `typescript/consistent-type-imports` 가 error |
| `cn` | `import { cn } from '@configs/tailwind';` |
| 형제 컴포넌트 | `import Spinner from '../Spinner/Spinner';` — 상대경로 |
| 스토리에서 | `import Badge from '@ds-dropshot/components/Badge/Badge';` — 별칭 |

### 컴포넌트 모양

`Skeleton.tsx` 가 가장 정돈된 형태다. 이걸 기준으로 삼는다.

```tsx
type XProps = Pick<ComponentProps<'div'>, 'children' | 'className'> & VariantProps<typeof xVariants>;

const xVariants = cva('기본 클래스', {
  variants: { themeColor: { ... } },
  defaultVariants: { themeColor: '...' },
});

const X = (props: XProps) => {
  const { children, className, themeColor } = props;
  return <div className={cn(xVariants({ themeColor }), className)}>{children}</div>;
};

export { X, xVariants };
export type { XProps };
```

- props 는 **함수 본문 안에서** 구조분해한다 (시그니처에서 하지 않는다)
- props 타입은 `ComponentProps<'div'>` 를 통째로 펴지 않고 `Pick` 으로 쓸 것만 고른다
- variants 이름은 `<컴포넌트명>Variants` (camelCase)
- export 는 **파일 맨 아래에 named 로 모은다.** 값과 타입을 따로 쓴다

> **`export default` 는 옛 관례다.** `Button`·`Tooltip` 은 default 를 쓰지만
> `Skeleton`·`Switch` 는 named 만 쓴다. 새로 넣는 것은 named 로 통일한다.

### 라벨링

| 대상 | 규칙 | 예 |
| --- | --- | --- |
| 색 변형 prop | `themeColor` | `themeColor: 'primary'` — Button·Tooltip |
| 면·테두리 변형 prop | `variant` | `variant: 'outline'` — IconButton |
| 크기 변형 prop | `size` | `'XS' \| 'S' \| 'M' \| 'L'` |
| 변형 값 | 토큰 이름 camelCase | `grayscale800`, `primary400`, `secondaryBlue400` |
| 데이터 훅 | `data-slot` | 원본 그대로 둔다 |

**`themeColor` 와 `variant` 를 가르는 기준**은 그 축이 *색*이냐 *면 처리*냐다.
Button 의 `primary`·`red`·`ghost` 는 색이라 `themeColor`, IconButton 의
`none`·`solid`·`transparent` 는 배경 처리라 `variant` 다. shadcn 의 `variant` 가
색이면 `themeColor` 로 바꾸고, 테두리·투명도면 `variant` 로 둔다.

### size 어휘 — `'XS' | 'S' | 'M' | 'L'` 로 통일 (결정됨)

Button 방식을 따른다. shadcn 어휘는 이렇게 옮긴다.

| shadcn | Dropshot |
| --- | --- |
| `xs` | `XS` |
| `sm` | `S` |
| `default` | `M` |
| `lg` | `L` |

**네 단계를 다 만들 필요는 없다.** 원본에 없는 단계는 넣지 않는다 — 예를 들어
Toggle 은 원본에 `xs` 가 없어 `S`·`M`·`L` 만 둔다. 기본값은 `M` 이다.

**아이콘 전용 크기(`icon`·`icon-xs`·`icon-sm`·`icon-lg`)는 size 에 섞지 않는다.**
드롭샷은 `IconButton` 처럼 **별도 컴포넌트로 분리**한다. shadcn 이 size 안에
아이콘 변형을 넣어 둔 컴포넌트를 옮길 때는 `Icon<이름>` 을 같은 폴더에 나눠 만든다.

### 주석

한국어 JSDoc 으로 **왜 그렇게 했는지**를 적는다. 되돌리기 쉬운 판단이나 함정에는
`!` 를 앞에 붙인다.

```tsx
/**
 * ! hover와 함께 키보드 focus에서도 뜬다. …
 */
```

### 린트가 강제하는 것

`configs/oxlint/.oxlintrc.{base,react}.json` 에서:

- `typescript/consistent-type-imports` — 타입은 `import type`
- `typescript/no-explicit-any` — `any` 금지
- `curly: ["error","all"]` — `if` 한 줄도 중괄호
- `prefer-const`, `no-var`
- `better-tailwindcss/enforce-consistent-class-order` — 클래스 순서 자동 정렬
- `jsx-a11y/alt-text`

---

## 2. 토큰 매핑 — shadcn → Dropshot

### 색

값의 출처는 `configs/tailwind/src/colors.ts` 하나뿐이다.

| shadcn | Dropshot | 값 | 근거 |
| --- | --- | --- | --- |
| `bg-primary` | `bg-primary-400` | `#6633FF` | Button 의 primary 와 같은 단계 |
| `text-primary-foreground` | `text-white` | `#FFFFFF` | Button 이 primary 위에 흰 글자를 쓴다 |
| `hover:bg-primary/80` | `hover:bg-primary-500` | `#5A20F1` | 불투명도가 아니라 스케일 한 단계 |
| `bg-secondary` | `bg-grayscale-800` | `#2A2F36` | Button 의 `grayscale800` 변형 |
| `bg-card` | `bg-grayscale-850` | `#1F242A` | 부모가 900(`#15191E`)일 때 한 단계 밝은 면 |
| `bg-muted` | `bg-grayscale-800` | `#2A2F36` | |
| `text-muted-foreground` | `text-grayscale-400` | `#AAB1BC` | 보조 텍스트 |
| `border-border`·`bg-border` | `-grayscale-700` | `#393E46` | |
| `text-destructive` | `text-secondary-red-300` | `#EB5D70` | 어두운 면에서 읽히는 단계 |
| `bg-destructive/10` | `bg-secondary-red-900` | `#3A070E` | 틴트 대신 면 색 |
| `ring-ring` | `ring-primary-400` | `#6633FF` | |
| `dark:` 변형 전부 | **지운다** | — | 드롭샷 토큰이 이미 어두운 면 기준이다 |

**면 위계**는 `900 #15191E` → `850 #1F242A` → `800 #2A2F36` → `700 #393E46` 순으로
밝아진다. 카드가 배경에서 떠 보이는 것은 그림자가 아니라 이 밝기 차이다.

> ⚠️ **기본 팔레트 일부가 삭제돼 있다.** `configs/tailwind/tailwind.config.ts` 가
> `gray`·`blue`·`lightBlue`·`warmGray`·`trueGray`·`coolGray`·`blueGray` 를 지운다.
> `bg-blue-500`·`text-gray-400` 같은 클래스는 **존재하지 않는다.** shadcn 예제에
> 이런 색이 섞여 있으면 반드시 드롭샷 스케일로 바꿔야 한다.

**불투명도(`/80`, `/10`)를 스케일 단계로 바꾸는 것이 핵심이다.** 드롭샷은 색을
단계로 정의해 두었고, 불투명도는 뒤에 무엇이 있느냐에 따라 색이 달라진다.

### 글꼴

`configs/tailwind/src/typography.ts` 의 20단계를 쓴다. 크기·굵기·행간·자간이
한 클래스에 묶여 있어 `text-sm` 류 조합으로 대체되지 않는다.

| shadcn | Dropshot | 값 |
| --- | --- | --- |
| `text-xs` | `font-caption1` | 12 / 400 / 20 |
| `text-xs font-medium` | `font-button4` | 12 / 500 / 20 |
| `text-sm` | `font-body3` | 14 / 400 / 24 |
| `text-sm font-medium` | `font-subtitle4` | 14 / 500 / 22 |
| `text-sm font-bold` | `font-subtitle2` | 14 / 700 / 22 |
| `text-base` | `font-body1` | 16 / 400 / 26 |
| `text-base font-medium` | `font-button2` | 16 / 500 / 24 |
| `text-lg font-bold` | `font-headline7` | 18 / 700 / 26 |

### 반경

`rounded-N = N × 4px`, `N` 은 1~6 이다. 그 위는 없다.

shadcn 쪽 값은 `--radius: 0.625rem`(10px)에서 파생된다. 실제 px 로 환산해 옮긴다.

| shadcn | 계산 | px | Dropshot |
| --- | --- | --- | --- |
| `rounded-sm` | `--radius × 0.6` | 6 | `rounded-1`(4) 또는 `rounded-2`(8) — 자리를 보고 정한다 |
| `rounded-md` | `--radius × 0.8` | 8 | `rounded-2` |
| `rounded-lg` | `--radius` | 10 | **`rounded-2`(8)** — 10px 단계가 없다 |
| `rounded-xl` | `--radius × 1.4` | 14 | `rounded-3`(12) 또는 `rounded-4`(16) |
| `rounded-2xl` | `--radius × 1.8` | 18 | `rounded-4`(16) 또는 `rounded-5`(20) |
| `rounded-3xl` | `--radius × 2.2` | 22 | `rounded-5`(20) 또는 `rounded-6`(24) |
| `rounded-4xl` | `--radius × 2.6` | 26 | `rounded-6`(24) 또는 `rounded-full` — 의도가 pill 이면 full |

> ⚠️ **드롭샷 스케일은 4px 배수뿐이라 딱 맞아떨어지는 값이 절반도 안 된다.**
> 어느 쪽으로 붙일지는 자리마다 다르다. 작은 컨트롤은 내림, 카드·모달처럼 큰 면은
> 올림이 대체로 맞는다. `InlineButton` 은 10px 을 8px 로 내렸다 — shadcn 자신이
> 작은 크기(XS·S)에 8px 을 쓰기 때문이다.

### 그림자·층·모션

| shadcn | Dropshot |
| --- | --- |
| `shadow-md`·`shadow-lg` | `shadow-darkShadow` |
| `shadow-xl` (툴팁·차트) | `shadow-dropBox` |
| `shadow-sm` (카드·노브) | **뺀다.** 드롭샷은 면 색으로 깊이를 낸다 |
| `z-50` | `z-modal`(150)·`z-modalAbove`(151)·`z-tooltip`(10) 중 자리에 맞게 |
| `animate-pulse` | `animate-skeleton` |
| `duration-100` (떠 있는 면) | `duration-225` + `ease-[cubic-bezier(0.4,0,0.2,1)]` |

### 그대로 두는 것 — 이게 shadcn 에서 가져오는 값이다

`h-*` `w-*` `size-*` `p-*` `px-*` `py-*` `gap-*` `top-*` `right-*` `grid-cols-*`
`translate-*` `inset-*` — **손대지 않는다.**

---

## 3. Tailwind v4 → v3 문법 변환

드롭샷은 전부 v3, 이 포크는 v4 다. 아래는 v3 가 못 읽어 반드시 고쳐야 하는 것이다.

| v4 (shadcn) | v3 (Dropshot) |
| --- | --- |
| `size-3!` | `!size-3` — 중요 표시가 앞으로 |
| `*:[svg]:row-span-2` | `[&>svg]:row-span-2` |
| `*:data-[slot=x]:text-y` | `[&>[data-slot=x]]:text-y` |
| `**:data-[slot=x]:z-10` | `[&_[data-slot=x]]:z-10` |
| `has-data-[icon=inline-end]:pr-1.5` | `has-[[data-icon=inline-end]]:pr-1.5` |
| `in-data-[slot=x]:rounded-lg` | `[[data-slot=x]_&]:rounded-2` |
| `data-horizontal:h-px` | `data-[orientation=horizontal]:h-px` |
| `aria-invalid:border-x` | `aria-[invalid=true]:border-x` |
| `not-aria-[haspopup]:translate-y-px` | `[&:not([aria-haspopup])]:translate-y-px` |
| `ring-3` | `ring-[3px]` |
| `underline-offset-3` | `underline-offset-[3px]` |

`has-[>svg]:`·`text-balance`·`text-pretty` 는 v3.4 에 있으므로 그대로 둔다.

---

## 4. 프리미티브 처리

shadcn 컴포넌트 **62개 중 38개**가 `@base-ui/react` 를 쓴다. 드롭샷에는 이 의존성이 없다.

### 결정: 의존성을 들인다

`packages/design-system/package.json` 의 `dependencies` 에 한 줄을 더한다.

```json
"@base-ui/react": "^1.6.0"
```

딸려 오는 것은 `@floating-ui/react-dom`·`@floating-ui/utils`·`@base-ui/utils`·
`@babel/runtime`·`use-sync-external-store` 다섯 개다.

**근거:** 걷어내려면 38개를 다시 써야 하고, 그중에 대화상자·드롭다운·셀렉트·툴팁·
슬라이더가 들어 있다. 이들이 프리미티브에서 얻는 것은 아래 같은 동작이다.

| 동작 | 직접 만들면 |
| --- | --- |
| 대화상자를 열면 Tab 이 안에만 갇힌다 | 뒤 화면 버튼으로 새어 나간다 |
| 드롭다운이 화면 아래에서 위로 뒤집힌다 | 화면 밖으로 잘린다 |
| 메뉴에서 방향키·Home·End 로 이동한다 | 접근성 검사에서 걸린다 |

드롭샷의 지금 `Tooltip` 이 위치를 손으로 계산하고 있고, 그래서 화면 가장자리에서
잘릴 수 있는 구조다. 같은 실수를 38번 반복할 이유가 없다.

### 그래도 걷어내는 경우

프리미티브에서 얻는 것이 **`render`(다른 태그로 그리기)나 접근성 속성 몇 개뿐이면
걷어낸다.** 그것 하나 때문에 부품을 끌어오는 건 과하다.

| 컴포넌트 | 프리미티브가 주는 것 | 판단 |
| --- | --- | --- |
| Separator | `role`·`aria-orientation` | 걷어냄 |
| Badge | `render` (다형 태그) | 걷어냄 |
| Toggle | 눌림 상태 + `aria-pressed` | 걷어냄. `Switch` 도 직접 한다 |
| Dialog·Popover·Dropdown·Select·Tooltip | 포커스 가두기·위치 계산·키보드 이동 | **그대로 쓴다** |

`use-render`·`merge-props` 만 import 하는 컴포넌트가 16곳이다. 이들이 걷어내기
후보다.

---

## 5. 이 파일럿에서 하지 못한 것

- **타입 검사를 못 했다.** `@configs/tailwind` 가 드롭샷 저장소에만 있어
  이 컴퓨터에서는 컴파일할 수 없다. 문법과 토큰 이름만 확인했다
- **화면으로 확인하지 못했다.** Storybook 이 드롭샷 쪽에 있다
- `rounded-md`(6px) 는 드롭샷 스케일에 정확히 대응하는 값이 없다. 디자인 확인이 필요하다
- `text-[0.8rem]`(12.8px) 도 대응하는 단계가 없다. Toggle 에서는 `font-button4`(12px)로
  내렸다. 0.8px 차이라 눈에 띄지 않지만 실측값이 바뀐 자리다

## 6. size 가 있는 컴포넌트 — 옮길 때 확인할 것

`ds-dropshot` 에 없는 shadcn 컴포넌트 중 size 변형을 가진 것은 다섯이다.

| 컴포넌트 | 원본 size | 옮긴 뒤 | 비고 |
| --- | --- | --- | --- |
| Toggle | `default`·`sm`·`lg` | `M`·`S`·`L` | 이 파일럿에서 완료 |
| Sidebar | `default`·`sm`·`lg` | `M`·`S`·`L` | |
| Attachment | `default`·`sm`·`xs` | `M`·`S`·`XS` | |
| Item | `default`·`sm`·`xs` | `M`·`S`·`XS` | |
| InputGroup | `xs`·`sm`·`icon-xs`·`icon-sm` | `XS`·`S` + 별도 아이콘 컴포넌트 | 아이콘 변형을 분리해야 한다 |
