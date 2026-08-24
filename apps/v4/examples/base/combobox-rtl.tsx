"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/styles/base-nova/ui-rtl/combobox"
import { Field, FieldLabel } from "@/styles/base-nova/ui-rtl/field"

const categories = [
  "technology",
  "design",
  "business",
  "marketing",
  "education",
  "health",
] as const

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "분류",
      placeholder: "분류 추가",
      empty: "No categories found.",
      technology: "Technology",
      design: "Design",
      business: "Business",
      marketing: "Marketing",
      education: "Education",
      health: "Health",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      label: "분류",
      placeholder: "분류 추가",
      empty: "분류가 없습니다.",
      technology: "기술",
      design: "디자인",
      business: "비즈니스",
      marketing: "마케팅",
      education: "교육",
      health: "건강",
    },
  },
}

export function ComboboxRtl() {
  const { dir, t, language } = useTranslation(translations, "ko")
  const anchor = useComboboxAnchor()

  const categoryLabels: Record<string, string> = {
    technology: t.technology,
    design: t.design,
    business: t.business,
    marketing: t.marketing,
    education: t.education,
    health: t.health,
  }

  return (
    <Field className="mx-auto w-full max-w-xs">
      <FieldLabel>{t.label}</FieldLabel>
      <Combobox
        multiple
        autoHighlight
        items={categories}
        defaultValue={[categories[0]]}
        itemToStringValue={(item: (typeof categories)[number]) =>
          categoryLabels[item] || item
        }
      >
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(values) => (
              <React.Fragment>
                {values.map((value: string) => (
                  <ComboboxChip key={value}>
                    {categoryLabels[value] || value}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder={t.placeholder} />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent
          anchor={anchor}
          dir={dir}
          data-lang={dir === "rtl" ? language : undefined}
        >
          <ComboboxEmpty>{t.empty}</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {categoryLabels[item] || item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  )
}
