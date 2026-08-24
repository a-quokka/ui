"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui-rtl/field"
import { Textarea } from "@/styles/base-nova/ui-rtl/textarea"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "의견",
      placeholder: "남겨 주신 의견이 서비스를 더 낫게 만듭니다...",
      description: "서비스에 대한 생각을 들려주세요.",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      label: "의견",
      placeholder: "남겨 주신 의견이 서비스를 더 낫게 만듭니다...",
      description: "서비스에 대한 생각을 들려주세요.",
    },
  },
}

export default function TextareaRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <Field className="w-full max-w-xs" dir={dir}>
      <FieldLabel htmlFor="feedback" dir={dir}>
        {t.label}
      </FieldLabel>
      <Textarea id="feedback" placeholder={t.placeholder} dir={dir} rows={4} />
      <FieldDescription dir={dir}>{t.description}</FieldDescription>
    </Field>
  )
}
