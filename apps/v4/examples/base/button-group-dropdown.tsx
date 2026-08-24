"use client"

import {
  AlertTriangleIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ShareIcon,
  TrashIcon,
  UserRoundXIcon,
  VolumeOffIcon,
} from "lucide-react"

import { Button } from "@/styles/base-nova/ui/button"
import { ButtonGroup } from "@/styles/base-nova/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/styles/base-nova/ui/dropdown-menu"

export default function ButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <Button variant="outline">팔로우</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" className="pl-2!" />}
        >
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <VolumeOffIcon />
              대화 알림 끄기
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CheckIcon />
              읽음으로 표시
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertTriangleIcon />
              대화 신고
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserRoundXIcon />
              사용자 차단
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShareIcon />
              대화 공유
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon />
              대화 복사
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <TrashIcon />
              대화 삭제
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
