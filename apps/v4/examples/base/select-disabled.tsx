import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/styles/base-nova/ui/select"

export function SelectDisabled() {
  const items = [
    { label: "과일 선택", value: null },
    { label: "사과", value: "apple" },
    { label: "바나나", value: "banana" },
    { label: "블루베리", value: "blueberry" },
    { label: "포도", value: "grapes", disabled: true },
    { label: "파인애플", value: "pineapple" },
  ]
  return (
    <Select items={items} disabled>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
