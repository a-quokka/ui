import { Button } from "@/styles/base-rhea/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/base-rhea/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/styles/base-rhea/ui/field"
import { Input } from "@/styles/base-rhea/ui/input"

export function NewMilestone() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>새 이정표 세우기</CardTitle>
        <CardDescription>
          재무 목표를 정하면 저축 속도를 함께 맞춰 드립니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="goal-name">목표 이름</FieldLabel>
            <Input id="goal-name" placeholder="예: 새 차, 주택 계약금" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="target-amount">목표 금액</FieldLabel>
              <Input id="target-amount" defaultValue="$15,000" />
            </Field>
            <Field>
              <FieldLabel htmlFor="target-date">목표 날짜</FieldLabel>
              <Input id="target-date" defaultValue="Dec 2025" />
            </Field>
          </div>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">목표 만들기</Button>
        <Button variant="outline" className="w-full">
          취소
        </Button>
      </CardFooter>
    </Card>
  )
}
