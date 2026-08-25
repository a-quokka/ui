# 결정 로그

> `main` 에 머지 완료(`98b3f4b`). 프로덕션 배포가 붙어 있다.
> 프리뷰: https://shadcn-ui-fork-git-trim-menu-sections-20e2c9-a-quokkas-projects.vercel.app

## 0. 색·UI 전면 롤백 — 2026-08-25

**지시:** 한국어 번역만 남기고 색 변경과 UI 변경을 전부 되돌린다.
기준은 upstream 커밋 `ac60ef5` 다.

### 되돌린 것

| 항목 | 어디 |
|---|---|
| 색 팔레트 전체 (라이트·다크·차트·시맨틱·상호작용 상태) | `apps/v4/app/globals.css` |
| 반경 스케일 — `8px` 고정에서 `calc(var(--radius) * n)` 으로 | 같음 |
| 타이포 램프 20개 `@utility` | 같음 |
| 그림자 두 종 (`shadow-dark`·`shadow-drop-box`) | 같음 · 컴포넌트 |
| 모션 (`duration-225 ease-dropshot`·`grow-in`·스켈레톤) | 같음 · 컴포넌트 |
| z-index 층 (toast 200·modal 150·gnb 100) → 전부 `z-50` | 같음 · 컴포넌트 143곳 |
| 스크롤바 유틸리티 `.scroll-style` | 같음 |
| 버튼 pill `rounded-[69px]` (nova·rhea 각 4곳) | `registry/styles/style-*.css` |
| 스타일 8벌 전체 | 같음 — upstream 그대로 원복 |
| 레지스트리 컴포넌트 35개 | `registry/bases/base/ui`·`registry/new-york-v4/ui` |

### 남긴 것

| 항목 | 이유 |
|---|---|
| 한국어 번역 전부 | 이번 롤백의 대상이 아니다 |
| Dropshot Sans 세 웨이트 | 사용자 결정. `@font-face` 와 `--font-sans`·`--font-heading` 만 남겼다 |
| 제품 이름 Dropshot UI | 사용자 결정. 색도 UI 도 아니다 |
| 기본 테마 `dark` | 사용자 결정 |
| 인프라 수정 전부 | 되돌리면 배포가 깨진다 — B-1·B-2·B-4·B-7 참고 |

### 지운 것

Foundation 3페이지(Colors·Typography·Icons)와 Brand 1페이지(Logos), 그리고 이
페이지들만 쓰던 컴포넌트 `dropshot-icons.tsx`·`dropshot-icon-grid.tsx`·
`brand-asset.tsx`. 되돌린 토큰을 문서화하던 페이지라 그대로 두면 틀린 문서가 된다.
페이지 132 → 128.

### 검증

| 항목 | 결과 |
|---|---|
| `npx tsc --noEmit` | 통과 |
| `npx next build` | 통과 · 128페이지 |
| 렌더된 HTML 의 Dropshot 디자인 토큰 | 0 |
| 빌드된 CSS 의 드롭샷 하드코딩 색 | 0 |
| 소스 전체의 upstream 밖 색 리터럴 | 0 |
| Dropshot Sans woff2 세 웨이트 | 살아 있음 |
| `foundation`·`brand` 로 가는 죽은 링크 | 0 |

### 이 저장소에 대해 새로 알아낸 것

**`registry:build` 는 `bun` 없이도 돈다.** `package.json` 이 `bun run` 으로
적혀 있어 직전 세션들이 "생성물을 손으로 맞춰야 한다" 고 적어 두었는데, 루트의
`tsx` 로 그대로 실행된다. 생성물을 손으로 맞출 필요가 없다.

```bash
cd apps/v4 && ../../node_modules/.bin/tsx ./scripts/build-registry.mts --style all
```

## A. 결정된 것

### A-1. 프로덕션 URL — `main` 에 머지하기로

`main` 은 upstream 머지를 쉽게 하려고 원본 커밋 `ac60ef5` 그대로 두고 있었다.
프로덕션 주소를 얻기 위해 `--no-ff` 로 합쳤다(`98b3f4b`, 커밋 40개).

프로덕션: https://shadcn-ui-fork.vercel.app

