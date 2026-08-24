"use client"

import * as React from "react"
import Link from "next/link"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/styles/base-nova/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "중요한 내용으로 사용자를 멈춰 세우고 응답을 받는 모달 다이얼로그입니다.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "링크 뒤의 내용을 미리 보여 줍니다.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "작업이 얼마나 진행됐는지 보여 줍니다. 보통 막대 형태입니다.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "내용을 시각적으로, 또 의미상으로 나눕니다.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "탭 패널이라 부르는 여러 겹의 구획을 한 번에 하나씩 보여 줍니다.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "요소에 키보드 포커스가 가거나 마우스를 올리면 관련 정보를 띄웁니다.",
  },
]

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>시작하기</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/docs" title="소개">
                Tailwind CSS 로 만든 재사용 가능한 컴포넌트입니다.
              </ListItem>
              <ListItem href="/docs/installation" title="설치">
                의존성을 설치하고 앱 구조를 잡는 방법입니다.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                제목·문단·목록 등의 스타일입니다.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>컴포넌트</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>아이콘 함께 쓰기</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px]">
              <li>
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2" />
                  }
                >
                  <CircleAlertIcon />
                  백로그
                </NavigationMenuLink>
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2" />
                  }
                >
                  <CircleDashedIcon />할 일
                </NavigationMenuLink>
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2" />
                  }
                >
                  <CircleCheckIcon />
                  완료
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/docs" />}
            className={navigationMenuTriggerStyle()}
          >
            문서
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<Link href={href} />}>
        <div className="flex flex-col gap-1 text-sm">
          <div className="leading-none font-medium">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div>
      </NavigationMenuLink>
    </li>
  )
}
