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
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/registry/new-york-v4/ui/field"

const tasks = [
  {
    id: "push",
    label: "푸시 알림",
  },
  {
    id: "email",
    label: "이메일 알림",
  },
] as const

const formSchema = z.object({
  responses: z.boolean(),
  tasks: z
    .array(z.string())
    .min(1, "알림 종류를 하나 이상 골라 주세요.")
    .refine(
      (value) => value.every((task) => tasks.some((t) => t.id === task)),
      {
        message: "올바르지 않은 알림 종류입니다.",
      }
    ),
})

export default function FormTanstackCheckbox() {
  const form = useForm({
    defaultValues: {
      responses: true,
      tasks: [] as string[],
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
        <CardTitle>알림</CardTitle>
        <CardDescription>알림 설정을 관리합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-checkbox"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="responses"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <div>
                    <FieldSet>
                      <FieldLegend variant="label">응답</FieldLegend>
                      <FieldDescription>
                        조사나 이미지 생성처럼 시간이 걸리는 요청은 끝나면 알려
                        드립니다.
                      </FieldDescription>
                      <FieldGroup data-slot="checkbox-group">
                        <Field
                          orientation="horizontal"
                          data-invalid={isInvalid}
                        >
                          <Checkbox
                            id="form-tanstack-checkbox-responses"
                            name={field.name}
                            checked={field.state.value}
                            onCheckedChange={(checked) =>
                              field.handleChange(checked === true)
                            }
                            disabled
                          />
                          <FieldLabel
                            htmlFor="form-tanstack-checkbox-responses"
                            className="font-normal"
                          >
                            푸시 알림
                          </FieldLabel>
                        </Field>
                      </FieldGroup>
                    </FieldSet>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </div>
                )
              }}
            />
            <FieldSeparator />
            <form.Field
              name="tasks"
              mode="array"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldGroup>
                    <FieldSet data-invalid={isInvalid}>
                      <FieldLegend variant="label">작업</FieldLegend>
                      <FieldDescription>
                        Get notified when tasks you&apos;ve created have
                        updates.
                      </FieldDescription>
                      <FieldGroup data-slot="checkbox-group">
                        {tasks.map((task) => (
                          <Field
                            key={task.id}
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
                            <Checkbox
                              id={`form-tanstack-checkbox-${task.id}`}
                              name={field.name}
                              aria-invalid={isInvalid}
                              checked={field.state.value.includes(task.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.pushValue(task.id)
                                } else {
                                  const index = field.state.value.indexOf(
                                    task.id
                                  )
                                  if (index > -1) {
                                    field.removeValue(index)
                                  }
                                }
                              }}
                            />
                            <FieldLabel
                              htmlFor={`form-tanstack-checkbox-${task.id}`}
                              className="font-normal"
                            >
                              {task.label}
                            </FieldLabel>
                          </Field>
                        ))}
                      </FieldGroup>
                    </FieldSet>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldGroup>
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
          <Button type="submit" form="form-tanstack-checkbox">
            저장
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