Vercel 이 정규 프로덕션 주소로 쓰는 값이 이것이라 `siteConfig.url`·`ogImage`·
`registry.json` 의 `homepage` 도 여기에 맞췄다. `...-a-quokkas-projects...` 쪽도
같은 곳으로 열리지만 정규 주소가 아니다.

**대가:** upstream 을 다시 머지하려면 이제 충돌을 감수해야 한다. `main` 을 원본
그대로 두던 이점을 여기서 포기했다. upstream 을 자주 따라갈 계획이라면
Vercel 프로덕션 브랜치를 따로 두는 쪽이 나았다.

### A-2. aria·radix — 되살리지 않는다

되살리는 비용이 크고 배포가 다시 깨질 위험이 있다.

| 항목                | 규모                           |
| ------------------- | ------------------------------ |
| 레지스트리 컴포넌트 | 634개 (기계적)                 |
| 예제                | 1,009개 — 전부 영어, 번역 필요 |
| 문서                | 130개 — 전부 영어, 번역 필요   |

번역량이 base 64개에 들인 것의 약 2배다. 더 큰 문제는 이게 OOM 원인이었다는
것이다. 빌드 최대 상주 메모리가 8.5GB 였고 컨테이너는 8GB 다. 지운 덕에
4.2GB 로 내려왔다.

### A-3. 차트 팔레트 — 임시값이 아니었다

> **롤백됨 (0절).** 차트 색은 upstream 값으로 돌아갔다.

한동안 "임의 배정" 이라고 적어 두었는데 틀린 말이었다. 실제 값은
`#6633FF · #1A87FF · #29DC7F · #F249AA · #F86C25` 이고, 이건 primary-400 과
secondary blue·green·pink·orange 의 400 단계다. 이미 Dropshot 스케일을
그대로 따르고 있다.

Dropshot 이 차트 전용 팔레트를 따로 정하면 그때 바꾼다.

### A-4. RTL 절 — i18n 으로 바꿨다

en/ko 만 남기면서 두 언어 모두 `dir` 이 `ltr` 이 됐고, 그래서 그 절은 방향
전환을 보여 주지 못한다. 실제로 보여 주는 것이 언어 전환뿐이라 제목을 그에
맞췄다. `/docs/rtl` 가이드와 `ui-rtl` 컴포넌트는 그대로라 실제 RTL 프로젝트를
만드는 데는 지장이 없다.

### A-5. 레지스트리 이름 — Dropshot 으로 바꿨다

"shadcn/ui 레지스트리" 를 "Dropshot UI 레지스트리" 로, `registry.json` 의
`name` 도 함께 바꿨다.

> **남은 것:** `registry.json` 의 `homepage` 가 아직 `ui.shadcn.com` 이다.
> 프로덕션 주소가 확정되면 바꾼다.

### A-6. 상호작용 상태 — 불투명도에서 스케일로

> **롤백됨 (0절).** shadcn 의 불투명도 방식으로 돌아갔다.

shadcn 은 `hover:bg-primary/80` 처럼 불투명도로 상태를 만든다. 이 방식은 뒤에
무엇이 있느냐에 따라 색이 달라진다. 카드(`#1F242A`) 위에서 `bg-primary/80` 은
`#5830D4` 가 되고 채도가 100% 에서 65.6% 로 떨어진다.

Dropshot 은 스케일 단계로 만든다. 배경과 무관하게 언제나 같은 색이다.
primary 를 12단계로 정의해 둔 이유가 이것인데 그중 한 단계만 쓰고 있었다.

### A-7. 그림자 — 두 종으로

> **롤백됨 (0절).** shadcn 의 크기별 그림자 사다리로 돌아갔다.

Dropshot 에는 그림자가 둘뿐이다. 크기별 사다리가 아니라 쓰임새로 나뉜다.

| 토큰 | 값 | 쓰임 |
|---|---|---|
| `shadow-dark` | `0 4px 20px rgb(0 0 0 / .4)` | 모달·토스트·드롭다운·시트 |
| `shadow-drop-box` | `2px 6px 12px .12` + `0 0 4px .12` | 툴팁 |

**작은 그림자는 없앴다.** Dropshot 은 면 색으로 깊이를 낸다
(900 → 850 → 800 → 700). 카드가 배경에서 떠 보이는 것은 그림자가 아니라
`--card #1F242A` 가 `--background #15191E` 보다 밝기 때문이다. 그림자를 겹치면
두 체계가 싸운다.

