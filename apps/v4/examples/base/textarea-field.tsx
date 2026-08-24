import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import { Textarea } from "@/styles/base-nova/ui/textarea"

export function TextareaField() {
  return (
    <Field>
      <FieldLabel htmlFor="textarea-message">메시지</FieldLabel>
      <FieldDescription>아래에 메시지를 입력하세요.</FieldDescription>
      <Textarea id="textarea-message" placeholder="메시지를 입력하세요." />
    </Field>
  )
}
