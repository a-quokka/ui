import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import { Switch } from "@/styles/base-nova/ui/switch"

export function SwitchInvalid() {
  return (
    <Field orientation="horizontal" className="max-w-sm" data-invalid>
      <FieldContent>
        <FieldLabel htmlFor="switch-terms">이용약관에 동의합니다</FieldLabel>
        <FieldDescription>계속하려면 약관에 동의해야 합니다.</FieldDescription>
      </FieldContent>
      <Switch id="switch-terms" aria-invalid />
    </Field>
  )
}
