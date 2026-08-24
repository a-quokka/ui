import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/styles/base-nova/ui/alert"

export default function AlertDestructive() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>결제 실패</AlertTitle>
      <AlertDescription>
        결제를 처리하지 못했습니다. 결제 수단을 확인하고 다시 시도해 주세요.
      </AlertDescription>
    </Alert>
  )
}
