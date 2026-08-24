import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/styles/base-nova/ui/select"

export function SelectGroups() {
  const fruits = [
    { label: "사과", value: "apple" },
    { label: "바나나", value: "banana" },
    { label: "블루베리", value: "blueberry" },
  ]
  const vegetables = [
    { label: "당근", value: "carrot" },
    { label: "브로콜리", value: "broccoli" },
    { label: "시금치", value: "spinach" },
  ]
  const allItems = [
    { label: "과일 선택", value: null },
    ...fruits,
    ...vegetables,
  ]
  return (
    <Select items={allItems}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>과일</SelectLabel>
          {fruits.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>채소</SelectLabel>
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
