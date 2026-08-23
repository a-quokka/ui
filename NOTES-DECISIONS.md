# 확인 필요 목록

> 2026-08-23 세션. 브랜치 `trim/menu-sections-components`.
> 작업은 계속 진행 중이고 이 파일은 갱신된다.

## A. 결정이 필요한 것

### A-1. Vercel 빌드가 메모리 초과로 죽는다 — **배포가 막혀 있다**

브랜치는 푸시했지만 **프리뷰 배포가 실패한다.** 원인은 내 변경이 아니라 이 포크의
빌드 자체가 Vercel 무료 플랜 빌드 컨테이너(8GB)에 안 들어간다는 것이다.

Vercel 빌드 로그 마지막 줄:

```
• At least one "Out of Memory" ("OOM") event was detected during the build.
```

`✓ Compiled` 이 찍히기 전에 죽으므로 **컴파일 단계**에서 터진다.

로컬에서 실측한 값이다 (`/usr/bin/time -l`, 컴파일 단계만):

| 빌드 범위 | 최대 상주 메모리 |
|---|---|
| 전체 (지금 상태) | **8.5 GB** |
| out-of-scope 라우트 그룹 제외 | 7.1 GB |
| `/docs` 만 | 5.9 GB |

Vercel 컨테이너가 8GB 이니 지금 상태로는 늘 아슬아슬하다. 실제로 이 저장소의
배포 4건 중 3건이 실패했고, **원본 `main` 의 프로덕션 빌드도 같은 이유로 실패해 있다.**
성공한 한 건(`030f5b4`)은 운이 좋았던 쪽에 가깝다.

webpack 으로 바꿔 봤지만 더 나빴다 — 로컬에서 JS heap OOM 으로 죽는다.
`NODE_OPTIONS=--max-old-space-size` 로 Node 힙을 조여도 최대 상주 메모리는
그대로였다. 메모리를 쓰는 쪽이 Node 힙이 아니라 Turbopack 이라서다.
Tailwind 의 `@source` 스캔 범위를 줄여 봐도 변화가 없었다.

**골라 달라. 셋 중 하나가 필요하다.**

1. **범위 밖 라우트 그룹을 실제로 삭제한다** — `(styles)`·`(create)`·`(typeset)`·
   `(view)`·`blocks`·`charts`·`directory`. 실측 7.1GB 로 내려가 빌드가 통과한다.
   이전 세션이 한 번 시도했다가 공유 코드가 라우트 그룹 안에 흩어져 있어서
   연쇄로 깨졌고, 그래서 "라우트 파일은 지우지 않았다" 고 적어 두었다.
   제대로 하려면 공유 파일(`(create)/lib/fonts`, `(typeset)/typeset.css`,
   `(view)/preview/fonts`)을 중립 위치로 옮긴 뒤 지워야 한다. 반나절 작업이다.
   **이전 세션의 명시적 결정을 뒤집는 일이라 내가 임의로 하지 않았다.**
2. **Vercel 빌드 머신을 키운다** — 프로젝트 설정 변경이고 요금이 붙을 수 있다.
   설정 변경이라 승인 없이 하지 않았다.
3. **로컬에서 빌드해 올린다** — `vercel build && vercel deploy --prebuilt`.
   로컬 빌드는 40초에 통과한다. 다만 이 머신에 Vercel CLI 로그인이 안 돼 있고
   (`~/.local/share/com.vercel.cli` 없음), 로그인은 계정 인증이라 대신 못 한다.
   git 연동이 아닌 배포가 되는 것도 감안해야 한다.

#### 1번을 고른다면 — 실행 계획은 이미 다 조사해 두었다

의존 관계를 전부 훑어서, 무엇을 지우고 무엇을 먼저 옮겨야 하는지 확인했다.
**삭제는 승인이 필요한 동작이라 실행하지 않았다.** 승인만 주면 그대로 진행한다.

지울 것:

```
apps/v4/app/(app)/(create)
apps/v4/app/(app)/(typeset)
apps/v4/app/(app)/(styles)
apps/v4/app/(app)/blocks
apps/v4/app/(app)/charts
apps/v4/app/(app)/directory
apps/v4/app/(view)/preview        ← (view) 전체가 아니라 preview 만
apps/v4/app/typeset.css/route.ts  ← typeset 커스터마이저 전용 라우트
apps/v4/components/designer-actions.tsx
```

**`app/(view)/view/[style]/[name]` 는 남겨야 한다.** 컴포넌트 문서의 블록
미리보기가 이 경로를 iframe 으로 띄운다 (`components/component-preview.tsx:50`,
`components/block-viewer.tsx:252`). 이전 세션이 `(view)` 를 남긴 이유가 이것이다.

