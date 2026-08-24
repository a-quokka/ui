"use client"

import * as React from "react"

import {
  useTranslation,
  type Language,
  type Translations,
} from "@/components/language-selector"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/styles/base-nova/ui-rtl/select"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      selectFruit: "Select a fruit",
      fruits: "Fruits",
      apple: "Apple",
      banana: "Banana",
      blueberry: "Blueberry",
      grapes: "Grapes",
      pineapple: "Pineapple",
      vegetables: "Vegetables",
      carrot: "Carrot",
      broccoli: "Broccoli",
      spinach: "Spinach",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      selectFruit: "과일 선택",
      fruits: "과일",
      apple: "사과",
      banana: "바나나",
      blueberry: "블루베리",
      grapes: "포도",
      pineapple: "파인애플",
      vegetables: "채소",
      carrot: "당근",
      broccoli: "브로콜리",
      spinach: "시금치",
    },
  },
}

export function SelectRtl() {
  const { dir, t, language } = useTranslation(translations, "ko")
  const [selectedFruit, setSelectedFruit] = React.useState<string | null>(null)

  const fruits = [
    { label: t.apple, value: "apple" },
    { label: t.banana, value: "banana" },
    { label: t.blueberry, value: "blueberry" },
    { label: t.grapes, value: "grapes" },
    { label: t.pineapple, value: "pineapple" },
  ]

  const vegetables = [
    { label: t.carrot, value: "carrot" },
    { label: t.broccoli, value: "broccoli" },
    { label: t.spinach, value: "spinach" },
  ]

  const allItems = [
    { label: t.selectFruit, value: null },
    ...fruits,
    ...vegetables,
  ]

  return (
    <Select
      items={allItems}
      value={selectedFruit}
      onValueChange={setSelectedFruit}
    >
      <SelectTrigger className="w-32" dir={dir}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent dir={dir} data-lang={dir === "rtl" ? language : undefined}>
        <SelectGroup>
          <SelectLabel>{t.fruits}</SelectLabel>
          {fruits.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>{t.vegetables}</SelectLabel>
          {vegetables.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
