import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/styles/base-nova/ui/field"
import { Switch } from "@/styles/base-nova/ui/switch"

export function SwitchChoiceCard() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <FieldLabel htmlFor="switch-share">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>여러 기기에서 함께 쓰기</FieldTitle>
            <FieldDescription>
              집중 모드가 기기 사이에 공유되고, 앱을 벗어나면 꺼집니다.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-share" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="switch-notifications">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>알림 켜기</FieldTitle>
            <FieldDescription>
              집중 모드가 켜지거나 꺼질 때 알림을 받습니다.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-notifications" defaultChecked />
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}
