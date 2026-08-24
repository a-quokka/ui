"use client"

import * as React from "react"
import { toast } from "sonner"
import { z } from "zod"

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/styles/base-nova/ui/card"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/styles/base-nova/ui/questionnaire"

const items = [
  { name: "detail", required: true },
  { name: "audience", required: true },
] as const

const questionnaireSchema = z
  .object({
    detail: z.enum(["summary", "complete"]),
    audience: z.enum(["team", "public"]),
  })
  .superRefine((answers, context) => {
    if (answers.audience === "public" && answers.detail === "summary") {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "공개 답변에는 맥락이 충분해야 합니다. 완전한 답변을 고르세요.",
        path: ["detail"],
      })
    }
  })

type QuestionnaireItemName = keyof z.infer<typeof questionnaireSchema>
type QuestionnaireErrors = Partial<Record<QuestionnaireItemName, string>>

function ValidationProgress() {
  return (
    <QuestionnaireProgress
      className="min-w-0"
      render={(props, state) => (
        <div {...props}>
          {state.current} / {state.total}
        </div>
      )}
    />
  )
}

export function QuestionnaireValidation() {
  const [item, setItem] = React.useState("detail")
  const [errors, setErrors] = React.useState<QuestionnaireErrors>({})

  function clearError(name: QuestionnaireItemName) {
    setErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors
      }

      const nextErrors = { ...currentErrors }
      delete nextErrors[name]
      return nextErrors
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = questionnaireSchema.safeParse(
      Object.fromEntries(new FormData(event.currentTarget))
    )

    if (result.success) {
      setErrors({})
      toast("Agent response configured", {
        description: `Detail: ${result.data.detail} · Audience: ${result.data.audience}`,
      })
      return
    }

    const nextErrors: QuestionnaireErrors = {}

    for (const issue of result.error.issues) {
      const name = issue.path[0]

      if ((name === "detail" || name === "audience") && !nextErrors[name]) {
        nextErrors[name] = issue.message
      }
    }

    const firstInvalidItem = result.error.issues[0]?.path[0]

    setErrors(nextErrors)

    if (firstInvalidItem === "detail" || firstInvalidItem === "audience") {
      setItem(firstInvalidItem)
    }
  }

  return (
    <Questionnaire
      className="mx-auto max-w-md"
      item={item}
      items={items}
      onItemChange={setItem}
      onSubmit={handleSubmit}
    >
      <Card className="w-full">
        <QuestionnaireItem
          invalid={Boolean(errors.detail)}
          name="detail"
          required
        >
          <CardHeader>
            <QuestionnaireTitle>
              답변을 얼마나 자세히 쓸까요?
            </QuestionnaireTitle>
            <QuestionnaireDescription>
              답변의 깊이를 고르세요.
            </QuestionnaireDescription>
            <CardAction>
              <ValidationProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice
                value="summary"
                onChange={() => clearError("detail")}
              >
                간결한 요약
              </QuestionnaireChoice>
              <QuestionnaireChoice
                value="complete"
                onChange={() => clearError("detail")}
              >
                완전한 답변
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError>{errors.detail}</QuestionnaireError>
          </CardContent>
        </QuestionnaireItem>

        <QuestionnaireItem
          invalid={Boolean(errors.audience)}
          name="audience"
          required
        >
          <CardHeader>
            <QuestionnaireTitle>이 답변을 누가 읽나요?</QuestionnaireTitle>
            <QuestionnaireDescription>
              공개 답변에는 맥락이 온전히 담겨야 합니다.
            </QuestionnaireDescription>
            <CardAction>
              <ValidationProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice
                value="team"
                onChange={() => clearError("audience")}
              >
                우리 팀
              </QuestionnaireChoice>
              <QuestionnaireChoice
                value="public"
                onChange={() => clearError("audience")}
              >
                공개
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError>{errors.audience}</QuestionnaireError>
          </CardContent>
        </QuestionnaireItem>

        <CardFooter>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireNext>다음</QuestionnaireNext>
            <QuestionnaireSubmit>답변 검증</QuestionnaireSubmit>
          </QuestionnaireActions>
        </CardFooter>
      </Card>
    </Questionnaire>
  )
}