지우기 전에 먼저 옮겨야 하는 것 둘:

1. `app/(app)/(typeset)/typeset.css` → `app/typeset.css`
   루트 레이아웃이 읽고, `.typeset` 클래스를 문서 본문(`mdx-components.tsx`,
   `docs/[[...slug]]/page.tsx`, `docs/changelog/page.tsx`)이 쓴다. 파일은 살리고
   위치만 옮긴 뒤 `app/layout.tsx:18` 의 import 를 고친다.
2. `components/site-header.tsx` 에서 `DesignerActions` 사용을 걷어낸다.
   이 컴포넌트가 `(create)` 의 `project-form`·`v0-button` 을 끌어온다.
   헤더에서 Create 는 이미 내비게이션에서 빠져 있으니 같이 정리하면 된다.

바깥에서 이 그룹들을 참조하는 곳은 위 두 군데가 전부다(전체 소스를 훑어 확인).
`/preview/*` 링크는 `(typeset)` 과 `(create)` 안에서만 쓰이므로 함께 사라진다.

실측 결과 이 구성에서 컴파일 최대 상주 메모리가 **6.8GB** 로 내려간다.
8GB 컨테이너에 1.2GB 여유가 생긴다.

곁들여: 아래 aria·radix 컴포넌트 문서 두 벌을 걷어내면 `/docs` 자체가 훨씬 가벼워진다.
5.9GB 의 대부분이 미리보기용 예제·스타일 모듈 그래프(약 3,200개 모듈)다.
이것도 범위 결정이라 손대지 않았다.

### A-2. RTL 섹션이 이제 RTL 을 보여 주지 못한다 — **되돌리기 쉬움**

인수 문서의 "RTL 섹션은 English + 한국어만 남긴다" 를 그대로 적용했다. 그런데
미리보기의 방향(`dir`)은 **선택된 언어의 `dir` 값에서 나온다.** English 도 한국어도
`ltr` 이라, 컴포넌트 문서 54곳의 `## RTL` 섹션이 전부 LTR 로 렌더된다.
즉 그 섹션이 원래 하던 일(오른쪽에서 왼쪽 배치 시연)을 더 이상 하지 않는다.

되돌리는 비용은 한 줄이다 — `components/language-selector.tsx` 의
`languages = ["en", "ko"]` 에 `"ar"` 를 다시 넣으면 된다. 아랍어·히브리어 문안은
예제 소스에 그대로 남겨 두었다(지우지 않았다).

셋 중에 골라 달라.

1. 지금 상태 유지 — RTL 시연을 포기한다
2. `["en", "ko", "ar"]` — 아랍어 하나만 남겨 RTL 시연을 살린다
3. 컴포넌트 문서에서 `## RTL` 섹션 자체를 걷어낸다 (54개 mdx 수정)

### A-3. 남은 데모 프리뷰를 어디까지 한국어로 옮길 것인가

`apps/v4/examples/base/` 에 데모가 **513개** 있다. 이번에 옮긴 것은 두 묶음이다.

- RTL 예제 57개 (문안 465줄)
- 각 컴포넌트 페이지 맨 위에 놓이는 메인 프리뷰 `*-demo.tsx` 68개

남은 것은 변형 예제 약 386개다(`accordion-basic`, `accordion-multiple` 처럼
문서 중간에 붙는 예제들). 페이지를 내리면 위쪽 미리보기는 한국어인데 아래쪽
변형 예제는 영어라 섞여 보인다. 여기까지 갈지 정해 달라.

`ai-sdk-helper-demo`·`tanstack-ai-helper-demo` 두 개는 Helpers 문서에만 쓰여
범위 밖이라 두었다. `aria`·`radix` 두 벌(약 1,000개)도 인수 문서 방침대로 두었다.

### A-4. Calendar 데모가 아직 영어 달력이다

`react-day-picker` 에 `locale` 을 넘기지 않아 월·요일 이름이 영어로 나온다.
`date-fns/locale/ko` 를 넘기면 되지만 데모의 import 가 늘어나는 변경이라
남겨 두었다. RTL 예제 쪽에는 이미 `locale` 을 넘기는 배선이 있다.

## B. 내가 정하고 진행한 것 — 뒤집고 싶으면 말해 달라

### B-1. 커밋을 배치로 쪼갰다

문서 한국어화를 8배치로 나눠 배치마다 빌드를 돌리고 커밋했다. 되돌릴 때
파일 단위가 아니라 배치 단위로 잘라낼 수 있다.

### B-2. 조사 앞 공백을 붙여 썼다

