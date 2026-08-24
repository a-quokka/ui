import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import { Input } from "@/styles/base-nova/ui/input"

export function InputFile() {
  return (
    <Field>
      <FieldLabel htmlFor="picture">사진</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>올릴 사진을 고르세요.</FieldDescription>
    </Field>
  )
}
