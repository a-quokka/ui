# 확인 필요 목록

> 브랜치 `trim/menu-sections-components`.
> 프리뷰: https://shadcn-ui-fork-git-trim-menu-sections-20e2c9-a-quokkas-projects.vercel.app

## A. 결정이 필요한 것

### A-1. 프로덕션 URL 을 쓸 것인가

Vercel 프로덕션은 `main` 에 붙어 있고, `main` 은 upstream 머지를 쉽게 하려고 원본 커밋
`ac60ef5` 그대로 두고 있다. **프리뷰는 지금 정상 배포된다.** 프로덕션까지 올리려면
셋 중 하나를 골라야 한다.

1. **프리뷰만 쓴다** — `main` 은 그대로. 지금 상태가 이것이다.
2. `trim/menu-sections-components` 를 `main` 에 머지한다 — 프로덕션 URL 이 생기지만
   upstream 머지가 그만큼 번거로워진다.
3. **Vercel 프로젝트의 프로덕션 브랜치를 `trim/...` 으로 바꾼다** — `main` 을 깨끗이
   두면서 프로덕션 URL 도 얻는다. 제일 나아 보이지만 프로젝트 설정 변경이라
   승인 없이 하지 않았다.

### A-2. aria·radix 를 되살릴 일이 있는가

"base 만 담자" 는 지시대로 React Aria 와 Radix UI 두 벌을 통째로 지웠다.
문서·예제·스타일·레지스트리 항목이 전부 사라졌으므로 되살리려면 upstream 에서
다시 가져와야 한다. 되살릴 계획이 있다면 지금 말해 달라.

지운 근거는 두 가지다. 첫째, 지시. 둘째, 이게 없으면 Vercel 빌드가 메모리 초과로
죽었다(아래 B-1).

## B. 처리가 끝난 것

### B-1. Vercel 빌드 메모리 초과 — 해결

원본 `main` 을 포함해 배포 4건 중 3건이 실패하고 있었다. 컴파일 단계 최대 상주
메모리가 8.5GB 인데 빌드 컨테이너가 **2코어 · 8GB** 다.

| 시점 | 최대 상주 메모리 | 페이지 | 컴파일 |
|---|---|---|---|
| 손대기 전 | 8.5 GB | 341 | 25초 |
| 지금 | **4.2 GB** | 133 | 12초 |

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

**Vercel 프로젝트에 이 변수를 직접 설정해 두면 더 낫다.** 지금은 프리뷰마다
배포 URL 이 달라지므로 og 이미지 주소 같은 절대 경로가 배포마다 바뀐다.

### B-3. 한국어화 — 완료

- 컴포넌트 문서 64개 본문 전체 (유닛 1,118개)
- 예제 513개 중 442개에 한국어가 들어갔다. 나머지는 문구가 없는 배치 전용 예제다
- RTL 예제 57개에 한국어 문안 추가, 아랍어·히브리어 삭제
- 언어 선택기는 English · 한국어 둘

### B-4. upstream 히스토리·레거시 페이지 정리 — 완료

지운 라우트로 가는 죽은 링크가 문서에 남아 있어 함께 정리했다. changelog 57개와
rss.xml, 홈 화면의 Announcement 배너, Typeset·Directory 문서, `/colors` 페이지를
지웠다. 남은 문서의 `/create`·`/blocks` 링크는 문장은 두고 링크만 걷어냈다.

페이지 194 → 133.

### B-5. 드롭샷 토큰화 — 완료

`.dark` 는 TOKEN-MAP 원본 값, 반경은 `rounded-N = N×4px`, 폰트는 Dropshot Sans
세 웨이트를 CDN 에서 받는다. Foundation 섹션에 Colors·Typography 두 페이지를 새로 넣었다.

## C. 내가 정하고 진행한 것 — 뒤집고 싶으면 말해 달라

| | 내용 |
|---|---|
| C-1 | 문서 한국어화를 8배치로 쪼개 커밋. 배치 단위로 되돌릴 수 있다 |
| C-2 | 조사 앞 공백을 붙여 씀. `` `Button` 을 `` 가 아니라 `` `Button`을 `` |
| C-3 | **라이트 팔레트를 파생해서 만듦.** 드롭샷에 공식 값이 없어 같은 램프를 뒤집었다. 확정값이 아니다. 기본 테마는 `dark` |
| C-4 | 타이포 램프 20개는 `@utility` 로만 노출. 컴포넌트 41곳 클래스 교체는 하지 않음 |
| C-5 | 반경 배수 계산을 걷어내고 실제 값을 직접 박음 |
| C-6 | next/font 의 Geist 제거. 클래스 선택자가 `:root` 를 이겨 브랜드 폰트를 덮음 |
| C-7 | `<html lang="ko">` |
| C-8 | 도달 불가 코드 삭제. `return []` 뒤에 원본 코드가 남아 `tsc` 가 깨져 있었다 |
| C-9 | 홈 화면의 "Build Your Own" 버튼이 지워진 `/create` 로 가고 있어 `/docs/components` 로 돌렸다 |
| C-10 | registry 블록이 쓰는 `useDesignSystemSearchParams` 는 편집기가 없어 쿼리만 읽는 최소 구현으로 대체 |
| C-11 | 타이포그래피 예제의 Lorem ipsum 을 한글 자리 채움 문장으로 교체 |

## D. 남은 것

- **Calendar 데모가 아직 영어 달력이다.** `react-day-picker` 에 `locale` 을 넘기지
  않아 월·요일 이름이 영어로 나온다. `date-fns/locale/ko` 를 넘기면 된다
- **텍스트 버튼의 완전 pill(69px)** 은 변수로 안 된다. 버튼 소스를 고쳐야 한다
- **차트 팔레트는 임시값이다.** 드롭샷에 차트 색이 없어 secondary 400 단계를
  색상환 순서로 임의 배정했다
- **`## RTL` 섹션은 이제 LTR 로 렌더된다.** English·한국어 둘 다 `ltr` 이라
  방향 시연이 되지 않는다. 지시대로 en/ko 만 남긴 결과다
- 로컬 시각 확인은 지침대로 dev 서버를 띄우지 않아 배포된 프리뷰로만 했다
