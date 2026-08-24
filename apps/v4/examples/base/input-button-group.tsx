import { Button } from "@/styles/base-nova/ui/button"
import { ButtonGroup } from "@/styles/base-nova/ui/button-group"
import { Field, FieldLabel } from "@/styles/base-nova/ui/field"
import { Input } from "@/styles/base-nova/ui/input"

export function InputButtonGroup() {
  return (
    <Field>
      <FieldLabel htmlFor="input-button-group">검색</FieldLabel>
      <ButtonGroup>
        <Input id="input-button-group" placeholder="검색어를 입력하세요..." />
        <Button variant="outline">검색</Button>
      </ButtonGroup>
    </Field>
  )
}
