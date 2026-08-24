"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/styles/base-nova/ui-rtl/native-select"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      placeholder: "상태 선택",
      todo: "Todo",
      inProgress: "In Progress",
      done: "Done",
      cancelled: "Cancelled",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      placeholder: "상태 선택",
      todo: "할 일",
      inProgress: "진행 중",
      done: "완료",
      cancelled: "취소됨",
    },
  },
}

export function NativeSelectRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <NativeSelect dir={dir}>
      <NativeSelectOption value="">{t.placeholder}</NativeSelectOption>
      <NativeSelectOption value="todo">{t.todo}</NativeSelectOption>
      <NativeSelectOption value="in-progress">
        {t.inProgress}
      </NativeSelectOption>
      <NativeSelectOption value="done">{t.done}</NativeSelectOption>
      <NativeSelectOption value="cancelled">{t.cancelled}</NativeSelectOption>
    </NativeSelect>
  )
}
