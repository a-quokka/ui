/* eslint-disable react/no-children-prop */
"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

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

const formSchema = z.object({
  username: z
    .string()
    .min(3, "사용자 이름은 3자 이상이어야 합니다.")
    .max(10, "사용자 이름은 10자를 넘을 수 없습니다.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "사용자 이름에는 영문자·숫자·밑줄만 쓸 수 있습니다."
    ),
})

export default function FormTanstackInput() {
  const form = useForm({
    defaultValues: {
      username: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast("아래 값을 제출했습니다.", {
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
            <code>{JSON.stringify(value, null, 2)}</code>
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
    },
  })

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>프로필 설정</CardTitle>
        <CardDescription>아래에서 프로필 정보를 고칩니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-input"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="username"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="form-tanstack-input-username">
                      사용자 이름
                    </FieldLabel>
                    <Input
                      id="form-tanstack-input-username"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="shadcn"
                      autoComplete="username"
                    />
                    <FieldDescription>
                      공개되는 표시 이름입니다. 3자에서 10자 사이여야 하고
                      영문자·숫자·밑줄만 쓸 수 있습니다.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            초기화
          </Button>
          <Button type="submit" form="form-tanstack-input">
            저장
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
