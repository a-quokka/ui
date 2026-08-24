# 결정 로그

> `main` 에 머지 완료(`98b3f4b`). 프로덕션 배포가 붙어 있다.
> 프리뷰: https://shadcn-ui-fork-git-trim-menu-sections-20e2c9-a-quokkas-projects.vercel.app

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

shadcn 은 `hover:bg-primary/80` 처럼 불투명도로 상태를 만든다. 이 방식은 뒤에
무엇이 있느냐에 따라 색이 달라진다. 카드(`#1F242A`) 위에서 `bg-primary/80` 은
`#5830D4` 가 되고 채도가 100% 에서 65.6% 로 떨어진다.

Dropshot 은 스케일 단계로 만든다. 배경과 무관하게 언제나 같은 색이다.
primary 를 12단계로 정의해 둔 이유가 이것인데 그중 한 단계만 쓰고 있었다.

### A-7. 그림자 — 두 종으로

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
| C-3  | **라이트 팔레트를 파생해서 만듦.** 드롭샷에 공식 값이 없어 같은 램프를 뒤집었다. 확정값이 아니다. 기본 테마는 `dark` |
| C-4  | 타이포 램프 20개는 `@utility` 로만 노출. 컴포넌트 41곳 클래스 교체는 하지 않음                                       |
| C-5  | 반경 배수 계산을 걷어내고 실제 값을 직접 박음                                                                        |
| C-6  | next/font 의 Geist 제거. 클래스 선택자가 `:root` 를 이겨 브랜드 폰트를 덮음                                          |
| C-7  | `<html lang="ko">`                                                                                                   |
| C-8  | 도달 불가 코드 삭제. `return []` 뒤에 원본 코드가 남아 `tsc` 가 깨져 있었다                                          |
| C-9  | 홈 화면의 "Build Your Own" 버튼이 지워진 `/create` 로 가고 있어 `/docs/components` 로 돌렸다                         |
| C-10 | registry 블록이 쓰는 `useDesignSystemSearchParams` 는 편집기가 없어 쿼리만 읽는 최소 구현으로 대체                   |
| C-11 | 타이포그래피 예제의 Lorem ipsum 을 한글 자리 채움 문장으로 교체                                                      |

## D. 남은 것

- **차트 팔레트는 임시값이다.** 드롭샷에 차트 색이 없어 secondary 400 단계를
  색상환 순서로 임의 배정했다. → **A 항목에 가까운 결정 사항**
- **`## RTL` 섹션은 이제 LTR 로 렌더된다.** English·한국어 둘 다 `ltr` 이라
  방향 시연이 되지 않는다. 지시대로 en/ko 만 남긴 결과다. 섹션을 지울지 결정 필요
- **`registry/bases/base/blocks/*` 는 영어 그대로다.** dashboard-01, sidebar-01~16,
  login-01~05 등. 문서에서 이름만 언급될 뿐 렌더되는 페이지가 없어 손대지 않았다.
  사용자가 `shadcn add` 로 설치하는 템플릿이라 한국어화가 오히려 어색할 수 있다
- 로컬 시각 확인은 지침대로 dev 서버를 띄우지 않아 배포된 프리뷰로만 했다.
  이 저장소에 `bun` 이 없어 `registry:build` 를 로컬에서 돌리지 못했다
  (Vercel 빌드에서는 돌아간다)

### D 에서 빠진 것 — 이번에 처리 완료

- Calendar 데모 한국어 달력 (`date-fns/locale` 의 `ko`)
- 텍스트 버튼 완전 pill(69px)
- 타이포그래피 램프 20단계를 `registry/styles/style-*.css` 의 `@apply` 에 반영
