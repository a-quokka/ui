# 손으로 합쳐야 하는 컴포넌트

`ds-dropshot` 에 같은 이름이 이미 있다. **덮어쓰지 마라.** 제품 코드가 기존 API
(`themeColor` 등)를 쓰고 있어 그대로 바꾸면 호출부가 깨진다.

shadcn 쪽에서 가져올 것은 **형태(px 값)** 뿐이다. 색·글꼴·prop 이름은 드롭샷 것을
유지한다. 규칙은 `dropshot-pilot/RULES.md` 에 있다.

## `@base-ui/react` 는 들이기로 정했다

아래 표에 `render`·`nativeButton` 이 보이면 그건 `@base-ui/react` 의 prop 이다.
드롭샷에는 이 의존성이 없어 한때 걷어낼지 고민했는데, **62개 중 38개**가 이 부품을
쓴다. 걷어내려면 38개를 다시 써야 하고 그중에 대화상자·드롭다운·셀렉트·툴팁·
슬라이더가 들어 있다 — 포커스 가두기와 위치 계산은 직접 만들면 거의 틀리는 자리다.

그래서 `packages/design-system/package.json` 에 한 줄을 더한다.

```json
"@base-ui/react": "^1.6.0"
```

**대신 이 부품에서 얻는 게 `render`(다른 태그로 그리기)뿐인 컴포넌트는 계속 걷어낸다.**
`dropshot-pilot/` 의 Badge·Separator·Toggle 이 그렇게 만든 예다.

## Button

내보낸 컴포넌트 13곳이 이걸 **shadcn API 로** 쓴다. 합친 결과가 아래를
전부 받아 줘야 한다.

| prop | 넘기는 값 |
| --- | --- |
| `className` | `absolute top-2 right-2`, `absolute top-3 right-3`, `cn(className)`, `cn(inputGroupButtonVariants({ size` |
| `data-active` | `isActive` |
| `data-day` | — |
| `data-range-end` | `modifiers.range_end` |
| `data-range-middle` | `modifiers.range_middle` |
| `data-range-start` | `modifiers.range_start` |
| `data-selected-single` | — |
| `data-sidebar` | `trigger` |
| `data-size` | `size` |
| `data-slot` | `alert-dialog-action`, `attachment-action`, `carousel-next`, `carousel-previous`, `pagination-link`, `sidebar-trigger` |
| `disabled` | `!canScrollNext`, `!canScrollPrev` |
| `nativeButton` | `false` |
| `onClick` | `scrollNext`, `scrollPrev` |
| `render` | — |
| `size` | `icon`, `icon-sm`, `icon-xs`, `size`, `sm` |
| `type` | `type` |
| `variant` | `ghost`, `isActive ? "outline" : "ghost"`, `outline`, `variant`, `variant ?? "ghost"` |

쓰는 곳: AlertDialog, Attachment, Calendar, Carousel, Combobox, Dialog, InputGroup, MessageScroller, Pagination, Questionnaire, Sheet, Sidebar, Toast

## Skeleton

내보낸 컴포넌트 1곳이 이걸 **shadcn API 로** 쓴다. 합친 결과가 아래를
전부 받아 줘야 한다.

| prop | 넘기는 값 |
| --- | --- |
| `className` | `h-4 max-w-(--skeleton-width) flex-1`, `size-4 rounded-md` |
| `data-sidebar` | `menu-skeleton-icon`, `menu-skeleton-text` |
| `style` | — |

쓰는 곳: Sidebar

## Spinner

이 내보내기 안에서 이 컴포넌트를 쓰는 곳은 없다. 형태만 비교하면 된다.

## Switch

이 내보내기 안에서 이 컴포넌트를 쓰는 곳은 없다. 형태만 비교하면 된다.

## Toast

이 내보내기 안에서 이 컴포넌트를 쓰는 곳은 없다. 형태만 비교하면 된다.

## Tooltip

내보낸 컴포넌트 1곳이 이걸 **shadcn API 로** 쓴다. 합친 결과가 아래를
전부 받아 줘야 한다.

| prop | 넘기는 값 |
| --- | --- |

쓰는 곳: Sidebar
