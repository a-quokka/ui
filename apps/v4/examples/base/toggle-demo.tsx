import { BookmarkIcon } from "lucide-react"

import { Toggle } from "@/styles/base-nova/ui/toggle"

export function ToggleDemo() {
  return (
    <Toggle aria-label="북마크 켜고 끄기" size="sm" variant="outline">
      <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
      북마크
    </Toggle>
  )
}
