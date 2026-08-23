"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui-rtl/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/styles/base-nova/ui-rtl/radio-group"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      default: "Default",
      defaultDescription: "Standard spacing for most use cases.",
      comfortable: "Comfortable",
      comfortableDescription: "More space between elements.",
      compact: "Compact",
      compactDescription: "Minimal spacing for dense layouts.",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      default: "기본",
      defaultDescription: "대부분의 경우에 알맞은 기본 간격입니다.",
      comfortable: "여유",
      comfortableDescription: "요소 사이를 더 넓게 띄웁니다.",
      compact: "촘촘",
      compactDescription: "빽빽한 화면을 위한 최소 간격입니다.",
    },
  },
}

export function RadioGroupRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <RadioGroup defaultValue="comfortable" className="w-fit" dir={dir}>
      <Field orientation="horizontal">
        <RadioGroupItem value="default" id="r1-rtl" dir={dir} />
        <FieldContent>
          <FieldLabel htmlFor="r1-rtl" dir={dir}>
            {t.default}
          </FieldLabel>
          <FieldDescription dir={dir}>{t.defaultDescription}</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="comfortable" id="r2-rtl" dir={dir} />
        <FieldContent>
          <FieldLabel htmlFor="r2-rtl" dir={dir}>
            {t.comfortable}
          </FieldLabel>
          <FieldDescription dir={dir}>
            {t.comfortableDescription}
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="compact" id="r3-rtl" dir={dir} />
        <FieldContent>
          <FieldLabel htmlFor="r3-rtl" dir={dir}>
            {t.compact}
          </FieldLabel>
          <FieldDescription dir={dir}>{t.compactDescription}</FieldDescription>
        </FieldContent>
      </Field>
    </RadioGroup>
  )
}
