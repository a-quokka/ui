import { Toggle } from "@/styles/base-nova/ui/toggle"

export function ToggleDisabled() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="비활성" disabled>
        비활성
      </Toggle>
      <Toggle variant="outline" aria-label="비활성 외곽선" disabled>
        비활성
      </Toggle>
    </div>
  )
}
