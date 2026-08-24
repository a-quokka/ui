import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import { Textarea } from "@/styles/base-nova/ui/textarea"

export function TextareaInvalid() {
  return (
    <Field data-invalid>
      <FieldLabel htmlFor="textarea-invalid">메시지</FieldLabel>
      <Textarea
        id="textarea-invalid"
        placeholder="메시지를 입력하세요."
        aria-invalid
      />
      <FieldDescription>올바른 메시지를 입력해 주세요.</FieldDescription>
    </Field>
  )
}
