import { ArrowUpRightIcon, FolderIcon } from "lucide-react"

import { Button } from "@/styles/base-nova/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/styles/base-nova/ui/empty"

export function EmptyInCard() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>아직 프로젝트가 없습니다</EmptyTitle>
        <EmptyDescription>
          만든 프로젝트가 아직 없습니다. 첫 프로젝트를 만들어 보세요.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button render={<a href="#" />} nativeButton={false}>
            프로젝트 만들기
          </Button>
          <Button variant="outline">프로젝트 가져오기</Button>
        </div>
        <Button
          variant="link"
          render={<a href="#" />}
          className="text-muted-foreground"
          nativeButton={false}
        >
          자세히 보기 <ArrowUpRightIcon />
        </Button>
      </EmptyContent>
    </Empty>
  )
}
