# 겹치는 6개 비교 — 드롭샷 현재 vs shadcn 이식본

`ds-dropshot` 에 이미 있는 여섯 개를 실제로 대조했다. 드롭샷 저장소는 읽기만 했다.

`overlap/` 에 이식본 두 개(Button·Switch)를 두었다. **드롭샷에 그대로 넣으라고 만든
것이 아니라 나란히 놓고 보라고 만든 것이다.**

---

## 한눈에

| 컴포넌트 | 판단 | 왜 |
| --- | --- | --- |
| **Button** | 부분적으로 가져올 만함 | 크기 체계는 shadcn 이 촘촘하다. 다만 폭·높이 계산 방식이 달라 영향이 크다 |
| **Switch** | 가져올 것 거의 없음 | 크기만 다르고 드롭샷 쪽이 더 크다. 색은 드롭샷이 파랑을 의도적으로 쓴다 |
| **Skeleton** | **가져올 것 없음** | 기법이 아예 다르다. 드롭샷 쪽이 낫다 |
| **Spinner** | **가져올 것 없음** | 드롭샷 쪽이 더 정교하고 의존성도 없다 |
| **Toast** | **가져올 것 없음** | 구조가 다르다. 바꾸면 호출 방식이 통째로 달라진다 |
| **Tooltip** | 위치 계산만 볼 만함 | 여백은 이미 똑같다. 드롭샷의 약점은 위치 계산이다 |

**여섯 개 중 넷은 드롭샷 것이 낫거나 대등하다.** 이건 좋은 소식이다 — 합칠 일이
거의 없다는 뜻이고, 위험한 작업이 줄어든다.

---

## Button

가장 차이가 크고, 가장 조심해야 한다.

### 크기

| 크기 | 드롭샷 | shadcn |
| --- | --- | --- |
| XS | `font-button3`(14/22) · `px-3 py-1.5` → **높이 34px** | `h-6`(24) · `px-2` · 12px 글자 |
| S | `font-button3`(14/22) · `px-4 py-2` → **높이 38px** | `h-7`(28) · `px-2.5` · 12.8px 글자 |
| M | `font-button2`(16/24) · `px-6 py-2` → **높이 40px** | `h-8`(32) · `px-2.5` · 14px 글자 |
| L | `font-button1`(18/26) · `px-8 py-3` → **높이 50px** | `h-9`(36) · `px-2.5` · 14px 글자 |

드롭샷은 **글꼴 행간 + 상하 패딩**으로 높이가 정해지고, shadcn 은 **높이를 직접**
박는다. 그래서 같은 이름이라도 드롭샷 쪽이 8~14px 크다.

shadcn 은 여기에 아이콘 전용 크기 넷(`icon`·`icon-xs`·`icon-sm`·`icon-lg`)이 더 있다.
드롭샷은 그걸 `IconButton` 이라는 별도 컴포넌트로 뺐다.

### 형태

| | 드롭샷 | shadcn |
| --- | --- | --- |
| 반경 | `rounded-[69px]` 완전 pill | `rounded-lg` 8px |
| 폭 | **`w-full`** — 부모를 꽉 채운다 | `inline-flex` — 내용만큼 |
| 방향 | **`flex-col`** — 자식을 세로로 쌓는다 | `inline-flex` 가로 |
| 좌우 여백 | 12·16·24·32px | 8·10·10·10px |

> ⚠️ **가장 큰 위험은 반경이 아니라 폭이다.** 드롭샷 버튼은 기본이 `w-full` 이다.
> shadcn 형태로 바꾸면 **제품의 모든 버튼이 폭을 잃고** 레이아웃이 통째로 달라진다.
> 반경(pill → 8px)은 눈에 띄지만 레이아웃은 안 깨진다. 폭은 반대다.

### 색

드롭샷이 8종(`primary`·`grayscale800`·`grayscale900`·`white`·`red`·`ghost`·
`primaryGradient`·`blue`), shadcn 이 6종(`default`·`outline`·`secondary`·`ghost`·
`destructive`·`link`). **드롭샷 쪽이 더 많고 제품 문맥에 맞춰져 있다.** 가져올 것 없다.

### 결정 — 드롭샷 `Button` 은 그대로 둔다

**`w-full flex-col` 을 버리지 않는다.** 사용자 결정이다. shadcn 형태로 바꾸면
제품의 모든 버튼이 폭을 잃고 레이아웃이 통째로 달라진다.

그런데 새로 들어오는 52개 중 **14곳이 Button 을 인라인으로 쓴다** — 사이드바 토글,
캐러셀 화살표, 페이지네이션 숫자, 대화상자 닫기 같은 자리다. 그대로 두면 그
버튼들이 폭을 꽉 채운다. 게다가 그 14곳은 `variant="ghost"`·`size="icon-sm"` 처럼
드롭샷 `Button` 에 없는 어휘로 부른다.

그래서 **같은 폴더에 인라인 전용 형제를 둔다.**

```
packages/design-system/components/Button/
├── Button.tsx        ← 손대지 않는다. w-full flex-col pill 그대로
├── IconButton.tsx    ← 기존
├── CloseButton.tsx   ← 기존
└── InlineButton.tsx  ← 새로 추가. 내용만큼만 차지한다
```

드롭샷이 이미 쓰는 방식이다 — `Button/` 폴더 안에 역할별로 나눠 뒀다. 규칙에
어긋나지 않고 **기존 파일이 하나도 바뀌지 않는다.** 제품 코드는 계속 `Button` 을
쓰고, 새로 들어오는 52개만 `InlineButton` 을 부른다.

