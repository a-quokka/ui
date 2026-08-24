import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/styles/base-nova/ui/field"
import { Textarea } from "@/styles/base-nova/ui/textarea"

export default function FieldTextarea() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="feedback">의견</FieldLabel>
          <Textarea
            id="feedback"
            placeholder="남겨 주신 의견이 서비스를 더 낫게 만듭니다..."
            rows={4}
          />
          <FieldDescription>서비스에 대한 생각을 들려주세요.</FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
