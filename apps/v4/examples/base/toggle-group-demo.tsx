import { Bold, Italic, Underline } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/styles/base-nova/ui/toggle-group"

export function ToggleGroupDemo() {
  return (
    <ToggleGroup variant="outline" multiple>
      <ToggleGroupItem value="bold" aria-label="굵게">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="기울임">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="밑줄">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