`` `Button` 을 `` 이 아니라 `` `Button`을 `` 로 통일했다. 백틱 뒤에 조사가 붙어도
한국어 맞춤법대로 띄우지 않는다. 자동 정리 스크립트를 돌렸다.

### B-3. 라이트 팔레트를 파생해서 만들었다

드롭샷은 다크 전용이라 공식 라이트 값이 없다. 문서 사이트에는 테마 토글이 있어서
라이트를 비워 둘 수 없었다. 같은 `grayscale` 램프를 뒤집어 파생했고 `primary` 와
차트만 원본을 썼다. **확정값이 아니다.** `globals.css` 의 `:root` 블록에 주석을,
Foundation → Colors 페이지에 Callout 을 달아 두었다.

기본 테마는 `dark` 로 바꿨다. 드롭샷이 다크 우선이라 첫 화면이 브랜드 톤이어야
한다고 봤다.

### B-4. 타이포 램프는 유틸리티로만 노출했다

램프 20개를 `@utility font-*` 로 옮겼지만 컴포넌트에는 적용하지 않았다.
이전 실험에서 컴포넌트 클래스 41곳을 갈아 끼워야 했던 작업이고, 인수 문서의
2단계 3항은 "폰트를 Dropshot Sans 로 통일" 까지였다. 적용은 별도 결정으로 남긴다.

### B-5. 반경 배수 계산을 걷어냈다

`--radius-sm: calc(var(--radius) * 0.6)` 같은 배수식으로는 드롭샷의
4 / 8 / 12 / 16 / 20 / 24px 가 나오지 않는다. `@theme inline` 에 실제 값을 직접
박았다. 부작용으로 `legacy-themes.css` 의 스타일별 `--radius` 가 반경 스케일에
더 이상 영향을 주지 않는다. 그쪽은 우리 섹션 밖(legacy 스타일 미리보기)이다.

### B-6. 아랍어·히브리어 폰트 로드를 뺐다

선택기에서 두 언어가 사라졌으니 `Noto Sans Arabic`·`Noto Sans Hebrew` 를 받을
이유가 없어 `lib/fonts.ts` 와 `globals.css` 에서 걷어냈다. A-2 를 되돌린다면 이것도
같이 되돌려야 한다.

### B-7. next/font 의 Geist 를 걷어냈다

`next/font` 는 클래스 선택자로 `--font-sans` 를 심는데, 클래스가 `:root` 보다
우선순위가 높아 브랜드 폰트를 덮어 버린다. 본문 폰트는 `globals.css` 의 `:root` 에서
Dropshot Sans 로 정의하고, `next/font` 는 mono 만 남겼다.

### B-8. 문서 언어 속성을 `ko` 로 바꿨다

`<html lang="en">` → `lang="ko"`. 본문이 한국어라 스크린 리더·검색 엔진에 맞다.

### B-9. 도달 불가 코드를 지웠다

`(view)/view/[style]/[name]/page.tsx` 의 `generateStaticParams` 가 `return []` 뒤에
원본 코드를 그대로 달고 있었다. 도달 불가 구간이라 타입 좁히기가 동작하지 않아
`tsc` 가 깨져 있었다. 죽은 코드와 쓰이지 않는 import 를 걷어냈다.

같은 모양이 `blocks/[...categories]`·`charts/[type]`·`preview/[base]/[name]` 에도
있는데 그쪽은 타입 오류가 나지 않아 손대지 않았다.

## C. 확인해 두면 좋은 것

- **커밋과 푸시는 승인받고 진행했다.** 문서 한국어화 8배치, RTL 언어 축소,
  드롭샷 토큰화, Foundation 섹션, 데모 한국어화 순으로 쪼개 커밋했다.
- **로컬 시각 확인을 하지 않았다.** dev 서버를 직접 띄우지 않는 것이 지침이라
  빌드·타입 검사·컴파일된 CSS 확인까지만 했다. 눈으로 보려면:

  ```bash
  cd /Users/jiro/dev/shadcn-ui && npx pnpm@10.33.4 --filter=v4 exec next start --port 4000
  ```

- **폰트 CDN 은 살아 있다.** 세 웨이트 모두 `HTTP 200`, 합계 약 735KB.
  Dropshot Sans 는 한글 상용 2,350자를 담고 있고, 이 문서가 쓰는 662자는 전부 커버된다.
- **차트 팔레트는 임시값이다.** `dropshot-shadcn-skin` 의 `history/docs/CHANGES-NEEDED.md`
  A-1 항목과 같은 문제다.
- **텍스트 버튼의 완전 pill(69px)** 은 변수로 안 된다. 버튼 소스를 고쳐야 한다.
