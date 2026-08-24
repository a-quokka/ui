import { Field, FieldGroup, FieldLabel } from "@/styles/base-nova/ui/field"
import { Input } from "@/styles/base-nova/ui/input"
import { InputGroup, InputGroupInput } from "@/styles/base-nova/ui/input-group"

export function InputGroupBasic() {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="input-default-01">
          기본 (입력 그룹 없음)
        </FieldLabel>
        <Input placeholder="안내 문구" id="input-default-01" />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-group-02">Input Group</FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-group-02" placeholder="안내 문구" />
        </InputGroup>
      </Field>
      <Field data-disabled="true">
        <FieldLabel htmlFor="input-disabled-03">비활성</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="input-disabled-03"
            placeholder="입력할 수 없는 항목입니다"
            disabled
          />
        </InputGroup>
      </Field>
      <Field data-invalid="true">
        <FieldLabel htmlFor="input-invalid-04">오류</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="input-invalid-04"
            placeholder="잘못 입력한 항목입니다"
            aria-invalid="true"
          />
        </InputGroup>
      </Field>
    </FieldGroup>
  )
}
