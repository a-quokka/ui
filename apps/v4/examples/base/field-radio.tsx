import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/styles/base-nova/ui/field"
import { RadioGroup, RadioGroupItem } from "@/styles/base-nova/ui/radio-group"

export function FieldRadio() {
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldLegend variant="label">구독 요금제</FieldLegend>
      <FieldDescription>
        연간 요금제와 평생 요금제가 훨씬 저렴합니다.
      </FieldDescription>
      <RadioGroup defaultValue="monthly">
        <Field orientation="horizontal">
          <RadioGroupItem value="monthly" id="plan-monthly" />
          <FieldLabel htmlFor="plan-monthly" className="font-normal">
            월간 (월 9.99달러)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="yearly" id="plan-yearly" />
          <FieldLabel htmlFor="plan-yearly" className="font-normal">
            연간 (연 99.99달러)
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="lifetime" id="plan-lifetime" />
          <FieldLabel htmlFor="plan-lifetime" className="font-normal">
            평생 (299.99달러)
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  )
}
