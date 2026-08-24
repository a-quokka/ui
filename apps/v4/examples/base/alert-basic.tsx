import { CheckCircle2Icon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/styles/base-nova/ui/alert"

export default function AlertBasic() {
  return (
    <Alert className="max-w-md">
      <CheckCircle2Icon />
      <AlertTitle>계정 정보를 저장했습니다</AlertTitle>
      <AlertDescription>
        프로필 정보를 저장했습니다. 변경 내용은 바로 반영됩니다.
      </AlertDescription>
    </Alert>
  )
}
