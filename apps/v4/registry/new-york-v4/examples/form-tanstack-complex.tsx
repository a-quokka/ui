/* eslint-disable react/no-children-prop */
"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/registry/new-york-v4/ui/button"
import { Card, CardContent, CardFooter } from "@/registry/new-york-v4/ui/card"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/registry/new-york-v4/ui/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/new-york-v4/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"
import { Switch } from "@/registry/new-york-v4/ui/switch"

const addons = [
  {
    id: "analytics",
    title: "분석",
    description: "고급 분석과 보고서",
  },
  {
    id: "backup",
    title: "백업",
    description: "매일 자동 백업",
  },
  {
    id: "support",
    title: "우선 지원",
    description: "24시간 프리미엄 고객 지원",
  },
] as const

const formSchema = z.object({
  plan: z
    .string({
      required_error: "구독 플랜을 골라 주세요",
    })
    .min(1, "구독 플랜을 골라 주세요")
    .refine((value) => value === "basic" || value === "pro", {
      message: "올바르지 않은 플랜입니다. 베이직이나 프로를 고르세요",
    }),
  billingPeriod: z
    .string({
      required_error: "결제 주기를 골라 주세요",
    })
    .min(1, "결제 주기를 골라 주세요"),
  addons: z
    .array(z.string())
    .min(1, "추가 기능을 하나 이상 골라 주세요")
    .max(3, "추가 기능은 최대 3개까지 고를 수 있습니다")
    .refine(
      (value) => value.every((addon) => addons.some((a) => a.id === addon)),
      {
        message: "올바르지 않은 추가 기능입니다",
      }
    ),
  emailNotifications: z.boolean(),
})

export default function FormTanstackComplex() {
  const form = useForm({
    defaultValues: {
      plan: "basic",
      billingPeriod: "monthly",
      addons: [] as string[],
      emailNotifications: false,
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
    <Card className="w-full max-w-sm">
      <CardContent>
        <form
          id="subscription-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="plan"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet>
                    <FieldLegend>구독 플랜</FieldLegend>
                    <FieldDescription>구독 플랜을 고르세요.</FieldDescription>
                    <RadioGroup
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <FieldLabel htmlFor="basic">
                        <Field
                          orientation="horizontal"
                          data-invalid={isInvalid}
                        >
                          <FieldContent>
                            <FieldTitle>베이직</FieldTitle>
                            <FieldDescription>
                              개인과 소규모 팀에 맞습니다
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            value="basic"
                            id="basic"
                            aria-invalid={isInvalid}
                          />
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="pro">
                        <Field
                          orientation="horizontal"
                          data-invalid={isInvalid}
                        >
                          <FieldContent>
                            <FieldTitle>프로</FieldTitle>
                            <FieldDescription>
                              요구가 큰 기업에 맞습니다
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            value="pro"
                            id="pro"
                            aria-invalid={isInvalid}
                          />
                        </Field>
                      </FieldLabel>
                    </RadioGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldSet>
                )
              }}
            />
            <FieldSeparator />
            <form.Field
              name="billingPeriod"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>결제 주기</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      aria-invalid={isInvalid}
                    >
                      <SelectTrigger id={field.name}>
                        <SelectValue placeholder="선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">월 결제</SelectItem>
                        <SelectItem value="yearly">연 결제</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      얼마나 자주 결제할지 고르세요.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <FieldSeparator />
            <form.Field
              name="addons"
              mode="array"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet>
                    <FieldLegend>추가 기능</FieldLegend>
                    <FieldDescription>
                      함께 쓸 기능을 고르세요.
                    </FieldDescription>
                    <FieldGroup data-slot="checkbox-group">
                      {addons.map((addon) => (
                        <Field
                          key={addon.id}
                          orientation="horizontal"
                          data-invalid={isInvalid}
                        >
                          <Checkbox
                            id={addon.id}
                            name={field.name}
                            aria-invalid={isInvalid}
                            checked={field.state.value.includes(addon.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.pushValue(addon.id)
                              } else {
                                const index = field.state.value.indexOf(
                                  addon.id
                                )
                                if (index > -1) {
                                  field.removeValue(index)
                                }
                              }
                            }}
                          />
                          <FieldContent>
                            <FieldLabel htmlFor={addon.id}>
                              {addon.title}
                            </FieldLabel>
                            <FieldDescription>
                              {addon.description}
                            </FieldDescription>
                          </FieldContent>
                        </Field>
                      ))}
                    </FieldGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldSet>
                )
              }}
            />
            <FieldSeparator />
            <form.Field
              name="emailNotifications"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field orientation="horizontal" data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>이메일 알림</FieldLabel>
                      <FieldDescription>
                        구독 관련 소식을 이메일로 받습니다
                      </FieldDescription>
                    </FieldContent>
                    <Switch
                      id={field.name}
                      name={field.name}
                      checked={field.state.value}
                      onCheckedChange={field.handleChange}
                      aria-invalid={isInvalid}
                    />
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
        <Field orientation="horizontal" className="justify-end">
          <Button type="submit" form="subscription-form">
            설정 저장
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
