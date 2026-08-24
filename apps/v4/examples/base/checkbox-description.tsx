import { Checkbox } from "@/styles/base-nova/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/styles/base-nova/ui/field"

export function CheckboxDescription() {
  return (
    <FieldGroup className="mx-auto w-72">
      <Field orientation="horizontal">
        <Checkbox
          id="terms-checkbox-desc"
          name="terms-checkbox-desc"
          defaultChecked
        />
        <FieldContent>
          <FieldLabel htmlFor="terms-checkbox-desc">
            이용약관에 동의합니다
          </FieldLabel>
          <FieldDescription>
            이 체크박스를 누르면 약관에 동의하는 것으로 봅니다.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}
