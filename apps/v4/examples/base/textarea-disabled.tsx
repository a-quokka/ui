import { Field, FieldLabel } from "@/styles/base-nova/ui/field"
import { Textarea } from "@/styles/base-nova/ui/textarea"

export function TextareaDisabled() {
  return (
    <Field data-disabled>
      <FieldLabel htmlFor="textarea-disabled">메시지</FieldLabel>
      <Textarea
        id="textarea-disabled"
        placeholder="메시지를 입력하세요."
        disabled
      />
    </Field>
  )
}
