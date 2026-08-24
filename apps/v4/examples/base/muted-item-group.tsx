import { Button } from "@/styles/base-nova/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/styles/base-nova/ui/item"

export function MutedItemGroup() {
  return (
    <ItemGroup>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>항목 1</ItemTitle>
          <ItemDescription>muted 그룹의 첫 아이템입니다.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            동작
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>항목 2</ItemTitle>
          <ItemDescription>muted 그룹의 두 번째 아이템입니다.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            동작
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>항목 3</ItemTitle>
          <ItemDescription>muted 그룹의 세 번째 아이템입니다.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            동작
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  )
}
