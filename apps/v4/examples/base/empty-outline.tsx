import { IconCloud } from "@tabler/icons-react"

import { Button } from "@/styles/base-nova/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/styles/base-nova/ui/empty"

export default function EmptyOutline() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconCloud />
        </EmptyMedia>
        <EmptyTitle>클라우드가 비어 있습니다</EmptyTitle>
        <EmptyDescription>
          클라우드에 파일을 올려 두면 어디서든 열 수 있습니다.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          파일 올리기
        </Button>
      </EmptyContent>
    </Empty>
  )
}
