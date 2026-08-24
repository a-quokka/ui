import { Toggle } from "@/styles/base-nova/ui/toggle"

export function ToggleSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" aria-label="작게" size="sm">
        작게
      </Toggle>
      <Toggle variant="outline" aria-label="기본" size="default">
        기본
      </Toggle>
      <Toggle variant="outline" aria-label="크게" size="lg">
        크게
      </Toggle>
    </div>
  )
}
