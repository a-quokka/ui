"use client"

import { ChevronRightIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/styles/base-nova/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/styles/base-nova/ui/sidebar"

const items = [
  {
    title: "시작하기",
    url: "#",
    items: [
      {
        title: "설치",
        url: "#",
      },
      {
        title: "프로젝트 구조",
        url: "#",
      },
    ],
  },
  {
    title: "애플리케이션 만들기",
    url: "#",
    items: [
      {
        title: "라우팅",
        url: "#",
      },
      {
        title: "데이터 가져오기",
        url: "#",
        isActive: true,
      },
      {
        title: "렌더링",
        url: "#",
      },
      {
        title: "캐싱",
        url: "#",
      },
      {
        title: "스타일",
        url: "#",
      },
      {
        title: "최적화",
        url: "#",
      },
      {
        title: "설정",
        url: "#",
      },
      {
        title: "테스트",
        url: "#",
      },
      {
        title: "인증",
        url: "#",
      },
      {
        title: "배포",
        url: "#",
      },
      {
        title: "업그레이드",
        url: "#",
      },
      {
        title: "예제",
        url: "#",
      },
    ],
  },
  {
    title: "API 레퍼런스",
    url: "#",
    items: [
      {
        title: "컴포넌트",
        url: "#",
      },
      {
        title: "파일 규칙",
        url: "#",
      },
      {
        title: "함수",
        url: "#",
      },
      {
        title: "next.config.js 옵션",
        url: "#",
      },
      {
        title: "CLI",
        url: "#",
      },
      {
        title: "엣지 런타임",
        url: "#",
      },
    ],
  },
  {
    title: "구조",
    url: "#",
    items: [
      {
        title: "접근성",
        url: "#",
      },
      {
        title: "빠른 새로 고침",
        url: "#",
      },
      {
        title: "Next.js 컴파일러",
        url: "#",
      },
      {
        title: "지원 브라우저",
        url: "#",
      },
      {
        title: "Turbopack",
        url: "#",
      },
    ],
  },
]

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => (
                  <Collapsible
                    key={index}
                    className="group/collapsible"
                    defaultOpen={index === 0}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger render={<SidebarMenuButton />}>
                        <span>{item.title}</span>
                        <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem, subIndex) => (
                            <SidebarMenuSubItem key={subIndex}>
                              <SidebarMenuSubButton
                                render={<a href={subItem.url} />}
                              >
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
