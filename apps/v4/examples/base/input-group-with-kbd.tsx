import { CheckIcon, InfoIcon, SearchIcon, SparklesIcon } from "lucide-react"

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
  InputGroupInput,
} from "@/styles/base-nova/ui/input-group"
import { Kbd, KbdGroup } from "@/styles/base-nova/ui/kbd"
import { Spinner } from "@/styles/base-nova/ui/spinner"

export function InputGroupWithKbd() {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="input-kbd-22">Kbd 가 있는 입력 그룹</FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-kbd-22" />
          <InputGroupAddon>
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput id="input-kbd-23" />
          <InputGroupAddon align="inline-end">
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput id="input-search-apps-24" placeholder="앱 검색..." />
          <InputGroupAddon align="inline-end">AI 에게 묻기</InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>Tab</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput
            id="input-search-type-25"
            placeholder="검색어를 입력하세요..."
          />
          <InputGroupAddon align="inline-start">
            <SparklesIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>C</Kbd>
            </KbdGroup>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-username-26">사용자 이름</FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-username-26" defaultValue="shadcn" />
          <InputGroupAddon align="inline-end">
            <div className="flex size-4 items-center justify-center rounded-full bg-green-500 dark:bg-green-800">
              <CheckIcon className="size-3 text-white" />
            </div>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription className="text-green-700">
          쓸 수 있는 사용자 이름입니다.
        </FieldDescription>
      </Field>
      <InputGroup>
        <InputGroupInput id="input-search-docs-27" placeholder="문서 검색..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled="true">
        <InputGroupInput
          id="input-search-disabled-28"
          placeholder="문서 검색..."
          disabled
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">비활성</InputGroupAddon>
      </InputGroup>
      <FieldGroup className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="input-group-11">이름</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-group-11" placeholder="이름" />
            <InputGroupAddon align="inline-end">
              <InfoIcon />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-group-12">성</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-group-12" placeholder="성" />
            <InputGroupAddon align="inline-end">
              <InfoIcon />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
      <Field data-disabled="true">
        <FieldLabel htmlFor="input-group-29">
          Loading (&quot;data-disabled=&quot;true&quot;)
        </FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-group-29" disabled defaultValue="shadcn" />
          <InputGroupAddon align="inline-end">
            <Spinner />
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>입력 그룹 설명입니다.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}
