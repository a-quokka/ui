"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/styles/base-nova/ui/select"

export type Language = "en" | "ko"

export type Direction = "ltr" | "rtl"

type TranslationEntry<T extends Record<string, string>> = {
  dir: Direction
  locale?: string
  values: T
}

// `en` is required and acts as the fallback. Every other language is optional so
// an example only has to ship the languages the selector actually offers.
export type Translations<
  T extends Record<string, string> = Record<string, string>,
> = { en: TranslationEntry<T> } & Partial<
  Record<Exclude<Language, "en">, TranslationEntry<T>>
>

export const languageOptions = [
  { value: "en", label: "English" },
  { value: "ko", label: "한국어" },
] as const

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({
  children,
  defaultLanguage = "ko",
}: {
  children: React.ReactNode
  defaultLanguage?: Language
}) {
  const [language, setLanguage] = React.useState<Language>(defaultLanguage)

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  const context = React.useContext(LanguageContext)
  return context
}

export function useTranslation<T extends Record<string, string>>(
  translations: Translations<T>,
  defaultLanguage: Language = "ko"
) {
  const context = useLanguageContext()
  const [localLanguage, setLocalLanguage] =
    React.useState<Language>(defaultLanguage)

  const language = context?.language ?? localLanguage
  const setLanguage = context?.setLanguage ?? setLocalLanguage

  // Fall back to English when an example does not ship the selected language.
  const { dir, locale, values: t } = translations[language] ?? translations.en
  return { language, setLanguage, dir, locale, t }
}

export interface LanguageSelectorProps {
  value: Language
  onValueChange: (value: Language) => void
}

export function LanguageSelector({
  value,
  onValueChange,
  className,
  languages = ["en", "ko"],
}: LanguageSelectorProps & {
  className?: string
  languages?: Language[]
}) {
  return (
    <Select
      items={languageOptions}
      value={value}
      onValueChange={(value) => onValueChange(value as Language)}
    >
      <SelectTrigger
        size="sm"
        className={cn("w-36", className)}
        dir="ltr"
        data-name="language-selector"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        dir="ltr"
        className="data-open:animate-none data-closed:animate-none"
      >
        <SelectGroup>
          {languageOptions
            .filter((option) => languages.includes(option.value as Language))
            .map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
