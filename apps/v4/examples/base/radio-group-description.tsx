import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import { RadioGroup, RadioGroupItem } from "@/styles/base-nova/ui/radio-group"

export function RadioGroupDescription() {
  return (
    <RadioGroup defaultValue="comfortable" className="w-fit">
      <Field orientation="horizontal">
        <RadioGroupItem value="default" id="desc-r1" />
        <FieldContent>
          <FieldLabel htmlFor="desc-r1">기본</FieldLabel>
          <FieldDescription>
            대부분의 경우에 알맞은 기본 간격입니다.
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="comfortable" id="desc-r2" />
        <FieldContent>
          <FieldLabel htmlFor="desc-r2">여유</FieldLabel>
          <FieldDescription>요소 사이를 더 넓게 띄웁니다.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="compact" id="desc-r3" />
        <FieldContent>
          <FieldLabel htmlFor="desc-r3">촘촘</FieldLabel>
          <FieldDescription>
            빽빽한 화면을 위한 최소 간격입니다.
          </FieldDescription>
        </FieldContent>
      </Field>
    </RadioGroup>
  )
}
