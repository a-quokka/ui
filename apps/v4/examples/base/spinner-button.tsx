import { Button } from "@/styles/base-nova/ui/button"
import { Spinner } from "@/styles/base-nova/ui/spinner"

export function SpinnerButton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        불러오는 중...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner data-icon="inline-start" />
        잠시만 기다려 주세요
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner data-icon="inline-start" />
        처리 중
      </Button>
    </div>
  )
}
