import { Add01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/styles/base-rhea/ui/button"
import { Card, CardContent } from "@/styles/base-rhea/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/styles/base-rhea/ui/empty"

export function EmptyDistributeTrack() {
  return (
    <Card>
      <CardContent>
        <Empty className="p-4">
          <EmptyMedia variant="icon">
            <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>음원 유통</EmptyTitle>
            <EmptyDescription>
              첫 마스터 음원을 올려 Spotify·Apple Music 등에서 청취자를 만나
              보세요.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>음원 등록</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
