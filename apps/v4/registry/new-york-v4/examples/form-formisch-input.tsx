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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/registry/new-york-v4/ui/field"
import { Input } from "@/registry/new-york-v4/ui/input"

const FormSchema = v.object({
  username: v.pipe(
    v.string(),
    v.minLength(3, "사용자 이름은 3자 이상이어야 합니다."),
    v.maxLength(10, "사용자 이름은 10자를 넘을 수 없습니다."),
    v.regex(
      /^[a-zA-Z0-9_]+$/,
      "사용자 이름에는 영문자·숫자·밑줄만 쓸 수 있습니다."
    )
  ),
})

export default function FormFormischInput() {
  const form = useForm({
    schema: FormSchema,
    initialInput: {
      username: "",
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
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>프로필 설정</CardTitle>
        <CardDescription>아래에서 프로필 정보를 고칩니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form of={form} id="form-formisch-input" onSubmit={handleSubmit}>
          <FieldGroup>
            <FormischField of={form} path={["username"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel htmlFor="form-formisch-input-username">
                    사용자 이름
                  </FieldLabel>
                  <Input
                    {...field.props}
                    id="form-formisch-input-username"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="shadcn"
                    autoComplete="username"
                  />
                  <FieldDescription>
                    공개되는 표시 이름입니다. 3자에서 10자 사이여야 하고
                    영문자·숫자·밑줄만 쓸 수 있습니다.
                  </FieldDescription>
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
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
          <Button type="submit" form="form-formisch-input">
            저장
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
