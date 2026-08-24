import { AlertTriangleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/styles/base-nova/ui/alert"

export default function AlertColors() {
  return (
    <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
      <AlertTriangleIcon />
      <AlertTitle>구독이 3일 뒤에 만료됩니다.</AlertTitle>
      <AlertDescription>
        서비스가 끊기지 않도록 지금 갱신하거나 유료 요금제로 올리세요.
      </AlertDescription>
    </Alert>
  )
}
