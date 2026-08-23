"use client"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      design: "Design",
      engineering: "Engineering",
      marketing: "Marketing",
      product: "Product",
      research: "Research",
      sales: "Sales",
      support: "Support",
      operations: "Operations",
      finance: "Finance",
      legal: "Legal",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      design: "디자인",
      engineering: "엔지니어링",
      marketing: "마케팅",
      product: "프로덕트",
      research: "리서치",
      sales: "세일즈",
      support: "지원",
      operations: "운영",
      finance: "재무",
      legal: "법무",
    },
  },
}

export function ScrollFadeRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <div
      className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border"
      dir={dir}
    >
      <div className="scroll-fade-x scrollbar-none overflow-x-auto">
        <div className="flex w-max gap-1.5 p-1.5">
          {Object.values(t).map((tag) => (
            <div
              key={tag}
              className="shrink-0 rounded-lg bg-muted px-3 py-2.5 text-sm"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
