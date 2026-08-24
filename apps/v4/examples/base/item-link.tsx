import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/styles/base-nova/ui/item"

export function ItemLink() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item render={<a href="#" />}>
        <ItemContent>
          <ItemTitle>문서 보러 가기</ItemTitle>
          <ItemDescription>
            컴포넌트를 어떻게 시작하는지 알아보세요.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon className="size-4" />
        </ItemActions>
      </Item>
      <Item
        variant="outline"
        render={<a href="#" target="_blank" rel="noopener noreferrer" />}
      >
        <ItemContent>
          <ItemTitle>외부 자료</ItemTitle>
          <ItemDescription>
            보안 속성이 붙은 새 탭에서 열립니다.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <ExternalLinkIcon className="size-4" />
        </ItemActions>
      </Item>
    </div>
  )
}
