"use client"

import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/styles/base-nova/ui/button"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/styles/base-nova/ui/questionnaire"

const items = [
  { name: "change", required: true },
  { name: "verification", required: true },
  { name: "notes" },
] as const

export function QuestionnaireResume() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const answers = {
      change: formData.get("change"),
      verification: formData.getAll("verification"),
      notes: formData.get("notes"),
    }

    toast("임시 저장을 갱신했습니다", {
      description: `Migration: ${answers.change ?? "None"} · Verification: ${answers.verification.join(", ") || "None"} · Notes: ${answers.notes || "None"}`,
    })
  }

  return (
    <Questionnaire
      className="mx-auto max-w-md"
      defaultItem="verification"
      items={items}
      onReset={() => toast("저장해 둔 답을 되살렸습니다")}
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem name="change" required>
        <QuestionnaireTitle>어떤 종류의 마이그레이션인가요?</QuestionnaireTitle>
        <QuestionnaireDescription>
          이 답변은 지난번에 저장된 것입니다.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="incremental" defaultChecked>
            점진적 마이그레이션
          </QuestionnaireChoice>
          <QuestionnaireChoice value="cutover">
            한 번에 전환
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="verification" multiple required>
        <QuestionnaireTitle>
          마이그레이션을 어떻게 검증할까요?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          이 검사들은 지난번에 골라 둔 것입니다.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="tests" defaultChecked>
            마이그레이션 테스트를 돌린다
          </QuestionnaireChoice>
          <QuestionnaireChoice value="typecheck" defaultChecked>
            타입 검사를 돌린다
          </QuestionnaireChoice>
          <QuestionnaireChoice value="manual">
            직접 훑어보며 확인한다
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="notes">
        <QuestionnaireTitle>
          에이전트가 더 기억해야 할 것이 있나요?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          이 메모는 임시 저장과 함께 보관됐습니다.
        </QuestionnaireDescription>
        <QuestionnaireInput
          aria-label="저장된 마이그레이션 메모"
          defaultValue="Keep the existing public API stable."
        />
      </QuestionnaireItem>

      <QuestionnaireActions>
        <Button type="reset" variant="outline">
          변경 되돌리기
        </Button>
        <QuestionnairePrevious />
        <QuestionnaireNext>다음</QuestionnaireNext>
        <QuestionnaireSubmit>임시 저장 갱신</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
