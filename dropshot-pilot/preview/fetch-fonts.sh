#!/bin/sh
# Dropshot Sans 를 사내 CDN 에서 받아 data URI 로 만든다.
# 아티팩트는 외부 CDN 요청을 막으므로 글꼴을 페이지 안에 심어야 한다.
set -e
cd "$(dirname "$0")"
mkdir -p fonts
for w in Regular Medium Bold; do
  curl -fsS -o "fonts/Dropshot_Sans-$w.woff2" \
    "https://cdn.dropshot.io/public/fonts/Dropshot_Sans-$w.woff2"
  echo "  받음  $w"
done
python3 - <<'PY'
import base64
out=[]
for name, weight in [("Regular",400),("Medium",500),("Bold",700)]:
    b=open(f"fonts/Dropshot_Sans-{name}.woff2","rb").read()
    out.append("@font-face{font-family:'Dropshot Sans';"
               f"src:url(data:font/woff2;base64,{base64.b64encode(b).decode()}) format('woff2');"
               f"font-weight:{weight};font-style:normal;font-display:swap}}")
open("fonts.css","w",encoding="utf-8").write("".join(out))
print(f"  fonts.css {len(''.join(out))/1024:.0f}KB")
PY
