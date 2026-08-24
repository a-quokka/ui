import { HelpCircle, InfoIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/styles/base-nova/ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/styles/base-nova/ui/tooltip"

export default function InputGroupTooltip() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="비밀번호를 입력하세요" type="password" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  aria-label="안내"
                  size="icon-xs"
                />
              }
            >
              <InfoIcon />
            </TooltipTrigger>
            <TooltipContent>
              <p>비밀번호는 8자 이상이어야 합니다</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="이메일 주소" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  aria-label="도움말"
                  size="icon-xs"
                />
              }
            >
              <HelpCircle />
            </TooltipTrigger>
            <TooltipContent>
              <p>알림을 보낼 때 씁니다</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="API 키를 입력하세요" />
        <Tooltip>
          <TooltipTrigger render={<InputGroupAddon />}>
            <InputGroupButton
              variant="ghost"
              aria-label="도움말"
              size="icon-xs"
            >
              <HelpCircle />
            </InputGroupButton>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>API 키에 대한 도움말 보기</p>
          </TooltipContent>
        </Tooltip>
      </InputGroup>
    </div>
  )
}
