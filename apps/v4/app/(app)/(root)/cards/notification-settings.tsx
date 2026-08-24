import { Button } from "@/styles/base-rhea/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/base-rhea/ui/card"
import { Checkbox } from "@/styles/base-rhea/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/styles/base-rhea/ui/field"

const NOTIFICATIONS = [
  {
    id: "transactions",
    label: "거래 알림",
    description: "입금·출금·이체입니다.",
    defaultChecked: true,
  },
  {
    id: "security",
    label: "보안 알림",
    description: "로그인 시도와 계정 변경입니다.",
    defaultChecked: true,
  },
  {
    id: "goals",
    label: "목표 이정표",
    description: "25%·50%·75%·100% 에 알려 드립니다.",
    defaultChecked: false,
  },
  {
    id: "market",
    label: "시장 소식",
    description: "하루치 포트폴리오 요약과 시세 알림입니다.",
    defaultChecked: false,
  },
]

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>알림</CardTitle>
        <CardDescription>
          받고 싶은 이메일·푸시 알림을 고르세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          {NOTIFICATIONS.map((n) => (
            <Field key={n.id} orientation="horizontal">
              <Checkbox
                id={`notify-${n.id}`}
                defaultChecked={n.defaultChecked}
              />
              <FieldContent>
                <FieldLabel htmlFor={`notify-${n.id}`}>{n.label}</FieldLabel>
                <FieldDescription>{n.description}</FieldDescription>
              </FieldContent>
            </Field>
          ))}
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full">설정 저장</Button>
      </CardFooter>
    </Card>
  )
}