`overlap/Button/Button.tsx` 는 이 결정 이전에 만든 **비교용**이다. 실제로 넣을
것은 `InlineButton` 이다.

### 그래도 가져오는 것

크기 네 단계의 촘촘함과 아이콘 붙는 쪽 여백을 줄이는 처리
(`has-[[data-icon=inline-end]]:pr-2`). 폭·방향·반경은 드롭샷의 디자인 선택이다.

---

## Switch

| | 드롭샷 | shadcn |
| --- | --- | --- |
| 크기 | 40 × 20 (하나뿐) | 32 × 18.4 (default) · 24 × 14 (sm) |
| 손잡이 | 16px, 켜짐 22px 이동 | 16px / 12px |
| 켜짐 색 | **`secondary-blue-400`** | `primary` |
| 꺼짐 색 | `grayscale-700` | `input` |
| 구현 | `input[type=checkbox][role=switch]` 직접 | Base UI 프리미티브 |

**스위치가 파란 것은 드롭샷의 의도된 선택이다.** shadcn 은 primary(보라)를 쓴다.
색은 가져올 대상이 아니므로 파랑을 지킨다.

가져올 만한 것은 **크기를 둘로 나눈 것** 정도다. 드롭샷 쪽이 8px 크므로 그대로
바꾸면 기존 화면에서 스위치가 작아 보인다.

---

## Skeleton — 가져올 것 없음

| | 드롭샷 | shadcn |
| --- | --- | --- |
| 기법 | 빛이 왼쪽에서 오른쪽으로 훑고 지나간다 (`animate-skeleton`) | 불투명도만 깜빡인다 (`animate-pulse`) |
| 구조 | `Skeleton`(감싸개) + `SkeletonBlock`(면) | `div` 하나 |
| 면 색 규칙 | 부모보다 한 단계 밝게, 그림자는 한 단계 어둡게 — 주석에 명문화 | `bg-muted` 고정 |

드롭샷 쪽이 명백히 정교하다. shadcn 에서 가져올 것은 `rounded-md`(6px)뿐인데
드롭샷 반경 스케일에는 6px 이 없다.

---

## Spinner — 가져올 것 없음

| | 드롭샷 | shadcn |
| --- | --- | --- |
| 기법 | conic-gradient + radial mask 로 직접 그린다 | `lucide-react` 의 `Loader2Icon` |
| 조절 | `size`·`color`·`speed`·`strokeWidth`·`delay` | `className` 뿐 |
| 의존성 | 없음 | **`lucide-react` 필요** |

드롭샷 쪽이 더 자유롭고 의존성도 없다. `delay` 로 짧은 로딩에서 스피너가
번쩍이는 것을 막는 장치까지 있다.

---

## Toast — 가져올 것 없음

| | 드롭샷 | shadcn |
| --- | --- | --- |
| 방식 | **명령형** — `showToast({ type, message })` | **선언형** — `<Toast>` 트리 |
| 기반 | `react-hot-toast` | Base UI toast |
| 종류 | `default`·`success`·`error` (아이콘 포함) | 컴포넌트 조합 |
| 크기 | `min-w-[280px] max-w-[400px]` · `px-4 py-2` · `rounded-2` | — |

**구조가 다르다.** 드롭샷은 어디서든 함수 한 줄로 띄우고, shadcn 은 화면에 트리를
그려 둬야 한다. 바꾸면 호출하는 코드가 전부 달라진다. 이건 "형태를 가져오는" 문제가
아니라 "설계를 바꾸는" 문제다.

---

## Tooltip — 위치 계산만 볼 만함

| | 드롭샷 | shadcn |
| --- | --- | --- |
| 여백 | `px-3 py-1.5` (기본) · `px-2 py-1` (작게) | `px-3 py-1.5` |
| 반경 | `rounded-2`(8) · `rounded-1`(4) | `rounded-md`(6) |
| 위치 | **손으로 계산** — `absolute` + 5방향 고정 | Base UI + floating-ui |
| 꼬리 | 삼각형 있음 | 없음 |
| 층 | `z-tooltip`(10) | `z-50` |
| 그림자 | `shadow-dropBox` | 없음 |

**여백이 이미 똑같다.** `px-3 py-1.5` 로 우연히 일치한다.

드롭샷의 약점은 하나다 — **위치를 손으로 계산해서 화면 가장자리에서 잘릴 수 있다.**
shadcn 은 floating-ui 로 자동으로 뒤집고 밀어 넣는다. 꼬리와 그림자는 드롭샷이
더 갖췄으므로, 가져온다면 **위치 계산만** 가져오는 것이 맞다.

---

## 그래서 무엇을 할까

1. **Skeleton·Spinner·Toast 는 손대지 않는다.** 드롭샷 것이 낫다
2. **Switch 는 크기 두 단계만 검토한다.** 색은 그대로
3. **Tooltip 은 위치 계산 교체를 따로 다룬다.** 형태는 이미 맞다
4. **Button 은 그대로 두고 `InlineButton` 을 새로 만든다** (위 결정 참고)

**여섯 개 모두 기존 파일을 고치지 않는다.** 합치는 작업이 사라졌다.

남은 일은 겹치지 않는 52개를 규칙대로 옮기는 것과, 그 52개가 부르는 Button 을
`InlineButton` 으로 돌리는 것이다. 그쪽은 제품이 아직 쓰지 않아 깨질 것이 없다.