툴팁·토스트·다이얼로그에는 원래 그림자가 아예 없었다. 넣어 주었다.

### A-8. Secondary 스케일을 시맨틱에 연결

> **롤백됨 (0절).** 시맨틱 색은 upstream 값으로 돌아갔다.

Dropshot 은 blue·red·green·pink·orange 를 각 9단계로 정의해 두었는데 45개 중
하나도 안 쓰이고 있었다. 실사용 관례대로 연결했다.

| 쓰임 | 다크 | 라이트 |
|---|---|---|
| 진행률 채움 | blue-400 `#1A87FF` | blue-600 `#006EE6` |
| 오류 면 | red-900 `#3A070E` | red-100 `#FCE8EB` |
| 오류 강조 | red-300 `#EB5D70` | red-600 `#C91831` |
| 성공 강조 | green-300 `#59E49B` | green-700 `#178C4F` |
| 정보 강조 | blue-300 `#4DA2FF` | blue-700 `#0055B3` |
| 경고 강조 | orange-300 `#F98D56` | orange-700 `#B03F06` |

라이트는 밝은 면에 맞춰 방향을 뒤집었다. 어두운 면에서는 배경이 진하고 글자가
밝지만 밝은 면에서는 반대다.

**슬라이더 range 는 primary 로 두었다.** Dropshot 관례가 지정한 것은 "프로그레스
채움" 이다. 슬라이더는 값을 고르는 입력 컨트롤이라 체크박스·스위치처럼 선택
상태를 나타내는 primary 가 맞다. 진행 표시와 입력 컨트롤을 나눠 본 판단이다.

### A-9. 모션 — Dropshot 값으로

> **롤백됨 (0절).** `duration-100` 과 `animate-pulse` 로 돌아갔다.

값은 `apps/aiStudio/web/tailwind.config.ts` 에서 그대로 가져왔다.

| 토큰 | 값 |
|---|---|
| `--ease-dropshot` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--animate-grow-in` | `grow-in 225ms` · scale .75 → 1 + fade |
| `--animate-skeleton` | `skeleton 1.5s ease-in infinite` |

떠 있는 면이 열릴 때의 타이밍을 `duration-100` 에서 `duration-225 ease-dropshot`
으로 바꿨다. 스켈레톤은 Tailwind 기본 `animate-pulse`(불투명도만 깜빡임)에서
Dropshot 것(왼쪽에서 오른쪽으로 훑고 지나가는 빛)으로 바꿨다.

**`grow-in` 의 scale 0.75 는 적용하지 않았다.** shadcn 의 `zoom-in-95` 를 두었다.
0.75 에서 커지는 동작은 드롭다운마다 튀는 느낌이 강해 문서 사이트에서는 과하다.
타이밍과 이징만 Dropshot 값으로 맞췄다. 제품 화면을 그릴 때는 `animate-grow-in`
토큰이 준비돼 있으니 그대로 쓰면 된다.

> **확인이 필요한 것:** 이 판단은 되돌리기 쉽다. 원본 그대로 가려면
> `zoom-in-95` 를 `zoom-in-75` 로 바꾸면 된다.

### A-10. z-index·스크롤바

> **롤백됨 (0절).** 전부 `z-50` 으로 돌아갔고 스크롤바 유틸리티는 지웠다.

shadcn 은 떠 있는 것에 전부 `z-50` 을 준다. 143개 파일이 같은 값이라 DOM 순서로만
겹침이 정해진다. Dropshot 은 층을 나눠 두었다.

| 층 | 값 | 무엇 |
|---|---|---|
| toast | 200 | 토스트 |
| modalAbove | 151 | 모달 위에 뜨는 것 |
| modal | 150 | 대화 상자·드로어·시트·명령 팔레트 |
| gnb | 100 | 사이트 헤더 |
| gnbBelow | 99 | 문서 사이드바 |
| filter | 20 | 필터 |
| floating | 10 | 흐름 안에서 뜨는 것 |

**떠 있는 면은 `dropdown: 10` 이 아니라 `modalAbove: 151` 로 두었다.** Dropshot 의
`dropdown: 10` 은 모달 위로 뜰 일이 없는 자리 기준이다. 컴포넌트 라이브러리는
대화 상자 안에서도 드롭다운이 열리므로 10 을 그대로 쓰면 뒤로 숨는다. 실제로
그런 데모가 셋 있다 — `dropdown-menu-dialog`, `combobox-responsive`,
`breadcrumb-responsive`.

Dropshot 의 `zIndex.ts` 에도 `// TODO : 추후 컨벤션에 맞게 zIndex 정리하기` 가
달려 있다. 원본에서도 정리되지 않은 영역이다.

