"use client"

import * as React from "react"
import {
  FieldArray,
  Form,
  Field as FormischField,
  insert,
  remove,
  reset,
  useForm,
} from "@formisch/react"
import type { SubmitHandler } from "@formisch/react"
import { XIcon } from "lucide-react"
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
  FieldLegend,
  FieldSet,
} from "@/registry/new-york-v4/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/new-york-v4/ui/input-group"

const FormSchema = v.object({
  emails: v.pipe(
    v.array(
      v.object({
        address: v.pipe(
          v.string(),
          v.nonEmpty("Enter an email address."),
          v.email("올바른 이메일 주소를 입력하세요.")
        ),
      })
    ),
    v.minLength(1, "이메일 주소를 하나 이상 더하세요."),
    v.maxLength(5, "이메일 주소는 최대 5개까지 더할 수 있습니다.")
  ),
})

export default function FormFormischArray() {
  const form = useForm({
    schema: FormSchema,
    initialInput: {
      emails: [{ address: "" }, { address: "" }],
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
      <CardHeader className="border-b">
        <CardTitle>연락용 이메일</CardTitle>
        <CardDescription>연락받을 이메일 주소를 관리합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form of={form} id="form-formisch-array" onSubmit={handleSubmit}>
          <FieldArray of={form} path={["emails"]}>
            {(fieldArray) => (
              <FieldSet className="gap-4">
                <FieldLegend variant="label">이메일 주소</FieldLegend>
                <FieldDescription>
                  연락받을 이메일 주소를 최대 5개까지 더할 수 있습니다.
                </FieldDescription>
                <FieldGroup className="gap-4">
                  {fieldArray.items.map((item, index) => (
                    <FormischField
                      key={item}
                      of={form}
                      path={["emails", index, "address"]}
                    >
                      {(field) => (
                        <Field
                          orientation="horizontal"
                          data-invalid={field.errors !== null}
                        >
                          <FieldContent>
                            <InputGroup>
                              <InputGroupInput
                                {...field.props}
                                id={`form-formisch-array-email-${index}`}
                                value={field.input ?? ""}
                                aria-invalid={field.errors !== null}
                                placeholder="name@example.com"
                                type="email"
                                autoComplete="email"
                              />
                              {fieldArray.items.length > 1 && (
                                <InputGroupAddon align="inline-end">
                                  <InputGroupButton
                                    type="button"
                                    variant="ghost"
                                    size="icon-xs"
                                    onClick={() =>
                                      remove(form, {
                                        path: ["emails"],
                                        at: index,
                                      })
                                    }
                                    aria-label={`Remove email ${index + 1}`}
                                  >
                                    <XIcon />
                                  </InputGroupButton>
                                </InputGroupAddon>
                              )}
                            </InputGroup>
                            {field.errors && (
                              <FieldError
                                errors={field.errors.map((message) => ({
                                  message,
                                }))}
                              />
                            )}
                          </FieldContent>
                        </Field>
                      )}
                    </FormischField>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      insert(form, {
                        path: ["emails"],
                        initialInput: { address: "" },
                      })
                    }
                    disabled={fieldArray.items.length >= 5}
                  >
                    이메일 주소 추가
                  </Button>
                </FieldGroup>
                {fieldArray.errors && (
                  <FieldError
                    errors={fieldArray.errors.map((message) => ({ message }))}
                  />
                )}
              </FieldSet>
            )}
          </FieldArray>
        </Form>
      </CardContent>
      <CardFooter className="border-t">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => reset(form)}>
            초기화
          </Button>
          <Button type="submit" form="form-formisch-array">
            저장
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
