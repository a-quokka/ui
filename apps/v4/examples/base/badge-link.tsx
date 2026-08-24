import { ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@/styles/base-nova/ui/badge"

export function BadgeAsLink() {
  return (
    <Badge render={<a href="#link" />}>
      링크 열기 <ArrowUpRightIcon data-icon="inline-end" />
    </Badge>
  )
}