스크롤바는 `.scroll-style`(6px, `#4D4D4D`)과 `.scroll-style-dropdown`(4px,
`#393E46`)을 유틸리티로 넣었다. 아직 어디에도 적용하지 않았다. 필요한 자리에
붙여 쓰면 된다.

## B. 처리가 끝난 것

### B-1. Vercel 빌드 메모리 초과 — 해결

원본 `main` 을 포함해 배포 4건 중 3건이 실패하고 있었다. 컴파일 단계 최대 상주
메모리가 8.5GB 인데 빌드 컨테이너가 **2코어 · 8GB** 다.

| 시점      | 최대 상주 메모리 | 페이지 | 컴파일 |
| --------- | ---------------- | ------ | ------ |
| 손대기 전 | 8.5 GB           | 341    | 25초   |
| 지금      | **4.2 GB**       | 133    | 12초   |

무엇을 지웠는지는 커밋 `ef5c1e2` 에 적어 두었다. 요약하면 base 한 벌만 남기고
`(create)`·`(typeset)`·`(styles)`·`blocks`·`charts`·`(view)/preview`·`(app)/examples`
를 걷어냈다. `(view)/view/[style]/[name]` 은 문서의 블록 미리보기가 iframe 으로
띄우므로 남겼다.

webpack 전환은 더 나빴고(로컬에서 JS heap OOM), Node 힙을 조여도 최대 상주 메모리는
그대로였다. 메모리를 쓰는 쪽이 Node 힙이 아니라 Turbopack 이라서다.

### B-2. `NEXT_PUBLIC_APP_URL` 누락 — 해결

메모리를 잡고 나니 다음 오류가 나왔다. Vercel 프리뷰 환경에 이 변수가 없어서
`new URL(undefined)` 이 터졌고 빌드가 통째로 죽었다.

`next.config.mjs` 의 `env` 에서 한 곳으로 채운다.
`NEXT_PUBLIC_APP_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `VERCEL_URL` →
`http://localhost:4000` 순으로 떨어진다.

**Vercel 에 이 변수를 따로 넣을 필요는 없다.** 한때 프리뷰마다 주소가 달라진다고
적어 두었는데 틀린 말이었다. `VERCEL_PROJECT_PRODUCTION_URL` 은 프리뷰 환경에도
주입되므로 체인이 이미 프로덕션 주소로 안정적으로 풀린다. 실제로 프로덕션과
브랜치 프리뷰가 똑같이 `https://shadcn-ui-fork.vercel.app` 을 쓴다.

### B-3. 한국어화 — 완료

- **`content/docs` 전 구역 본문 완료.** components / installation / registry /
  foundation / forms / react / helpers / rtl / utils / dark-mode / (root).
  남은 영어는 고유명사(React Hook Form·TanStack AI 등), 코드 식별자,
  HTTP 상태 문자열, 링크 목록뿐이다
- 예제 513개 중 442개에 한국어가 들어갔다. 나머지는 문구가 없는 배치 전용 예제다
- RTL 예제 57개에 한국어 문안 추가, 아랍어·히브리어 삭제
- 홈 화면: 히어로 제목·설명, 데모 카드 16개 문안 전부
- 사이트 크롬: 사이드바 "신규" 배지, 코드 접기/펼치기, 문서 이전·다음,
  테마 전환, 레지스트리 추가 대화 상자, 페이지네이션
- 컴포넌트 소스의 접근성 문자열(`sr-only`·`aria-label`) — breadcrumb·carousel·
  dialog·sheet·sidebar·pagination·toast·spinner. `registry/bases/base/ui` 가
  원본이고 `styles/*` 는 registry:build 가 다시 만든다
