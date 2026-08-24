import { BoldIcon, ItalicIcon } from "lucide-react"

import { Toggle } from "@/styles/base-nova/ui/toggle"

export function ToggleOutline() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" aria-label="기울임">
        <ItalicIcon />
        기울임
      </Toggle>
      <Toggle variant="outline" aria-label="굵게">
        <BoldIcon />
        굵게
      </Toggle>
    </div>
  )
}
