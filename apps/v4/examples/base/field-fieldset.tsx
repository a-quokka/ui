import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/styles/base-nova/ui/field"
import { Input } from "@/styles/base-nova/ui/input"

export function FieldFieldset() {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend>주소 정보</FieldLegend>
      <FieldDescription>주문을 배송하려면 주소가 필요합니다.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="street">상세 주소</FieldLabel>
          <Input id="street" type="text" placeholder="123 Main St" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="city">도시</FieldLabel>
            <Input id="city" type="text" placeholder="뉴욕" />
          </Field>
          <Field>
            <FieldLabel htmlFor="zip">우편번호</FieldLabel>
            <Input id="zip" type="text" placeholder="90502" />
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  )
}
