# 미리보기

이식한 컴포넌트를 **실제 드롭샷 토큰 값으로** 화면에서 보는 도구다.
드롭샷 Tailwind v3 설정을 재현해 정적 페이지를 만든다. dev 서버를 띄우지 않는다.

## 만드는 법

```bash
cd dropshot-pilot/preview
./fetch-fonts.sh                                   # Dropshot Sans 세 웨이트 (한 번만)
../../node_modules/.bin/tsx ./build.mts            # index.html
../../node_modules/.bin/tailwindcss -c ./tailwind.config.js -i ./input.css -o ./out.css --minify
../../node_modules/.bin/tsx ./inline.mts           # standalone.html · artifact.html
```

`standalone.html` 은 브라우저로 열어 치수를 재는 용도, `artifact.html` 은 게시용이다.

## 왜 이렇게 하나

화면을 보는 것 말고 **검증 효과**가 크다. 드롭샷 v3 설정에 없는 클래스는 CSS 가
만들어지지 않으므로, 이 화면에서 그대로 티가 난다. 실제로 이 방식으로 잡은 것들이다.

- 클래스 문자열 안의 큰따옴표가 렌더된 `class="…"` 를 끊어 뒤 클래스를 통째로 날린 것
- `cn()` 을 빼먹어 `text-white` 와 `text-grayscale-900` 이 함께 남은 것
- 드롭샷 `Button`(ghost)의 hover 가 `fine:` 에 걸려 있는데 그 화면 정의가
  `packages/design-system` 에 없어 Storybook 에서 죽는 것

## 담긴 것

| | |
| --- | --- |
| `tailwind.config.js` | 드롭샷 v3 설정 재현. 색·타이포·반경·화면·z-index·그림자·모션 |
| `build.mts` | 실제 컴포넌트에서 클래스를 뽑아 비교 화면을 만든다 |
| `inline.mts` | CSS 와 글꼴을 페이지 안에 넣어 자체 완결 파일로 만든다 |
| `fetch-fonts.sh` | 사내 CDN 에서 Dropshot Sans 를 받아 data URI 로 만든다 |

산출물(`index.html`·`out.css`·`fonts/`·`artifact.html` 등)은 gitignore 한다.
