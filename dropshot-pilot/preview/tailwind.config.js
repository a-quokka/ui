/**
 * 드롭샷 Tailwind v3 설정 재현.
 *
 * `jiro-developers/dropshot` 의 `configs/tailwind` 와 `packages/design-system` 에서
 * 옮겨 적었다. 그 저장소는 읽기만 했다.
 *
 * 목적은 둘이다.
 *   1. 이식한 컴포넌트를 실제 드롭샷 토큰 값으로 화면에서 본다
 *   2. 쓰는 클래스가 드롭샷의 v3 설정에서 **진짜로 만들어지는지** 확인한다
 *      (없는 클래스는 CSS 가 안 나오므로 화면에서 티가 난다)
 */

// configs/tailwind/src/colors.ts
const COLORS = {
  primary: {
    900: "#20006C",
    800: "#300590",
    700: "#3E00B6",
    600: "#4D07D8",
    500: "#5A20F1",
    400: "#6633FF",
    300: "#7F5CFF",
    200: "#9B83FF",
    100: "#B5A4FF",
    75: "#D1C4FF",
    50: "#E5DBFC",
    25: "#F8F1FF",
  },
  grayscale: {
    950: "#0A0D0F",
    900: "#15191E",
    850: "#1F242A",
    800: "#2A2F36",
    700: "#393E46",
    600: "#5E656F",
    500: "#8E97A4",
    400: "#AAB1BC",
    300: "#CDD3DC",
    200: "#E5E8ED",
    100: "#F0F3F6",
    75: "#F4F7F9",
    50: "#F8FAFC",
  },
  secondary: {
    blue: {
      900: "#00254C", 800: "#003D80", 700: "#0055B3", 600: "#006EE6", 500: "#007AFF",
      400: "#1A87FF", 300: "#4DA2FF", 200: "#B3D7FF", 100: "#E5F2FF",
    },
    red: {
      900: "#3A070E", 800: "#700E1B", 700: "#9C1326", 600: "#C91831", 500: "#DF1B36",
      400: "#E62E48", 300: "#EB5D70", 200: "#F7B9C2", 100: "#FCE8EB",
    },
    green: {
      900: "#072817", 800: "#105C34", 700: "#178C4F", 600: "#1EB466", 500: "#21C871",
      400: "#29DC7F", 300: "#59E49B", 200: "#B8F3D4", 100: "#E7FBF1",
    },
    pink: {
      900: "#370421", 800: "#880A52", 700: "#BF0E73", 600: "#EE1A93", 500: "#F03EA0",
      400: "#F249AA", 300: "#F572BD", 200: "#FBC2E3", 100: "#FEEBF6",
    },
    orange: {
      900: "#321202", 800: "#7E2D04", 700: "#B03F06", 600: "#E35107", 500: "#F75C0D",
      400: "#F86C25", 300: "#F98D56", 200: "#FDCEB6", 100: "#FEEFE7",
    },
  },
  white: "#FFFFFF",
  black: "#000",
  alert: "#FF4163",
  info: "#68ADFF",
  transparent: "transparent",
  inherit: "inherit",
  current: "currentColor",
  emphasisHigh: "rgba(0, 0, 0, 0.87)",
  emphasisMedium: "rgba(0, 0, 0, 0.58)",
  emphasisLow: "rgba(0, 0, 0, 0.38)",
}

