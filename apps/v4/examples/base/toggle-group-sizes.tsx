import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/styles/base-nova/ui/toggle-group"

export function ToggleGroupSizes() {
  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup size="sm" defaultValue={["top"]} variant="outline">
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
      <ToggleGroup defaultValue={["top"]} variant="outline">
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
    </div>
  )
}
