export const siteConfig = {
  name: "shadcn/ui",
  url: "https://ui.shadcn.com",
  ogImage: "https://ui.shadcn.com/og.jpg",
  description:
    "직접 고치고, 넓히고, 그 위에 쌓아 올릴 수 있는 잘 다듬어진 컴포넌트 모음입니다. 여기서 시작해 여러분의 것으로 만드세요. 열린 소스, 열린 코드.",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn-ui/ui",
  },
  // 범위: menu / sections / components 세 갈래만 쓴다.
  // Blocks·Charts·Directory·Typeset·Create 는 이 포크에서 뺐다.
  navItems: [
    {
      href: "/",
      label: "홈",
    },
    {
      href: "/docs/installation",
      label: "문서",
    },
    {
      href: "/docs/components",
      label: "컴포넌트",
    },
  ],
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#15191e",
}
