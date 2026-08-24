import { Button } from "@/styles/base-nova/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/styles/base-nova/ui/popover"

export function PopoverAlignments() {
  return (
    <>
      <div className="flex gap-6">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" size="sm" />}>
            시작
          </PopoverTrigger>
          <PopoverContent align="start" className="w-40">
            시작 쪽 정렬
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" size="sm" />}>
            가운데
          </PopoverTrigger>
          <PopoverContent align="center" className="w-40">
            가운데 정렬
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" size="sm" />}>
            끝
          </PopoverTrigger>
          <PopoverContent align="end" className="w-40">
            끝 쪽 정렬
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
