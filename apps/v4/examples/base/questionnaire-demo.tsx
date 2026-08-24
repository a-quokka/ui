"use client"

import * as React from "react"
import { toast } from "sonner"

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
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/styles/base-nova/ui/questionnaire"

const questionnaireItems = [
  {
    choices: [
      {
        description:
          "에이전트가 무엇을 실행했고 무엇이 돌아왔는지 보여 줍니다.",
        label: "도구 호출 타임라인",
        value: "tool-calls",
      },
      {
        description: "민감하거나 되돌릴 수 없는 동작 전에 물어봅니다.",
        label: "승인 지점",
        value: "approvals",
      },
      {
        description: "맡긴 일과 그 결과를 따라가기 쉽게 만듭니다.",
        label: "서브 에이전트 인계",
        value: "handoffs",
      },
    ],
    description: "방향을 고르거나 다른 작업을 적어 주세요.",
    input: {
      label: "다른 에이전트 기능",
      placeholder: "다른 기능을 적어 주세요…",
    },
    name: "direction",
    required: true,
    title: "에이전트가 다음으로 만들 것은 무엇인가요?",
  },
  {
    choices: [
      { label: "진행 상황", value: "progress" },
      { label: "결정 사항", value: "decisions" },
      { label: "위험 요소", value: "risks" },
      { label: "다음 단계", value: "next-step" },
    ],
    description: "해당하는 것을 모두 고르거나 건너뛰세요.",
    multiple: true,
    name: "signals",
    required: false,
    title: "진행 보고에 무엇이 꼭 들어가야 하나요?",
  },
  {
    choices: [
      { label: "지금 시작", value: "now" },
      { label: "다음 개발 주기", value: "next-cycle" },
      { label: "백로그에 추가", value: "backlog" },
    ],
    description: "에이전트가 언제 작업을 시작할지 고르세요.",
    name: "timing",
    required: true,
    title: "작업은 언제 시작할까요?",
  },
] as const

export function QuestionnaireDemo() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const answers = {
      direction: formData.get("direction"),
      signals: formData.getAll("signals"),
      timing: formData.get("timing"),
    }

    toast("에이전트 계획을 저장했습니다", {
      description: `방향: ${answers.direction ?? "없음"} · 진행 보고 항목: ${answers.signals.join(", ") || "없음"} · 시작 시점: ${answers.timing ?? "없음"}`,
    })
  }

  return (
    <Questionnaire
      className="mx-auto max-w-md"
      defaultItem="direction"
      items={questionnaireItems}
      shortcuts="letters"
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />
      {questionnaireItems.map((question) => (
        <QuestionnaireItem
          key={question.name}
          multiple={"multiple" in question && question.multiple}
          name={question.name}
          required={question.required}
        >
          <QuestionnaireTitle>{question.title}</QuestionnaireTitle>
          <QuestionnaireDescription>
            {question.description}
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            {question.choices.map((choice) => (
              <QuestionnaireChoice key={choice.value} value={choice.value}>
                <span className="font-medium">{choice.label}</span>
                {"description" in choice ? (
                  <span className="text-muted-foreground">
                    {choice.description}
                  </span>
                ) : null}
              </QuestionnaireChoice>
            ))}
            {"input" in question ? (
              <QuestionnaireInput
                aria-label={question.input.label}
                placeholder={question.input.placeholder}
              />
            ) : null}
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
      ))}
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext>다음</QuestionnaireNext>
        <QuestionnaireSubmit>계획 저장</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
