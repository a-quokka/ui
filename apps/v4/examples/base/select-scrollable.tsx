import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/styles/base-nova/ui/select"

const northAmerica = [
  { label: "미국 동부 표준시", value: "est" },
  { label: "미국 중부 표준시", value: "cst" },
  { label: "미국 산악 표준시", value: "mst" },
  { label: "미국 태평양 표준시", value: "pst" },
  { label: "알래스카 표준시", value: "akst" },
  { label: "하와이 표준시", value: "hst" },
]

const europeAfrica = [
  { label: "그리니치 표준시", value: "gmt" },
  { label: "중앙유럽 시간", value: "cet" },
  { label: "동유럽 시간", value: "eet" },
  { label: "서유럽 서머타임", value: "west" },
  { label: "중앙아프리카 시간", value: "cat" },
  { label: "동아프리카 시간", value: "eat" },
]

const asia = [
  { label: "모스크바 시간", value: "msk" },
  { label: "인도 표준시", value: "ist" },
  { label: "중국 표준시", value: "cst_china" },
  { label: "일본 표준시", value: "jst" },
  { label: "한국 표준시", value: "kst" },
  { label: "인도네시아 중부 표준시", value: "ist_indonesia" },
]

const australiaPacific = [
  { label: "오스트레일리아 서부 표준시", value: "awst" },
  { label: "오스트레일리아 중부 표준시", value: "acst" },
  { label: "오스트레일리아 동부 표준시", value: "aest" },
  { label: "뉴질랜드 표준시", value: "nzst" },
  { label: "피지 시간", value: "fjt" },
]

const southAmerica = [
  { label: "아르헨티나 시간", value: "art" },
  { label: "볼리비아 시간", value: "bot" },
  { label: "브라질리아 시간", value: "brt" },
  { label: "칠레 표준시", value: "clt" },
]

const items = [
  { label: "시간대 선택", value: null },
  ...northAmerica,
  ...europeAfrica,
  ...asia,
  ...australiaPacific,
  ...southAmerica,
]

export function SelectScrollable() {
  return (
    <Select items={items}>
      <SelectTrigger className="w-full max-w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>북아메리카</SelectLabel>
          {northAmerica.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>유럽 · 아프리카</SelectLabel>
          {europeAfrica.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>아시아</SelectLabel>
          {asia.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>오세아니아 · 태평양</SelectLabel>
          {australiaPacific.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>남아메리카</SelectLabel>
          {southAmerica.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
