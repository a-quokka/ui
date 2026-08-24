import { Button } from "@/styles/base-nova/ui/button"
import { Spinner } from "@/styles/base-nova/ui/spinner"

export default function ButtonLoading() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" />
        생성 중
      </Button>
      <Button variant="secondary" disabled>
        내려받는 중
        <Spinner data-icon="inline-start" />
      </Button>
    </div>
  )
}
