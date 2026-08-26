드롭샷 디자인 시스템 이식 결과 미리보기.

이 폴더의 HTML 은 dropshot-pilot/preview 의 스크립트가 만든 산출물이다.
손으로 고치지 마라 — 다시 만들면 지워진다.

  cd dropshot-pilot/preview
  ../../node_modules/.bin/tsx ./gallery.mts
  ../../node_modules/.bin/tailwindcss -c ./tailwind.config.js -i ./input.css -o ./gallery.css --minify
  (vercel 변환은 preview/README.md 참고)

주소
  /design-system/          변환 결과 갤러리
  /design-system/button    InlineButton 과 드롭샷 Button 대조
