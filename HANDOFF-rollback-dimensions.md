# 핸드오프 — 치수 토큰 롤백

작성 2026-08-25. 새 세션에서 이 문서만 읽고 시작할 수 있게 썼다.

## 지시

**색과 폰트만 남기고, 패딩·반경·간격·px 단위는 shadcn 원본으로 되돌린다.**

## 실측 결과 — 되돌릴 것이 생각보다 적다

문서를 쓰기 전에 upstream(`ac60ef5`)과 전부 대조했다. **패딩·간격은 한 곳도
바뀌지 않았다.** 이 포크가 건드린 치수는 두 가지뿐이다.

스타일 8벌 전체의 치수 유틸리티 순증감:

```
  +8  rounded-[69px]        ← 버튼 pill. 되돌릴 것
  +6  rounded-lg            ← 위 변경에 딸린 것
  -1  rounded-[min(var(--radius-md),12px)]
  -1  rounded-[min(var(--radius-md),10px)]

  -8  leading-snug          ← 타이포 램프가 흡수. 폰트다, 남긴다
  -8  tracking-widest       ← 같음
  -6  leading-none          ← 같음
```

`p-*`·`px-*`·`py-*`·`gap-*`·`size-*`·`h-*`·`w-*` 는 **증감 0** 이다.

그래서 실제 작업은 아래 둘이다.

### 1. 반경 스케일 · `apps/v4/app/globals.css`

커밋 `d844b01` 에서 바뀌었다. 현재 112~118행과 198행.

| 변수           | 현재   | 원본                        |
| -------------- | ------ | --------------------------- |
| `--radius-sm`  | `4px`  | `calc(var(--radius) * 0.6)` |
| `--radius-md`  | `8px`  | `calc(var(--radius) * 0.8)` |
| `--radius-lg`  | `8px`  | `var(--radius)`             |
| `--radius-xl`  | `12px` | `calc(var(--radius) * 1.4)` |
| `--radius-2xl` | `16px` | `calc(var(--radius) * 1.8)` |
| `--radius-3xl` | `20px` | `calc(var(--radius) * 2.2)` |
| `--radius-4xl` | `24px` | `calc(var(--radius) * 2.6)` |
| `--radius`     | `8px`  | `0.625rem`                  |

```bash
git show ac60ef5:apps/v4/app/globals.css | grep -nE '^\s*--radius'
```

### 2. 버튼 pill · `apps/v4/registry/styles/style-{nova,rhea}.css`

커밋 `ad54acf` 에서 들어갔다. **nova 와 rhea 두 벌에만 있다** (각 4곳).
나머지 여섯 벌은 원본 그대로다.

```bash
grep -rn 'rounded-\[69px\]' apps/v4/registry/styles/
```

원본은 크기별로 값이 달랐다.

```
.cn-button-size-xs       rounded-[min(var(--radius-md),10px)]
.cn-button-size-sm       rounded-[min(var(--radius-md),12px)]
.cn-button-size-default  rounded-lg
.cn-button-size-lg       rounded-lg
```

정확한 원본 줄은 이렇게 꺼낸다.

```bash
git show ac60ef5:apps/v4/registry/styles/style-nova.css | grep -A 2 'cn-button-size-'
```

`in-data-[slot=button-group]:rounded-lg` 와 아이콘 버튼은 원본과 같으니 손대지
않는다.

### 3. 패딩·간격·px

**할 일이 없다.** 위 실측대로 증감이 0이다. 그래도 직접 확인하고 사용자에게
보고하라.

```bash
cd /Users/jiro/dev/shadcn-ui
python3 - <<'PY'
import subprocess, re, collections
def counts(t):
    c = collections.Counter()
    for m in re.finditer(r'(?<![\w-])(rounded|gap|px|py|pt|pb|pl|pr|p|m|size|h|w|leading|tracking|space)-\[?[a-z0-9.%/()var,-]+\]?', t):
        c[m.group(0)] += 1
    return c
total = collections.Counter()
for f in ["nova","rhea","vega","luma","sera","maia","mira","lyra"]:
    p = f"apps/v4/registry/styles/style-{f}.css"
    old = subprocess.run(["git","show",f"ac60ef5:{p}"], capture_output=True, text=True).stdout
    if not old: continue
    a, b = counts(old), counts(open(p, encoding="utf-8").read())
    for k in set(a)|set(b):
        if a[k] != b[k]: total[k] += b[k]-a[k]
for k, d in sorted(total.items(), key=lambda x: -abs(x[1])): print(f"  {d:+4}  {k}")
PY
```

