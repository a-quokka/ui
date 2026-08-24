import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import { Input } from "@/styles/base-nova/ui/input"

export function InputField() {
  return (
    <Field>
      <FieldLabel htmlFor="input-field-username">사용자 이름</FieldLabel>
      <Input
        id="input-field-username"
        type="text"
        placeholder="사용자 이름을 입력하세요"
      />
      <FieldDescription>
        계정에 쓸 고유한 사용자 이름을 정하세요.
      </FieldDescription>
    </Field>
  )
}
