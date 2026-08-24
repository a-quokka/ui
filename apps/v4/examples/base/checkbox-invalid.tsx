import { Checkbox } from "@/styles/base-nova/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/styles/base-nova/ui/field"

export function CheckboxInvalid() {
  return (
    <FieldGroup className="mx-auto w-56">
      <Field orientation="horizontal" data-invalid>
        <Checkbox
          id="terms-checkbox-invalid"
          name="terms-checkbox-invalid"
          aria-invalid
        />
        <FieldLabel htmlFor="terms-checkbox-invalid">
          이용약관에 동의합니다
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
