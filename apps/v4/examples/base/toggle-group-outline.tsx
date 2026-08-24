import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/styles/base-nova/ui/toggle-group"

export function ToggleGroupOutline() {
  return (
    <ToggleGroup variant="outline" defaultValue={["all"]}>
      <ToggleGroupItem value="all" aria-label="전체">
        전체
      </ToggleGroupItem>
      <ToggleGroupItem value="missed" aria-label="부재중">
        부재중
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