- 메타데이터: `og:locale` 을 `ko_KR` 로, `siteConfig.description` 한국어로
- 언어 선택기는 English · 한국어 둘

### B-4. upstream 히스토리·레거시 페이지 정리 — 완료

지운 라우트로 가는 죽은 링크가 문서에 남아 있어 함께 정리했다. changelog 57개와
rss.xml, 홈 화면의 Announcement 배너, Typeset·Directory 문서, `/colors` 페이지를
지웠다. 남은 문서의 `/create`·`/blocks` 링크는 문장은 두고 링크만 걷어냈다.

페이지 194 → 133.

### B-5. 드롭샷 토큰화 — 완료

> **대부분 롤백됨 (0절).** 색·반경·타이포 램프는 되돌렸고 Dropshot Sans 만 남았다.

`.dark` 는 TOKEN-MAP 원본 값, 반경은 `rounded-N = N×4px`, 폰트는 Dropshot Sans
세 웨이트를 CDN 에서 받는다. Foundation 섹션에 Colors·Typography 두 페이지를 새로 넣었다.

### B-6. 제품 이름을 Dropshot UI 로 — 완료

바꾼 것은 이 포크의 정체성을 가리키는 자리뿐이다. 브라우저 탭 제목, 문서 산문
65곳, foundation 문서 표기(`드롭샷` → `Dropshot`), 예제 안의 데모 인물·제목.

남긴 것은 바꾸면 문서가 틀리거나 사용자가 따라 할 수 없게 되는 이름들이다.
CLI(`npx shadcn@latest`), 패키지(`@shadcn/react`), MCP 서버·스킬 이름,
`ui.shadcn.com` 주소, figma 문서의 서드파티 제품명, LICENSE·푸터 저작자 표기.

> **되짚어 볼 것:** "shadcn/ui 레지스트리" 라는 표현은 CLI 가 실제로 해석하는
> 기본 레지스트리라 그대로 뒀다. 이 포크가 자체 레지스트리를 운영할 계획이라면
> 바꾸는 게 맞다.

### B-7. 죽은 링크·리다이렉트 정리 — 완료

배포된 130개 페이지의 렌더 결과를 전수 검사해 찾았다.

- **Typography 문서가 404 였다.** 사이드바에 링크가 있고 페이지도 살아 있는데
  `/docs/components/base/typography` → `/docs/typeset` 리다이렉트가 가로챘고
  그 목적지는 이미 지운 페이지였다
- 설치 문서 7개의 `href="/create"` 버튼. 이전 정리에서 마크다운 링크만 걷어내고
  JSX `<Link href>` 를 놓쳤다
- `/charts`·`/directory`·`/themes` 리다이렉트, `(root)/meta.json` 의
  `typeset`·`blocks`·`[Changelog]`
- 명령 팔레트의 Styles 그룹(→ 삭제된 `/create`)

### B-8. 코드 예제 안의 문구까지 한국어 — 완료

