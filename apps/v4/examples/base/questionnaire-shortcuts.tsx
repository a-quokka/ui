"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  NativeSelect,
  NativeSelectOption,
} from "@/styles/base-nova/ui/native-select"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/styles/base-nova/ui/questionnaire"

const items = [
  {
    choices: [{ value: "inspect" }, { value: "tests" }, { value: "patch" }],
    name: "action",
    required: true,
  },
] as const

type ShortcutMode = React.ComponentProps<typeof Questionnaire>["shortcuts"]

export function QuestionnaireShortcuts() {
  const [shortcuts, setShortcuts] = React.useState<ShortcutMode>("letters")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const action = new FormData(event.currentTarget).get("action")

    toast("Next action selected", {
      description: `Action: ${action ?? "None"} · Shortcuts: ${shortcuts ?? "none"}`,
    })
  }

  return (
    <div className="relative mx-auto flex h-full w-full max-w-md flex-col">
      <NativeSelect
        aria-label="단축키 방식"
        className="absolute end-0 top-0"
        value={shortcuts ?? "none"}
        onChange={(event) => {
          const value = event.target.value
          setShortcuts(
            value === "letters" || value === "numbers" ? value : undefined
          )
        }}
      >
        <NativeSelectOption value="none">단축키 없음</NativeSelectOption>
        <NativeSelectOption value="letters">글자</NativeSelectOption>
        <NativeSelectOption value="numbers">숫자</NativeSelectOption>
      </NativeSelect>

      <Questionnaire
        className="mt-auto"
        items={items}
        shortcuts={shortcuts}
        onSubmit={handleSubmit}
      >
        <QuestionnaireItem name="action" required>
          <QuestionnaireTitle>
            에이전트가 다음에 무엇을 할까요?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            표시된 단축키를 쓰거나 키보드로 이동하세요.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="inspect">
              구현을 살펴본다
            </QuestionnaireChoice>
            <QuestionnaireChoice value="tests">
              관련 테스트를 돌린다
            </QuestionnaireChoice>
            <QuestionnaireChoice value="patch">
              패치를 준비한다
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnaireSubmit>동작 확인</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}
