import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/styles/base-nova/ui/alert"
import { Button } from "@/styles/base-nova/ui/button"

export default function AlertActionExample() {
  return (
    <Alert className="max-w-md">
      <AlertTitle>다크 모드를 쓸 수 있습니다</AlertTitle>
      <AlertDescription>
        프로필 설정에서 켜면 바로 쓸 수 있습니다.
      </AlertDescription>
      <AlertAction>
        <Button size="xs" variant="default">
          켜기
        </Button>
      </AlertAction>
    </Alert>
  )
}
