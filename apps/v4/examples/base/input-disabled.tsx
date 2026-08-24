import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import { Input } from "@/styles/base-nova/ui/input"

export function InputDisabled() {
  return (
    <Field data-disabled>
      <FieldLabel htmlFor="input-demo-disabled">이메일</FieldLabel>
      <Input
        id="input-demo-disabled"
        type="email"
        placeholder="이메일"
        disabled
      />
      <FieldDescription>지금은 입력할 수 없는 항목입니다.</FieldDescription>
    </Field>
  )
}
