import { CheckCircle2Icon, InfoIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/styles/base-nova/ui/alert"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>결제가 끝났습니다</AlertTitle>
        <AlertDescription>
          29.99달러 결제가 처리됐습니다. 영수증은 이메일로 보내 드렸습니다.
        </AlertDescription>
      </Alert>
      <Alert>
        <InfoIcon />
        <AlertTitle>새 기능이 추가됐습니다</AlertTitle>
        <AlertDescription>
          다크 모드를 지원합니다. 계정 설정에서 켤 수 있습니다.
        </AlertDescription>
      </Alert>
    </div>
  )
}
