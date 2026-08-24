import {
  ArrowUpIcon,
  CodeIcon,
  CopyIcon,
  InfoIcon,
  RefreshCwIcon,
} from "lucide-react"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import { Input } from "@/styles/base-nova/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/styles/base-nova/ui/input-group"
import { Textarea } from "@/styles/base-nova/ui/textarea"

export function InputGroupTextareaExamples() {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="textarea-header-footer-12">
          기본 Textarea (입력 그룹 없음)
        </FieldLabel>
        <Textarea
          id="textarea-header-footer-12"
          placeholder="여기에 내용을 입력하세요..."
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="textarea-header-footer-13">Input Group</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id="textarea-header-footer-13"
            placeholder="여기에 내용을 입력하세요..."
          />
        </InputGroup>
        <FieldDescription>입력 그룹 설명입니다.</FieldDescription>
      </Field>
      <Field data-invalid="true">
        <FieldLabel htmlFor="textarea-header-footer-14">오류</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id="textarea-header-footer-14"
            placeholder="여기에 내용을 입력하세요..."
            aria-invalid="true"
          />
        </InputGroup>
        <FieldDescription>입력 그룹 설명입니다.</FieldDescription>
      </Field>
      <Field data-disabled="true">
        <FieldLabel htmlFor="textarea-header-footer-15">비활성</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id="textarea-header-footer-15"
            placeholder="여기에 내용을 입력하세요..."
            disabled
          />
        </InputGroup>
        <FieldDescription>입력 그룹 설명입니다.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="prompt-31">애드온 (block-start)</FieldLabel>
        <InputGroup>
          <InputGroupTextarea id="prompt-31" />
          <InputGroupAddon align="block-start">
            <InputGroupText>묻거나, 찾거나, 대화하세요...</InputGroupText>
            <InfoIcon className="ml-auto text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>입력 그룹 설명입니다.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="textarea-header-footer-30">
          애드온 (block-end)
        </FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id="textarea-header-footer-30"
            placeholder="여기에 내용을 입력하세요..."
          />
          <InputGroupAddon align="block-end">
            <InputGroupText>0/280 characters</InputGroupText>
            <InputGroupButton
              variant="default"
              size="icon-xs"
              className="ml-auto rounded-full"
            >
              <ArrowUpIcon />
              <span className="sr-only">보내기</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="textarea-comment-31">애드온 (버튼)</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id="textarea-comment-31"
            placeholder="생각을 들려주세요..."
            className="min-h-[120px]"
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton variant="ghost" className="ml-auto" size="sm">
              취소
            </InputGroupButton>
            <InputGroupButton variant="default" size="sm">
              댓글 올리기
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="textarea-code-32">코드 편집기</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id="textarea-code-32"
            placeholder="console.log('Hello, world!');"
            className="min-h-[300px] py-3"
          />
          <InputGroupAddon align="block-start" className="border-b">
            <InputGroupText className="font-mono font-medium">
              <CodeIcon />
              script.js
            </InputGroupText>
            <InputGroupButton size="icon-xs" className="ml-auto">
              <RefreshCwIcon />
            </InputGroupButton>
            <InputGroupButton size="icon-xs" variant="ghost">
              <CopyIcon />
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupAddon align="block-end" className="border-t">
            <InputGroupText>1행 1열</InputGroupText>
            <InputGroupText className="ml-auto">JavaScript</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </FieldGroup>
  )
}