// configs/tailwind/src/typography.ts
const TYPOGRAPHY = {
  ".font-headline1": { fontSize: "46px", fontWeight: "700", lineHeight: "64px", letterSpacing: "-0.2px" },
  ".font-headline2": { fontSize: "42px", fontWeight: "700", lineHeight: "60px", letterSpacing: "-0.2px" },
  ".font-headline3": { fontSize: "34px", fontWeight: "700", lineHeight: "52px", letterSpacing: "-0.2px" },
  ".font-headline4": { fontSize: "28px", fontWeight: "700", lineHeight: "40px", letterSpacing: "-0.2px" },
  ".font-headline5": { fontSize: "24px", fontWeight: "700", lineHeight: "34px", letterSpacing: "-0.2px" },
  ".font-headline6": { fontSize: "20px", fontWeight: "700", lineHeight: "30px", letterSpacing: "-0.2px" },
  ".font-headline7": { fontSize: "18px", fontWeight: "700", lineHeight: "26px", letterSpacing: "-0.2px" },
  ".font-subtitle1": { fontSize: "16px", fontWeight: "700", lineHeight: "24px", letterSpacing: "-0.1px" },
  ".font-subtitle2": { fontSize: "14px", fontWeight: "700", lineHeight: "22px", letterSpacing: "-0.1px" },
  ".font-subtitle3": { fontSize: "16px", fontWeight: "500", lineHeight: "24px", letterSpacing: "-0.1px" },
  ".font-subtitle4": { fontSize: "14px", fontWeight: "500", lineHeight: "22px", letterSpacing: "-0.1px" },
  ".font-body1": { fontSize: "16px", fontWeight: "400", lineHeight: "26px", letterSpacing: "-0.2px" },
  ".font-body2": { fontSize: "15px", fontWeight: "400", lineHeight: "25px", letterSpacing: "-0.2px" },
  ".font-body3": { fontSize: "14px", fontWeight: "400", lineHeight: "24px", letterSpacing: "-0.2px" },
  ".font-button1": { fontSize: "18px", fontWeight: "500", lineHeight: "26px", letterSpacing: "0px" },
  ".font-button2": { fontSize: "16px", fontWeight: "500", lineHeight: "24px", letterSpacing: "0px" },
  ".font-button3": { fontSize: "14px", fontWeight: "500", lineHeight: "22px", letterSpacing: "0px" },
  ".font-button4": { fontSize: "12px", fontWeight: "500", lineHeight: "20px", letterSpacing: "0px" },
  ".font-caption1": { fontSize: "12px", fontWeight: "400", lineHeight: "20px", letterSpacing: "-0.1px" },
  ".font-caption2": { fontSize: "10px", fontWeight: "400", lineHeight: "18px", letterSpacing: "-0.1px" },
}

// configs/tailwind/src/borderRadius.ts — rounded-N = N × 4px
const BORDER_RADIUS = {
  1: "0.25rem", 2: "0.5rem", 3: "0.75rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem",
  full: "9999px",
  none: "0px",
}

// configs/tailwind/src/screens.ts — max 기준(데스크톱 우선)이다. min 이 아니다.
const SCREENS = {
  xxl: { max: "1919px" },
  xl: { max: "1599px" },
  lg: { max: "1439px" },
  md: { max: "1279px" },
  sm: { max: "1023px" },
  xs: { max: "767px" },
}

// configs/tailwind/src/zIndex.ts
const Z_INDEX = {
  toast: "200", modalBelow: "149", modal: "150", modalAbove: "151",
  gnbBelow: "99", gnb: "100", gnbAbove: "101",
  floating: "10", filter: "20", dropdown: "10",
  tooltip: "10", general: "1", back: "-1",
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    colors: COLORS,
    borderRadius: BORDER_RADIUS,
    screens: SCREENS,
    extend: {
      /**
       * ! `fine` 은 configs/tailwind 에도 packages/design-system 에도 **없다.**
       *   apps/{aiStudio,canvas,stock}/web/tailwind.config.ts 세 곳에만 정의돼 있다.
       *   그런데 design-system 의 Button(ghost)이 `fine:hover:` 를 쓴다 — 그래서
       *   Storybook 과 나머지 앱에서는 그 hover 가 아예 만들어지지 않는다.
       *   이 화면에서는 의도한 모양을 보여 주려고 정의를 넣었다.
       */
      screens: { fine: { raw: "(hover: hover) and (pointer: fine)" } },
      zIndex: Z_INDEX,
      // packages/design-system/tailwind.config.ts
      boxShadow: {
        darkShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.40)",
        dropBox: "2px 6px 12px 0px rgba(0, 0, 0, 0.12), 0px 0px 4px 0px rgba(0, 0, 0, 0.12)",
      },
      fontWeight: { 500: "500", 600: "600", 700: "700" },
      animation: {
        growIn: "growIn 225ms cubic-bezier(0.4, 0, 0.2, 1)",
        skeleton: "skeleton 1.5s ease-in infinite",
      },
      keyframes: {
        growIn: {
          "0%": { transform: "scale(0.75)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        skeleton: {
          "0%": { transform: "translateX(10%)", opacity: "0" },
          "20%": { opacity: "0.25" },
          "50%": { opacity: "1" },
          "80%": { opacity: "0.5" },
          "100%": { transform: "translateX(110%)", opacity: "0" },
        },
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents(TYPOGRAPHY)
    },
  ],
}
