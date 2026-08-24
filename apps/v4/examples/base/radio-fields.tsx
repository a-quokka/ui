import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/styles/base-nova/ui/field"
import { RadioGroup, RadioGroupItem } from "@/styles/base-nova/ui/radio-group"

export function RadioFields() {
  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend variant="label">구독 요금제</FieldLegend>
        <RadioGroup defaultValue="free">
          <Field orientation="horizontal">
            <RadioGroupItem value="free" id="radio-free" />
            <FieldLabel htmlFor="radio-free" className="font-normal">
              무료 요금제
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="pro" id="radio-pro" />
            <FieldLabel htmlFor="radio-pro" className="font-normal">
              Pro 요금제
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="enterprise" id="radio-enterprise" />
            <FieldLabel htmlFor="radio-enterprise" className="font-normal">
              엔터프라이즈
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
      <FieldSet>
        <FieldLegend variant="label">배터리 수준</FieldLegend>
        <FieldDescription>원하는 배터리 수준을 고르세요.</FieldDescription>
        <RadioGroup>
          <Field orientation="horizontal">
            <RadioGroupItem value="high" id="battery-high" />
            <FieldLabel htmlFor="battery-high">높음</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="medium" id="battery-medium" />
            <FieldLabel htmlFor="battery-medium">보통</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="low" id="battery-low" />
            <FieldLabel htmlFor="battery-low">낮음</FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
      <RadioGroup className="gap-6">
        <Field orientation="horizontal">
          <RadioGroupItem value="option1" id="radio-content-1" />
          <FieldContent>
            <FieldLabel htmlFor="radio-content-1">Touch ID 켜기</FieldLabel>
            <FieldDescription>
              Touch ID 를 켜면 기기를 빠르게 잠금 해제할 수 있습니다.
            </FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="option2" id="radio-content-2" />
          <FieldContent>
            <FieldLabel htmlFor="radio-content-2">
              Touch ID 와 Face ID 를 켜면 기기를 더 빨리 잠금 해제할 수
              있습니다. 배치를 확인하려고 일부러 길게 쓴 라벨입니다.
            </FieldLabel>
            <FieldDescription>
              Touch ID 를 켜면 기기를 빠르게 잠금 해제할 수 있습니다.
            </FieldDescription>
          </FieldContent>
        </Field>
      </RadioGroup>
      <RadioGroup className="gap-3">
        <FieldLabel htmlFor="radio-title-1">
          <Field orientation="horizontal">
            <RadioGroupItem value="title1" id="radio-title-1" />
            <FieldContent>
              <FieldTitle>Touch ID 켜기</FieldTitle>
              <FieldDescription>
                Touch ID 를 켜면 기기를 빠르게 잠금 해제할 수 있습니다.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="radio-title-2">
          <Field orientation="horizontal">
            <RadioGroupItem value="title2" id="radio-title-2" />
            <FieldContent>
              <FieldTitle>
                Touch ID 와 Face ID 를 켜면 기기를 더 빨리 잠금 해제할 수
                있습니다. 배치를 확인하려고 일부러 길게 쓴 라벨입니다.
              </FieldTitle>
              <FieldDescription>
                Touch ID 를 켜면 기기를 빠르게 잠금 해제할 수 있습니다.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
      </RadioGroup>
      <FieldSet>
        <FieldLegend variant="label">오류 라디오 그룹</FieldLegend>
        <RadioGroup>
          <Field data-invalid orientation="horizontal">
            <RadioGroupItem
              value="invalid1"
              id="radio-invalid-1"
              aria-invalid
            />
            <FieldLabel htmlFor="radio-invalid-1">오류 항목 1</FieldLabel>
          </Field>
          <Field data-invalid orientation="horizontal">
            <RadioGroupItem
              value="invalid2"
              id="radio-invalid-2"
              aria-invalid
            />
            <FieldLabel htmlFor="radio-invalid-2">오류 항목 2</FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
      <FieldSet>
        <FieldLegend variant="label">비활성 라디오 그룹</FieldLegend>
        <RadioGroup disabled>
          <Field data-disabled orientation="horizontal">
            <RadioGroupItem value="disabled1" id="radio-disabled-1" disabled />
            <FieldLabel htmlFor="radio-disabled-1">비활성 항목 1</FieldLabel>
          </Field>
          <Field data-disabled orientation="horizontal">
            <RadioGroupItem value="disabled2" id="radio-disabled-2" disabled />
            <FieldLabel htmlFor="radio-disabled-2">비활성 항목 2</FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </FieldGroup>
  )
}
