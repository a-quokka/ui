"use client"

import { Button } from "@/styles/base-nova/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/styles/base-nova/ui/combobox"

const countries = [
  { code: "", value: "", continent: "", label: "국가 선택" },
  {
    code: "ar",
    value: "argentina",
    label: "아르헨티나",
    continent: "South America",
  },
  {
    code: "au",
    value: "australia",
    label: "오스트레일리아",
    continent: "Oceania",
  },
  { code: "br", value: "brazil", label: "브라질", continent: "South America" },
  { code: "ca", value: "canada", label: "캐나다", continent: "North America" },
  { code: "cn", value: "china", label: "중국", continent: "Asia" },
  {
    code: "co",
    value: "colombia",
    label: "콜롬비아",
    continent: "South America",
  },
  { code: "eg", value: "egypt", label: "이집트", continent: "Africa" },
  { code: "fr", value: "france", label: "프랑스", continent: "Europe" },
  { code: "de", value: "germany", label: "독일", continent: "Europe" },
  { code: "it", value: "italy", label: "이탈리아", continent: "Europe" },
  { code: "jp", value: "japan", label: "일본", continent: "Asia" },
  { code: "ke", value: "kenya", label: "케냐", continent: "Africa" },
  { code: "mx", value: "mexico", label: "멕시코", continent: "North America" },
  {
    code: "nz",
    value: "new-zealand",
    label: "뉴질랜드",
    continent: "Oceania",
  },
  { code: "ng", value: "nigeria", label: "나이지리아", continent: "Africa" },
  {
    code: "za",
    value: "south-africa",
    label: "남아프리카공화국",
    continent: "Africa",
  },
  { code: "kr", value: "south-korea", label: "대한민국", continent: "Asia" },
  {
    code: "gb",
    value: "united-kingdom",
    label: "영국",
    continent: "Europe",
  },
  {
    code: "us",
    value: "united-states",
    label: "미국",
    continent: "North America",
  },
]

export function ComboboxPopup() {
  return (
    <>
      <Combobox items={countries} defaultValue={countries[0]}>
        <ComboboxTrigger
          render={
            <Button
              variant="outline"
              className="w-64 justify-between font-normal"
            />
          }
        >
          <ComboboxValue />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput showTrigger={false} placeholder="검색" />
          <ComboboxEmpty>항목이 없습니다.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.code} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  )
}
