import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import { Input } from "@/styles/base-nova/ui/input"

export function InputRequired() {
  return (
    <Field>
      <FieldLabel htmlFor="input-required">
        필수 항목 <span className="text-destructive">*</span>
      </FieldLabel>
      <Input id="input-required" placeholder="필수 항목입니다" required />
      <FieldDescription>반드시 입력해야 하는 항목입니다.</FieldDescription>
    </Field>
  )
}
