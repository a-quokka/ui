# 핸드오프 — 색·UI 롤백 완료

갱신 2026-08-25. 이 문서가 처음 설명하던 "치수 토큰 롤백" 은 그보다 넓은
**색·UI 전면 롤백**에 흡수돼 끝났다. 무엇을 되돌렸고 무엇이 남았는지는
`NOTES-DECISIONS.md` **0절**이 원본이다. 여기에는 저장소를 다룰 때 필요한
것만 남긴다.

## 지금 상태

`main` 이 upstream `ac60ef5` 의 색·치수·그림자·모션·z-index 를 그대로 쓴다.
포크가 얹고 있는 것은 넷뿐이다.

| 남은 것 | 어디 |
| --- | --- |
| 한국어 번역 전부 | 문서·예제·사이트 크롬·접근성 문자열 |
| Dropshot Sans 세 웨이트 | `apps/v4/app/globals.css` 의 `@font-face` 와 `:root` |
| 제품 이름 Dropshot UI | 탭 제목·문서 산문·레지스트리 이름 |
| 기본 테마 `dark` | `apps/v4/components/theme-provider.tsx` |

여기에 배포가 돌아가게 만든 인프라 수정이 더해진다 (`NOTES-DECISIONS.md`
B-1·B-2·B-4·B-7). **이건 되돌리면 배포가 깨진다.**

```
/Users/jiro/dev/shadcn-ui        브랜치 main (프로덕션에 연결)
프로덕션  https://shadcn-ui-fork.vercel.app
upstream 기준 커밋  ac60ef5
페이지 128
```

## 이 저장소에서 반드시 알아야 할 것

### 생성물은 `tsx` 로 재생성한다

`apps/v4/styles/*` 는 `registry/styles/style-*.css` 의 `@apply` 를
`scripts/build-registry.mts` 가 컴포넌트 클래스 문자열로 인라인한 **생성물**이다.
`.gitignore` 에 있지만 로컬에 존재하고 dev·build 가 이걸 쓴다.

`package.json` 에 `bun run` 으로 적혀 있고 이 머신에 `bun` 이 없어서, 이전
세션들은 "생성물을 손으로 맞춰야 한다" 고 적어 두었다. **틀린 말이었다.**
루트의 `tsx` 로 그대로 돈다 (15초).

```bash
cd /Users/jiro/dev/shadcn-ui/apps/v4
../../node_modules/.bin/tsx ./scripts/build-registry.mts --style all
```

```
apps/v4/registry/styles/style-*.css      원본 8벌
apps/v4/styles/*/ui/*.tsx                생성물
apps/v4/styles/*/ui-rtl/*.tsx            생성물 (base-nova 만)
apps/v4/registry/new-york-v4/ui/*.tsx    legacy 레지스트리. 생성물이 아니라 따로 고친다
```

### 일괄 치환의 함정

**`examples/base/*-rtl.tsx` 의 `translations.en` 블록은 영어가 정답이다.**
파일 전체에 문자열 치환을 돌리면 여기까지 덮인다. 전에 두 번 당했다.

```bash
python3 - <<'PY'
import glob, re
EN = re.compile(r"\n  en:\s*\{\n(.*?)\n  \},", re.S)
bad = [p.split("/")[-1] for p in glob.glob("apps/v4/examples/base/*-rtl.tsx")
       if (m := EN.search(open(p, encoding="utf-8").read())) and re.search(r"[가-힣]", m.group(1))]
print("en 에 한글이 섞인 파일:", bad or "없음")
PY
```

정규식으로 문자열 리터럴을 잡을 때 길이 최소값을 두지 마라.
``(["`])([^"`]{6,})\1`` 는 6자 미만 문자열에서 따옴표 짝이 어긋나 그 뒤 전체가
밀린다. `"((?:[^"\\\n]|\\.)*)"` 를 쓴다.

### 검증은 빌드 통과로 부족하다

리다이렉트로 인한 404, JSX 죽은 링크, 치환 누락, 접근성 대비 미달은 전부
컴파일을 통과한다. 빌드 뒤 **렌더된 HTML** 을 본다.

```bash
cd /Users/jiro/dev/shadcn-ui/apps/v4
npx tsc --noEmit -p tsconfig.json
npx next build                                  # 128페이지가 나와야 한다
find .next/server/app -name '*.html' | wc -l
```

색·UI 가 다시 새어 들어왔는지 보는 검사다. 전부 0 이어야 한다.

```bash
grep -rhoE 'rounded-\[69px\]|shadow-dark|shadow-drop-box|duration-225|ease-dropshot|animate-skeleton|z-1[0-9][0-9]|z-200|font-body[0-9]|font-caption[0-9]' .next/server/app/ | wc -l
find .next -name '*.css' -path '*static*' -exec grep -hoiE '#(15191e|1f242a|e62e48|6633ff|1a87ff|29dc7f|f249aa|f86c25|df1b36)' {} \; | wc -l
```

배포 확인은 프로덕션을 크롤해서 모든 문서 페이지가 200 인지, 죽은 내부 링크가
없는지 본다.

### 배포 뒤에는 배포된 CSS 의 `:root` 까지 봐야 한다

**Vercel 빌드 캐시가 `globals.css` 의 통과 CSS 를 재사용한 적이 있다.** 색·UI
롤백 배포에서 실제로 겪었다. 빌드 로그에 `Restored build cache from previous
deployment` 가 찍히면 Turbopack 이 `:root` 변수 블록과 `@keyframes` 를 캐시에서
그대로 가져오고, Tailwind 가 만드는 **유틸리티만** 새로 생성한다. 그래서 한
CSS 안에 신구가 섞인다.

이때 페이지 목록·HTML·유틸리티는 전부 새것이라 **렌더된 HTML 검사는 통과한다.**
색과 반경만 예전 값으로 나온다. HTML 만 보면 절대 못 잡는다.

```bash
B=https://shadcn-ui-fork.vercel.app
curl -s $B/docs/components/base/button > p.html
for c in $(grep -oE '/_next/static/immutable/chunks/[^"]*\.css' p.html | sort -u); do
  curl -s "$B$c"; done > prod.css
grep -c -- '--radius:8px' prod.css        # 0 이어야 한다 (구 드롭샷 반경)
grep -c 'translate(110%)' prod.css        # 0 이어야 한다 (구 스켈레톤 keyframe)
grep -c -- '--radius:\.625rem' prod.css   # 1 이상이어야 한다 (upstream 반경)
```

걸렸다면 소스를 고칠 게 아니라 **빌드 캐시 없이 재배포**한다. Vercel →
Deployments → 해당 배포의 ⋯ → Redeploy → **Use existing Build Cache 체크 해제**.
MCP 도구로는 캐시를 끌 수 없으니 사용자에게 부탁해야 한다.

### dev 서버를 띄우지 마라

사용자 지침이다. 확인은 배포된 프리뷰나 프로덕션으로 한다. 필요하면 명령만
안내한다.

```bash
cd /Users/jiro/dev/shadcn-ui/apps/v4 && npx next dev --port 4000
```

### 브라우저 패널이 불안정하다

`mcp__Claude_Browser__navigate` 가 다른 페이지를 잡거나 스크린샷이 검게 나오는
일이 잦았다. `curl` + `grep` 이나 렌더된 HTML 파싱이 더 믿을 만하다.

### git 쓰기는 매번 승인을 받는다

커밋·푸시·PR 전부 사용자 승인이 먼저다. 커밋 메시지에 `Co-Authored-By` 류
트레일러를 넣지 않는다.
