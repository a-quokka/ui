import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import { Input } from "@/styles/base-nova/ui/input"

export function InputInvalid() {
  return (
    <Field data-invalid>
      <FieldLabel htmlFor="input-invalid">잘못된 입력</FieldLabel>
      <Input id="input-invalid" placeholder="오류" aria-invalid />
      <FieldDescription>검증에 걸린 항목입니다.</FieldDescription>
    </Field>
  )
}