## 판단이 필요한 것 — 임의로 정하지 말 것

직전 세션에서 넣은 것들이다. 색도 폰트도 아니지만 패딩·반경·간격도 아니다.
**사용자에게 물어 범위를 확정한 뒤 진행하라.**

| 항목     | 커밋      | 내용                                                      |
| -------- | --------- | --------------------------------------------------------- |
| 그림자   | `5d05fbd` | `shadow-dark` / `shadow-drop-box` 두 종. 작은 그림자 제거 |
| z-index  | `346a596` | toast 200 · modal 150 · 떠 있는 면 151 · gnb 100          |
| 모션     | `74c22c5` | `duration-225 ease-dropshot`, 스켈레톤                    |
| 스크롤바 | `346a596` | `.scroll-style` 유틸리티. 아직 아무 데도 안 붙였다        |

각각 `git revert <sha>` 로 되돌릴 수 있게 단계별로 커밋해 두었다.

**남길 것 (색이다):**

| 항목                                                                                        | 커밋      |
| ------------------------------------------------------------------------------------------- | --------- |
| 상호작용 상태 — `--primary-hover/active`, `--secondary-hover`, `--destructive-hover/active` | `b1198b9` |
| 시맨틱 스케일 — 진행률 blue-400, 오류 red-900/300, 성공 green-300, 경고 orange-300          | `3569e55` |

## 함께 처리해야 할 미해결 건

**위험 버튼의 흰 글자 대비가 AA 미달이다.** 직전 세션에서 틴트형(어두운 배경 +
빨간 글자)에서 채운 빨강 + 흰 글자로 바꾸며 생긴 회귀다.

|                             | 대비 | AA 4.5 |
| --------------------------- | ---- | ------ |
| red-400 `#E62E48` + 흰 글자 | 4.33 | 미달   |
| hover `#EA4855`             | 3.78 | 미달   |
| active `#ED5F6B`            | 3.26 | 미달   |

권하는 해결책은 **버튼 기본을 red-500 `#DF1B36` 로 한 단계 내리는 것**이다.
4.83 으로 AA 를 넘고, 라이트 모드가 이미 red-500 이라 일관성도 맞는다.
`apps/v4/app/globals.css` 다크 블록의 `--destructive` 와
`--destructive-hover` / `--destructive-active` 를 조정한다.

사용자 확인을 받고 진행하라.

## 저장소

```
/Users/jiro/dev/shadcn-ui        브랜치 main (프로덕션에 연결)
프로덕션  https://shadcn-ui-fork.vercel.app
upstream 기준 커밋  ac60ef5
```

`main` 에 푸시하면 프로덕션이 배포된다. **git 쓰기는 매번 사용자 승인을 받는다.**
커밋 메시지에 `Co-Authored-By` 류 트레일러를 넣지 않는다.

## 이 저장소에서 반드시 알아야 할 것

### 생성물을 손으로 맞춰야 한다

`apps/v4/styles/*` 는 `registry/styles/style-*.css` 의 `@apply` 를
`scripts/build-registry.mts` 가 컴포넌트 클래스 문자열로 인라인한 **생성물**이다.
`.gitignore` 에 있지만 로컬에 존재하고 dev·build 가 이걸 쓴다.

**이 머신에 `bun` 이 없어 `registry:build` 를 돌릴 수 없다.** 원본을 고치면
생성물도 손수 맞춰야 한다. Vercel 빌드에서는 정상적으로 재생성된다.

