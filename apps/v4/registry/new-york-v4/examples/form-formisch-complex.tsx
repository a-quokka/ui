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

const FormSchema = v.object({
  plan: v.pipe(
    v.string(),
    v.minLength(1, "구독 플랜을 골라 주세요"),
    v.check(
      (value) => value === "basic" || value === "pro",
      "올바르지 않은 플랜입니다. 베이직이나 프로를 고르세요"
    )
  ),
  billingPeriod: v.pipe(v.string(), v.minLength(1, "결제 주기를 골라 주세요")),
  addons: v.pipe(
    v.array(v.string()),
    v.minLength(1, "추가 기능을 하나 이상 골라 주세요"),
    v.maxLength(3, "추가 기능은 최대 3개까지 고를 수 있습니다"),
    v.check(
      (value) => value.every((addon) => addons.some((a) => a.id === addon)),
      "올바르지 않은 추가 기능입니다"
    )
  ),
  emailNotifications: v.boolean(),
})

export default function FormFormischComplex() {
  const form = useForm({
    schema: FormSchema,
    initialInput: {
      plan: "basic",
      billingPeriod: "",
      addons: [],
      emailNotifications: false,
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
    <Card className="w-full max-w-sm">
      <CardHeader className="border-b">
        <CardTitle>거의 다 왔습니다.</CardTitle>
        <CardDescription>구독 플랜과 결제 주기를 고르세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form of={form} id="form-formisch-complex" onSubmit={handleSubmit}>
          <FieldGroup>
            <FormischField of={form} path={["plan"]}>
              {(field) => (
                <FieldSet data-invalid={field.errors !== null}>
                  <FieldLegend variant="label">구독 플랜</FieldLegend>
                  <FieldDescription>구독 플랜을 고르세요.</FieldDescription>
                  <RadioGroup
                    value={field.input ?? ""}
                    onValueChange={(value) => field.onChange(value)}
                    aria-invalid={field.errors !== null}
                  >
                    <FieldLabel htmlFor="form-formisch-complex-basic">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>베이직</FieldTitle>
                          <FieldDescription>
                            개인과 소규모 팀에 맞습니다
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                          value="basic"
                          id="form-formisch-complex-basic"
                        />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="form-formisch-complex-pro">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>프로</FieldTitle>
                          <FieldDescription>
                            요구가 큰 기업에 맞습니다
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                          value="pro"
                          id="form-formisch-complex-pro"
                        />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </FieldSet>
              )}
            </FormischField>
            <FieldSeparator />
            <FormischField of={form} path={["billingPeriod"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel htmlFor="form-formisch-complex-billingPeriod">
                    결제 주기
                  </FieldLabel>
                  <Select
                    value={field.input ?? ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger
                      id="form-formisch-complex-billingPeriod"
                      aria-invalid={field.errors !== null}
                    >
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
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>
            <FieldSeparator />
            <FormischField of={form} path={["addons"]}>
              {(field) => {
                const current = field.input ?? []
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
                          data-invalid={field.errors !== null}
                        >
                          <Checkbox
                            id={`form-formisch-complex-${addon.id}`}
                            aria-invalid={field.errors !== null}
                            checked={current.includes(addon.id)}
                            onCheckedChange={(checked) => {
                              field.onChange(
                                checked === true
                                  ? [...current, addon.id]
                                  : current.filter(
                                      (value) => value !== addon.id
                                    )
                              )
                            }}
                          />
                          <FieldContent>
                            <FieldLabel
                              htmlFor={`form-formisch-complex-${addon.id}`}
                            >
                              {addon.title}
                            </FieldLabel>
                            <FieldDescription>
                              {addon.description}
                            </FieldDescription>
                          </FieldContent>
                        </Field>
                      ))}
                    </FieldGroup>
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </FieldSet>
                )
              }}
            </FormischField>
            <FieldSeparator />
            <FormischField of={form} path={["emailNotifications"]}>
              {(field) => (
                <Field
                  orientation="horizontal"
                  data-invalid={field.errors !== null}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-formisch-complex-emailNotifications">
                      이메일 알림
                    </FieldLabel>
                    <FieldDescription>
                      구독 관련 소식을 이메일로 받습니다
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id="form-formisch-complex-emailNotifications"
                    checked={field.input ?? false}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    aria-invalid={field.errors !== null}
                  />
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
      <CardFooter className="border-t">
        <Field>
          <Button type="submit" form="form-formisch-complex">
            설정 저장
          </Button>
          <Button type="button" variant="outline" onClick={() => reset(form)}>
            초기화
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
