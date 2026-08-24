import { InboxIcon } from "lucide-react"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/styles/base-nova/ui/item"

export function ItemSizeDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>기본 크기</ItemTitle>
          <ItemDescription>
            대부분의 경우에 알맞은 기본 크기입니다.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>작은 크기</ItemTitle>
          <ItemDescription>
            빽빽한 화면을 위한 촘촘한 크기입니다.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>아주 작은 크기</ItemTitle>
          <ItemDescription>가장 촘촘한 크기입니다.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}
