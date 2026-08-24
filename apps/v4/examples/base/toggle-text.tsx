import { ItalicIcon } from "lucide-react"

import { Toggle } from "@/styles/base-nova/ui/toggle"

export function ToggleText() {
  return (
    <Toggle aria-label="기울임">
      <ItalicIcon />
      기울임
    </Toggle>
  )
}
