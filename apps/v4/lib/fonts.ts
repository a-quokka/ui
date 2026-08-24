import { Geist_Mono as FontMono } from "next/font/google"

// --font-sans / --font-heading 은 globals.css 의 :root 에서 Dropshot Sans 로 정의한다.
// next/font 로 로드하면 클래스 선택자가 :root 를 이겨 브랜드 폰트가 덮인다.
const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
})

export const fontVariables = fontMono.variable
