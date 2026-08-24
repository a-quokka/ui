"use client"

import { Button } from "@/styles/base-nova/ui/button"
import { toast } from "@/styles/base-nova/ui/toast"

export function ToastTypes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast.add({ description: "일정을 만들었습니다." })}
      >
        기본
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "success",
            description: "일정을 만들었습니다.",
          })
        }
      >
        완료
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "info",
            description: "일정 10분 전에 도착하세요.",
          })
        }
      >
        안내
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "warning",
            description: "일정은 오전 8시 전에 시작할 수 없습니다.",
          })
        }
      >
        주의
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "error",
            description: "일정을 만들지 못했습니다.",
            priority: "high",
          })
        }
      >
        오류
      </Button>
    </div>
  )
}
