"use client"

import { Button } from "@/styles/base-nova/ui/button"
import { toast } from "@/styles/base-nova/ui/toast"

export function ToastDemo() {
  function showToast() {
    const id = toast.add({
      title: "일정을 만들었습니다",
      description: "12월 3일 일요일 오전 9시",
      actionProps: {
        children: "실행 취소",
        onClick() {
          toast.close(id)
        },
      },
    })
  }

  return (
    <Button variant="outline" onClick={showToast}>
      토스트 띄우기
    </Button>
  )
}
