"use client"

import * as React from "react"
import { CreditCardIcon, SettingsIcon, UserIcon } from "lucide-react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Button } from "@/styles/base-nova/ui-rtl/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/styles/base-nova/ui-rtl/dropdown-menu"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      open: "Open",
      account: "Account",
      profile: "Profile",
      billing: "Billing",
      settings: "Settings",
      logout: "Log out",
      team: "Team",
      inviteUsers: "Invite users",
      email: "Email",
      message: "Message",
      more: "More",
      calendar: "Calendar",
      chat: "Chat",
      webhook: "Webhook",
      advanced: "Advanced...",
      newTeam: "New Team",
      view: "View",
      statusBar: "Status Bar",
      activityBar: "Activity Bar",
      panel: "Panel",
      position: "Position",
      top: "Top",
      bottom: "Bottom",
      right: "Right",
      left: "Left",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      open: "열기",
      account: "계정",
      profile: "프로필",
      billing: "결제",
      settings: "설정",
      logout: "로그아웃",
      team: "팀",
      inviteUsers: "사용자 초대",
      email: "이메일",
      message: "메시지",
      more: "더 보기",
      calendar: "캘린더",
      chat: "채팅",
      webhook: "웹훅",
      advanced: "고급...",
      newTeam: "새 팀",
      view: "보기",
      statusBar: "상태 표시줄",
      activityBar: "활동 표시줄",
      panel: "패널",
      position: "위치",
      top: "위",
      bottom: "아래",
      right: "오른쪽",
      left: "왼쪽",
    },
  },
}

export function DropdownMenuRtl() {
  const { dir, language, t } = useTranslation(translations, "ko")
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)
  const [position, setPosition] = React.useState("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        {t.open}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={dir === "rtl" ? "end" : "start"}
        dir={dir}
        className="w-36"
        data-lang={dir === "rtl" ? language : undefined}
      >
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t.account}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                dir={dir}
                data-lang={dir === "rtl" ? language : undefined}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserIcon />
                    {t.profile}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    {t.billing}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon />
                    {t.settings}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t.team}</DropdownMenuLabel>
          <DropdownMenuItem>{t.team}</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t.inviteUsers}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                dir={dir}
                data-lang={dir === "rtl" ? language : undefined}
              >
                <DropdownMenuItem>{t.email}</DropdownMenuItem>
                <DropdownMenuItem>{t.message}</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>{t.more}</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent
                      dir={dir}
                      data-lang={dir === "rtl" ? language : undefined}
                    >
                      <DropdownMenuItem>{t.calendar}</DropdownMenuItem>
                      <DropdownMenuItem>{t.chat}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>{t.webhook}</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t.advanced}</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            {t.newTeam}
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t.view}</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            {t.statusBar}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            {t.activityBar}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            {t.panel}
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t.position}</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">{t.top}</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              {t.bottom}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">
              {t.right}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="left">{t.left}</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">{t.logout}</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
