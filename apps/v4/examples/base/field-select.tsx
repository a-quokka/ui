import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/styles/base-nova/ui/select"

const items = [
  { label: "부서 선택", value: null },
  { label: "엔지니어링", value: "engineering" },
  { label: "디자인", value: "design" },
  { label: "마케팅", value: "marketing" },
  { label: "세일즈", value: "sales" },
  { label: "고객 지원", value: "support" },
  { label: "인사", value: "hr" },
  { label: "재무", value: "finance" },
  { label: "운영", value: "operations" },
]

export default function FieldSelect() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>부서</FieldLabel>
      <Select items={items}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldDescription>소속 부서나 담당 영역을 고르세요.</FieldDescription>
    </Field>
  )
}
