import { InfoIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/styles/base-nova/ui/input-group"
import { Label } from "@/styles/base-nova/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/styles/base-nova/ui/tooltip"

export default function InputGroupLabel() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput id="email" placeholder="dropshot" />
        <InputGroupAddon>
          <Label htmlFor="email">@</Label>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput id="email-2" placeholder="dropshot@dropshot.io" />
        <InputGroupAddon align="block-start">
          <Label htmlFor="email-2" className="text-foreground">
            이메일
          </Label>
          <Tooltip>
            <TooltipTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  aria-label="도움말"
                  className="ml-auto rounded-full"
                  size="icon-xs"
                />
              }
            >
              <InfoIcon />
            </TooltipTrigger>
            <TooltipContent>
              <p>알림을 보낼 때 씁니다</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
