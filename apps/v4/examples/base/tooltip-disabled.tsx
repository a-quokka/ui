import { Button } from "@/styles/base-nova/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/styles/base-nova/ui/tooltip"

export function TooltipDisabled() {
  return (
    <>
      <Tooltip>
        <TooltipTrigger render={<span className="inline-block w-fit" />}>
          <Button variant="outline" disabled>
            비활성
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>지금은 쓸 수 없는 기능입니다</p>
        </TooltipContent>
      </Tooltip>
    </>
  )
}