본문에 직접 쓰인 ```tsx 펜스 안의 화면 문구 110종. 본문과 미리보기는 한국어인데
스니펫만 영어라 어긋나 있었다. JSX 텍스트 노드와 문구 prop 만 건드렸고
value·name·id·href 같은 식별자는 손대지 않았다. 고유명사 6종은 남겼다
(Acme Inc, Evil Rabbit, INV001, Credit Card, PDF · 2.4 MB, Open in v0).

### B-9. 검증 방식

130개 페이지의 **렌더된 HTML** 과 **배포된 사이트 크롤** 두 가지로 확인한다.
빌드 통과만으로는 위 문제들이 하나도 안 잡혔다.

| 항목                                 | 결과     |
| ------------------------------------ | -------- |
| `<title>` 에 Dropshot UI 없는 페이지 | 0        |
| 의도치 않은 shadcn 잔여 문구         | 0        |
| 닿지 않는 내부 링크(리다이렉트 반영) | 0        |
| 목적지 없는 리다이렉트               | 0        |
| 배포 사이트 크롤 136페이지           | 전부 200 |

검사 스크립트는 세션 스크래치패드의 `crawl.py` 에 있다.

### B-10. Foundation·Brand 섹션 — 완료

> **지움 (0절).** 되돌린 토큰을 문서화하던 페이지라 함께 걷어냈다.

- Foundation 에 Icons 를 더했다. aiStudio CDN(`cdn.aistudio.dropshot.io`)에서
  받은 70개다. 24×24 가 64개로 이게 아이콘 체계의 본체이고, 그리드를 벗어난
  여섯 개는 따로 적었다. `fill`·`stroke` 를 `currentColor` 로 바꿔 인라인했으므로
  아이콘 네트워크 요청이 0건이다
- Brand 섹션(Logos)에 로고 네 개를 정리했다. 로고는 고유한 색을 지켜야 해
  인라인하지 않고 CDN 원본을 띄운다
- 캠페인 자산(Double Week·Super Week) 열 개는 넣었다가 뺐다. 기간이 정해진
  프로모션용이라 다음 캠페인에서 교체될 것들이고, 디자인 시스템 문서가
  안고 갈 내용이 아니다

**stock 과 aiStudio 는 CDN 이 다르다.** 처음 `cdn.stock.dropshot.io` 로 받았다가
절반이 403 이었고, `apps/aiStudio/web/src/constants/url.ts` 를 보고 알았다.

## C. 내가 정하고 진행한 것 — 뒤집고 싶으면 말해 달라

|      | 내용                                                                                                                 |
| ---- | -------------------------------------------------------------------------------------------------------------------- |
| C-1  | 문서 한국어화를 8배치로 쪼개 커밋. 배치 단위로 되돌릴 수 있다                                                        |
| C-2  | 조사 앞 공백을 붙여 씀. `` `Button` 을 `` 가 아니라 `` `Button`을 ``                                                 |
| C-3  | ~~라이트 팔레트를 파생해서 만듦~~ — **롤백됨(0절).** 팔레트는 upstream 으로 돌아갔다. 기본 테마 `dark` 만 남았다 |
| C-4  | ~~타이포 램프 20개를 `@utility` 로 노출~~ — **롤백됨(0절).** 유틸리티를 지웠다                                       |
| C-5  | ~~반경 배수 계산을 걷어냄~~ — **롤백됨(0절).** `calc(var(--radius) * n)` 으로 돌아갔다                               |
| C-6  | next/font 의 Geist 제거. 클래스 선택자가 `:root` 를 이겨 브랜드 폰트를 덮음. Dropshot Sans 를 남기기로 해 유지        |
| C-7  | `<html lang="ko">`                                                                                                   |
| C-8  | 도달 불가 코드 삭제. `return []` 뒤에 원본 코드가 남아 `tsc` 가 깨져 있었다                                          |
| C-9  | 홈 화면의 "Build Your Own" 버튼이 지워진 `/create` 로 가고 있어 `/docs/components` 로 돌렸다                         |
| C-10 | registry 블록이 쓰는 `useDesignSystemSearchParams` 는 편집기가 없어 쿼리만 읽는 최소 구현으로 대체                   |
| C-11 | 타이포그래피 예제의 Lorem ipsum 을 한글 자리 채움 문장으로 교체                                                      |

## D. 남은 것

- **`## RTL` 섹션은 이제 LTR 로 렌더된다.** English·한국어 둘 다 `ltr` 이라
  방향 시연이 되지 않는다. 지시대로 en/ko 만 남긴 결과다. 섹션을 지울지 결정 필요
- **`registry/bases/base/blocks/*` 는 영어 그대로다.** dashboard-01, sidebar-01~16,
  login-01~05 등. 문서에서 이름만 언급될 뿐 렌더되는 페이지가 없어 손대지 않았다.
  사용자가 `shadcn add` 로 설치하는 템플릿이라 한국어화가 오히려 어색할 수 있다
- 로컬 시각 확인은 지침대로 dev 서버를 띄우지 않아 배포된 프리뷰로만 했다.
  `registry:build` 는 루트의 `tsx` 로 로컬에서도 돌아간다 (0절 참고).

### D 에서 빠진 것 — 처리 완료

- Calendar 데모 한국어 달력 (`date-fns/locale` 의 `ko`) — 남아 있다
- ~~텍스트 버튼 완전 pill(69px)~~ — 롤백됨(0절)
- ~~타이포그래피 램프 20단계를 `@apply` 에 반영~~ — 롤백됨(0절)
