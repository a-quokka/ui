/**
 * 컴파일한 CSS 와 글꼴을 페이지 안에 넣어 자체 완결 파일 두 개를 만든다.
 *
 *   ../../node_modules/.bin/tsx ./inline.mts
 *
 * `standalone.html`  브라우저로 열어 실제 치수를 재는 용도. 온전한 문서다.
 * `artifact.html`    게시용. 아티팩트가 문서 뼈대를 직접 감싸므로 본문만 담는다.
 *
 * 글꼴은 사내 CDN 에서 받아 `fonts.css` 에 data URI 로 담아 둔 것을 쓴다.
 * 없으면 글꼴만 빼고 만든다 (치수에는 영향이 없다 — 행간을 램프가 직접 지정한다).
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const read = (f: string) => fs.readFileSync(path.join(HERE, f), "utf8")

const html = read("index.html")
const css = read("out.css")
const fontsPath = path.join(HERE, "fonts.css")
const fonts = fs.existsSync(fontsPath) ? read("fonts.css") : ""

if (!fonts) {
  console.warn("fonts.css 가 없다. 글꼴 없이 만든다. ./fetch-fonts.sh 를 먼저 돌려라.")
}

const head = html.split("<head>")[1].split("</head>")[0]
const title = head.split("<title>")[1].split("</title>")[0]
const chrome = head.split("<style>")[1].split("</style>")[0]
const BODY_OPEN = '<body class="font-body3 text-white antialiased">'
const body = html.split(BODY_OPEN)[1].split("</body>")[0]

const styles = `<style>${fonts}</style>\n<style>${css}</style>\n<style>${chrome}</style>`

fs.writeFileSync(
  path.join(HERE, "standalone.html"),
  `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
${styles}
</head>
${BODY_OPEN}${body}</body>
</html>
`
)

fs.writeFileSync(
  path.join(HERE, "artifact.html"),
  `<title>${title}</title>
${styles}
<div class="font-body3 text-white antialiased">${body}</div>
`
)

const mb = (f: string) => (fs.statSync(path.join(HERE, f)).size / 1024 / 1024).toFixed(2)
console.log(`standalone.html ${mb("standalone.html")}MB — 브라우저로 열어 치수를 잰다`)
console.log(`artifact.html   ${mb("artifact.html")}MB — 게시용`)
