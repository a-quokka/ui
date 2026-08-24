import { Badge } from "@/styles/base-nova/ui/badge"
import { Spinner } from "@/styles/base-nova/ui/spinner"

export function SpinnerBadge() {
  return (
    <div className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge>
        <Spinner data-icon="inline-start" />
        동기화 중
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        업데이트 중
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" />
        처리 중
      </Badge>
    </div>
  )
}
