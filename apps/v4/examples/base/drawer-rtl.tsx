"use client"

import * as React from "react"
import { toast } from "sonner"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Badge } from "@/styles/base-nova/ui-rtl/badge"
import { Button } from "@/styles/base-nova/ui-rtl/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/styles/base-nova/ui-rtl/drawer"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/styles/base-nova/ui-rtl/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/styles/base-nova/ui-rtl/radio-group"

const translations = {
  en: {
    dir: "ltr",
    locale: "en-US",
    values: {
      trigger: "Drawer 열기",
      title: "배달 시간 고르기",
      description: "주문을 최대한 빨리 준비하겠습니다.",
      confirm: "Confirm Delivery Time",
      cancel: "Cancel",
      toastTitle: "Delivery time confirmed",
      asapLabel: "Standard delivery",
      asapDescription: "25–35 min · Driver assigned now",
      asapBadge: "Fastest",
      slot500Label: "5:00 PM – 5:15 PM",
      slot500Description: "Prep starts at 4:45 PM",
      slot530Label: "5:30 PM – 5:45 PM",
      slot530Description: "Good if you're heading home",
      slot600Label: "6:00 PM – 6:15 PM",
      slot600Description: "Most popular · High demand",
      slot630Label: "6:30 PM – 6:45 PM",
      slot630Description: "Last slot before kitchen closes",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      trigger: "Drawer 열기",
      title: "배달 시간 고르기",
      description: "주문을 최대한 빨리 준비하겠습니다.",
      confirm: "이 시간으로 확정",
      cancel: "취소",
      toastTitle: "배달 시간이 확정됐습니다",
      asapLabel: "일반 배달",
      asapDescription: "25~35분 · 지금 기사 배정",
      asapBadge: "가장 빠름",
      slot500Label: "오후 5:00 ~ 5:15",
      slot500Description: "오후 4:45에 조리를 시작합니다",
      slot530Label: "오후 5:30 ~ 5:45",
      slot530Description: "퇴근길에 받기 좋습니다",
      slot600Label: "오후 6:00 ~ 6:15",
      slot600Description: "가장 인기 있는 시간 · 주문이 몰립니다",
      slot630Label: "오후 6:30 ~ 6:45",
      slot630Description: "주방 마감 전 마지막 시간",
    },
  },
} satisfies Translations

type TranslationKey = keyof typeof translations.en.values

const deliveryTimes: Array<{
  value: string
  id: string
  labelKey: TranslationKey
  descriptionKey: TranslationKey
  badgeKey?: TranslationKey
}> = [
  {
    value: "asap",
    id: "delivery-asap-rtl",
    labelKey: "asapLabel",
    descriptionKey: "asapDescription",
    badgeKey: "asapBadge",
  },
  {
    value: "5-00",
    id: "delivery-5-00-rtl",
    labelKey: "slot500Label",
    descriptionKey: "slot500Description",
  },
  {
    value: "5-30",
    id: "delivery-5-30-rtl",
    labelKey: "slot530Label",
    descriptionKey: "slot530Description",
  },
  {
    value: "6-00",
    id: "delivery-6-00-rtl",
    labelKey: "slot600Label",
    descriptionKey: "slot600Description",
  },
  {
    value: "6-30",
    id: "delivery-6-30-rtl",
    labelKey: "slot630Label",
    descriptionKey: "slot630Description",
  },
]

export function DrawerRtl() {
  const { dir, language, t } = useTranslation(translations, "ko")
  const [open, setOpen] = React.useState(false)
  const [deliveryTime, setDeliveryTime] = React.useState("asap")
  const isMobile = useIsMobile()

  function handleConfirm() {
    const selected = deliveryTimes.find((time) => time.value === deliveryTime)

    if (!selected) {
      return
    }

    setOpen(false)
    toast(t.toastTitle, {
      description: t[selected.labelKey],
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
        {t.trigger}
      </DrawerTrigger>
      <DrawerContent dir={dir} data-lang={dir === "rtl" ? language : undefined}>
        <DrawerHeader>
          <DrawerTitle>{t.title}</DrawerTitle>
          <DrawerDescription>{t.description}</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 scroll-fade overflow-y-auto p-4">
          <RadioGroup
            value={deliveryTime}
            onValueChange={setDeliveryTime}
            className="gap-2"
            dir={dir}
          >
            {deliveryTimes.map((time) => (
              <FieldLabel key={time.value} htmlFor={time.id} dir={dir}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle className="flex items-center gap-2">
                      {t[time.labelKey]}
                      {time.badgeKey ? (
                        <Badge variant="secondary">{t[time.badgeKey]}</Badge>
                      ) : null}
                    </FieldTitle>
                    <FieldDescription dir={dir}>
                      {t[time.descriptionKey]}
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value={time.value} id={time.id} dir={dir} />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </div>
        <DrawerFooter>
          <Button onClick={handleConfirm} className="h-[34px]">
            {t.confirm}
          </Button>
          <DrawerClose render={<Button variant="outline" />}>
            {t.cancel}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
