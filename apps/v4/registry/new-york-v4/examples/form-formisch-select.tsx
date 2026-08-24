"use client"

import * as React from "react"
import { Form, Field as FormischField, reset, useForm } from "@formisch/react"
import type { SubmitHandler } from "@formisch/react"
import { toast } from "sonner"
import * as v from "valibot"

import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/registry/new-york-v4/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"

const spokenLanguages = [
  { label: "영어", value: "en" },
  { label: "스페인어", value: "es" },
  { label: "프랑스어", value: "fr" },
  { label: "독일어", value: "de" },
  { label: "이탈리아어", value: "it" },
  { label: "중국어", value: "zh" },
  { label: "일본어", value: "ja" },
] as const

const FormSchema = v.object({
  language: v.pipe(
    v.string(),
    v.minLength(1, "사용 언어를 골라 주세요."),
    v.check(
      (value) => value !== "auto",
      "자동 감지는 쓸 수 없습니다. 언어를 직접 고르세요."
    )
  ),
})

export default function FormFormischSelect() {
  const form = useForm({
    schema: FormSchema,
    initialInput: {
      language: "",
    },
  })

  const handleSubmit: SubmitHandler<typeof FormSchema> = (output) => {
    toast("아래 값을 제출했습니다.", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(output, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <Card className="w-full sm:max-w-lg">
      <CardHeader>
        <CardTitle>언어 설정</CardTitle>
        <CardDescription>주로 쓰는 언어를 고르세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form of={form} id="form-formisch-select" onSubmit={handleSubmit}>
          <FieldGroup>
            <FormischField of={form} path={["language"]}>
              {(field) => (
                <Field
                  orientation="responsive"
                  data-invalid={field.errors !== null}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-formisch-select-language">
                      사용 언어
                    </FieldLabel>
                    <FieldDescription>
                      실제로 말하는 언어를 고르면 결과가 가장 좋습니다.
                    </FieldDescription>
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </FieldContent>
                  <Select
                    value={field.input ?? ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger
                      id="form-formisch-select-language"
                      aria-invalid={field.errors !== null}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">자동</SelectItem>
                      <SelectSeparator />
                      {spokenLanguages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            </FormischField>
          </FieldGroup>
        </Form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => reset(form)}>
            초기화
          </Button>
          <Button type="submit" form="form-formisch-select">
            저장
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
