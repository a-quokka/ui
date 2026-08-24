import { ExternalLinkIcon, MailIcon } from "lucide-react"

import { Button } from "@/styles/base-nova/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/base-nova/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/styles/base-nova/ui/field"
import { Input } from "@/styles/base-nova/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/styles/base-nova/ui/input-group"

export function InputGroupInCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>입력 그룹이 있는 카드</CardTitle>
        <CardDescription>입력 그룹이 들어간 카드입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email-input">이메일 주소</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="email-input"
                type="email"
                placeholder="you@example.com"
              />
              <InputGroupAddon align="inline-end">
                <MailIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="website-input">웹사이트 주소</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput id="website-input" placeholder="example.com" />
              <InputGroupAddon align="inline-end">
                <ExternalLinkIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="feedback-textarea">의견 · 댓글</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                id="feedback-textarea"
                placeholder="생각을 들려주세요..."
                className="min-h-[100px]"
              />
              <InputGroupAddon align="block-end">
                <InputGroupText>0/500 characters</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">취소</Button>
        <Button>제출</Button>
      </CardFooter>
    </Card>
  )
}
