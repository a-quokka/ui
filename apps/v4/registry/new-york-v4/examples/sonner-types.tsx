"use client"

import { toast } from "sonner"

import { Button } from "@/registry/new-york-v4/ui/button"

export default function SonnerTypes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Event has been created")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("일정 시작 10분 전까지 도착하세요")}
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("일정 시작 시각은 오전 8시보다 이를 수 없습니다")
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("일정을 만들지 못했습니다")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Event" }), 2000)
              ),
            {
              loading: "Loading...",
              success: (data) => `${data.name} has been created`,
              error: "Error",
            }
          )
        }}
      >
        Promise
      </Button>
    </div>
  )
}
