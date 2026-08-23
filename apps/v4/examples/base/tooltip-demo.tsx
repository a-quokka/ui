import { Button } from "@/styles/base-nova/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/styles/base-nova/ui/tooltip"

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        마우스 올리기
      </TooltipTrigger>
      <TooltipContent>
        <p>라이브러리에 추가</p>
      </TooltipContent>
    </Tooltip>
  )
}
