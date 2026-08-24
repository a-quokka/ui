import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/styles/base-nova/ui/item"
import { Spinner } from "@/styles/base-nova/ui/spinner"

export function SpinnerDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">결제 처리 중...</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          <span className="text-sm tabular-nums">100,000원</span>
        </ItemContent>
      </Item>
    </div>
  )
}
