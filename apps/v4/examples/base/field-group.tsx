import { Checkbox } from "@/styles/base-nova/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/styles/base-nova/ui/field"

export default function FieldGroupExample() {
  return (
    <FieldGroup className="w-full max-w-xs">
      <FieldSet>
        <FieldLabel>응답</FieldLabel>
        <FieldDescription>
          리서치나 이미지 생성처럼 시간이 걸리는 요청의 답이 오면 알려 드립니다.
        </FieldDescription>
        <FieldGroup data-slot="checkbox-group">
          <Field orientation="horizontal">
            <Checkbox id="push" defaultChecked disabled />
            <FieldLabel htmlFor="push" className="font-normal">
              푸시 알림
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLabel>작업</FieldLabel>
        <FieldDescription>
          만들어 둔 작업에 변화가 생기면 알려 드립니다.{" "}
          <a href="#">작업 관리</a>
        </FieldDescription>
        <FieldGroup data-slot="checkbox-group">
          <Field orientation="horizontal">
            <Checkbox id="push-tasks" />
            <FieldLabel htmlFor="push-tasks" className="font-normal">
              푸시 알림
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="email-tasks" />
            <FieldLabel htmlFor="email-tasks" className="font-normal">
              이메일 알림
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}
