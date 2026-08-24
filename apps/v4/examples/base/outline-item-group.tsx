import { InboxIcon } from "lucide-react"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/styles/base-nova/ui/item"

export function OutlineItemGroup() {
  return (
    <ItemGroup>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>항목 1</ItemTitle>
          <ItemDescription>아이콘이 있는 첫 아이템입니다.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>항목 2</ItemTitle>
          <ItemDescription>아이콘이 있는 두 번째 아이템입니다.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>항목 3</ItemTitle>
          <ItemDescription>아이콘이 있는 세 번째 아이템입니다.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}
