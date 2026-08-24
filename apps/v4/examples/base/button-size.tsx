import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/styles/base-nova/ui/button"

export default function ButtonSize() {
  return (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <div className="flex items-start gap-2">
        <Button size="xs" variant="outline">
          아주 작게
        </Button>
        <Button size="icon-xs" aria-label="제출" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button size="sm" variant="outline">
          작게
        </Button>
        <Button size="icon-sm" aria-label="제출" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline">기본</Button>
        <Button size="icon" aria-label="제출" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline" size="lg">
          크게
        </Button>
        <Button size="icon-lg" aria-label="제출" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  )
}
