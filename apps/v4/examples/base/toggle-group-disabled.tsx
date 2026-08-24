import { Bold, Italic, Underline } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/styles/base-nova/ui/toggle-group"

export function ToggleGroupDisabled() {
  return (
    <ToggleGroup disabled>
      <ToggleGroupItem value="bold" aria-label="굵게">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="기울임">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="취소선">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