```
apps/v4/registry/styles/style-*.css      원본 8벌
apps/v4/styles/*/ui/*.tsx                생성물
apps/v4/styles/*/ui-rtl/*.tsx            생성물 (base-nova·radix-nova 만)
apps/v4/registry/new-york-v4/ui/*.tsx    legacy 레지스트리. 따로 있다
```

**생성물은 prettier 가 클래스 순서를 정렬해 둬서 원본과 문자열이 다르다.**
정확한 문자열 치환이 원본에서는 먹고 생성물에서는 안 먹는 일이 흔하다. 생성물은
정규식으로 따로 처리하고 반드시 결과를 확인하라.

### 일괄 치환의 함정

**`examples/base/*-rtl.tsx` 의 `translations.en` 블록은 영어가 정답이다.**
파일 전체에 문자열 치환을 돌리면 여기까지 덮인다. 직전 세션에서 두 번 당했다.

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

직전 세션에서 잡은 문제 중 빌드·타입 검사에 걸린 것은 하나도 없었다.
리다이렉트로 인한 404, JSX 죽은 링크, 치환 누락, 접근성 대비 미달 전부
컴파일은 통과한다.

```bash
cd /Users/jiro/dev/shadcn-ui/apps/v4
npx next build                        # 132 페이지가 나와야 한다
npx tsc --noEmit -p tsconfig.json
```

그 뒤 **렌더된 HTML** 을 본다.

```bash
grep -rhoE 'rounded-\[69px\]' .next/server/app/docs/ | wc -l    # 롤백 후 0
grep -rhoE 'rounded-(sm|md|lg|xl)' .next/server/app/docs/ | sort | uniq -c
```

배포 확인은 프로덕션을 크롤해서 모든 문서 페이지가 200 인지, 죽은 내부 링크가
없는지 본다.

### dev 서버를 띄우지 마라

사용자 지침이다. 확인은 배포된 프리뷰나 프로덕션으로 한다. 필요하면 명령만
안내한다. 직전 세션에서 한 번 어겼다.

```bash
cd /Users/jiro/dev/shadcn-ui/apps/v4 && npx next dev --port 4000
```

### 브라우저 패널이 불안정하다

`mcp__Claude_Browser__navigate` 가 다른 페이지를 잡거나 스크린샷이 검게 나오는
일이 잦았다. `curl` + `grep` 이나 렌더된 HTML 파싱이 더 믿을 만하다.

## 맥락

`NOTES-DECISIONS.md` 가 결정 로그다. A 절이 정해진 것, B 절이 처리 완료다.
치수 롤백을 하면 A-7(그림자)·A-9(모션)·A-10(z-index)의 상태가 바뀔 수 있으니
결정 로그도 함께 갱신하라.

직전 세션에서 Dropshot 디자인 시스템을 5단계로 반영했다.

| 단계 | 커밋      | 내용                          | 롤백 대상?    |
| ---- | --------- | ----------------------------- | ------------- |
| 1    | `b1198b9` | 상호작용 상태를 스케일 단계로 | 아니오 (색)   |
| 2    | `5d05fbd` | 그림자 두 종                  | **판단 필요** |
| 3    | `3569e55` | Secondary 스케일을 시맨틱에   | 아니오 (색)   |
| 4    | `74c22c5` | 모션                          | **판단 필요** |
| 5    | `346a596` | z-index·스크롤바              | **판단 필요** |

그 앞 세션들에서 한국어화(문서 전 구역·예제 513개·사이트 크롬)와 Dropshot
토큰화(색·반경·타이포 램프·Dropshot Sans), 제품 이름 변경, Foundation·Brand
섹션 추가를 했다.

## 시작할 때 할 일

1. 이 문서와 `NOTES-DECISIONS.md` 를 읽는다
2. 위 실측 스크립트를 돌려 치수 변경 범위를 직접 확인한다
3. **판단이 필요한 것** 을 사용자에게 물어 범위를 확정한다
4. 반경 → 버튼 pill 순으로 되돌리고 단계별로 커밋한다
5. 위험 버튼 대비 건을 함께 처리할지 확인한다
6. 빌드·타입 검사 후 렌더된 HTML 로 확인하고, 승인받아 푸시한다
