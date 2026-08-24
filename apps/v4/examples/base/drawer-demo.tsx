"use client"

import * as React from "react"
import { toast } from "sonner"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/styles/base-rhea/ui/badge"
import { Button } from "@/styles/base-rhea/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/styles/base-rhea/ui/drawer"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/styles/base-rhea/ui/field"
import { RadioGroup, RadioGroupItem } from "@/styles/base-rhea/ui/radio-group"

const deliveryTimes = [
  {
    value: "asap",
    id: "delivery-asap",
    label: "일반 배달",
    description: "25~35분 · 지금 기사 배정",
    badge: "가장 빠름",
  },
  {
    value: "5-00",
    id: "delivery-5-00",
    label: "오후 5:00 ~ 5:15",
    description: "오후 4:45에 조리를 시작합니다",
  },
  {
    value: "5-30",
    id: "delivery-5-30",
    label: "오후 5:30 ~ 5:45",
    description: "퇴근길에 받기 좋습니다",
  },
  {
    value: "6-00",
    id: "delivery-6-00",
    label: "오후 6:00 ~ 6:15",
    description: "가장 인기 있는 시간 · 주문이 몰립니다",
  },
  {
    value: "6-30",
    id: "delivery-6-30",
    label: "오후 6:30 ~ 6:45",
    description: "주방 마감 전 마지막 시간",
  },
]

export function DrawerDemo() {
  const [open, setOpen] = React.useState(false)
  const [deliveryTime, setDeliveryTime] = React.useState("asap")
  const isMobile = useIsMobile()

  function handleConfirm() {
    const selected = deliveryTimes.find((time) => time.value === deliveryTime)

    if (!selected) {
      return
    }

    setOpen(false)
    toast("배달 시간이 확정됐습니다", {
      description: selected.label,
    })
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger render={<Button variant="secondary" />}>
        Drawer 열기
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>배달 시간 고르기</DrawerTitle>
          <DrawerDescription>
            주문을 최대한 빨리 준비하겠습니다.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 scroll-fade overflow-y-auto p-4">
          <RadioGroup
            value={deliveryTime}
            onValueChange={setDeliveryTime}
            className="gap-2"
          >
            {deliveryTimes.map((time) => (
              <FieldLabel key={time.value} htmlFor={time.id}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle className="flex items-center gap-2">
                      {time.label}
                      {time.badge ? (
                        <Badge variant="secondary">{time.badge}</Badge>
                      ) : null}
                    </FieldTitle>
                    <FieldDescription>{time.description}</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value={time.value} id={time.id} />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </div>
        <DrawerFooter>
          <Button onClick={handleConfirm} className="h-[34px]">
            이 시간으로 확정
          </Button>
          <DrawerClose render={<Button variant="outline" />}>취소</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
