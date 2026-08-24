import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/styles/base-nova/ui/toggle-group"

export function ToggleGroupSpacing() {
  return (
    <ToggleGroup size="sm" defaultValue={["top"]} variant="outline" spacing={2}>
      <ToggleGroupItem value="top" aria-label="위쪽">
        위
      </ToggleGroupItem>
      <ToggleGroupItem value="bottom" aria-label="아래쪽">
        아래
      </ToggleGroupItem>
      <ToggleGroupItem value="left" aria-label="왼쪽">
        왼쪽
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="오른쪽">
        오른쪽
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
