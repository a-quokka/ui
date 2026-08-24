import { Button } from "@/styles/base-nova/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/styles/base-nova/ui/empty"
import { Spinner } from "@/styles/base-nova/ui/spinner"

export function SpinnerEmpty() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>요청을 처리하는 중</EmptyTitle>
        <EmptyDescription>
          요청을 처리하는 동안 기다려 주세요. 페이지를 새로 고치지 마세요.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          취소
        </Button>
      </EmptyContent>
    </Empty>
  )
}
