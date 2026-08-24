"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Bubble, BubbleContent } from "@/styles/base-rhea/ui/bubble"
import { Button } from "@/styles/base-rhea/ui/button"
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/styles/base-rhea/ui/collapsible"

const text = `접근성 검토에서 다크 모드에서 너무 흐릿한 포커스 상태 두 개를 찾았습니다.

대화 상자·메뉴·드로어 경로를 모두 봤습니다. 셋 다 겹쳐진 면 위에 포커스를 받는 요소를 그리기 때문입니다.

대화 상자와 드로어는 괜찮습니다. 메뉴는 hover 와 focus 토큰을 나눠서 포인터가 없을 때도 키보드 포커스가 보이게 해야 합니다.

그리고 이 변경은 프리미티브가 아니라 스타일 파일에 두기를 권합니다. 그래야 다른 테마가 나중에 저마다의 포커스 처리를 고를 수 있습니다.`

const previewLength = 180

export function BubbleCollapsible() {
  const [open, setOpen] = React.useState(false)
  const isLong = text.length > previewLength
  const preview = `${text.slice(0, previewLength)}...`

  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Bubble variant="muted">
        <BubbleContent>무엇을 도와드릴까요?</BubbleContent>
      </Bubble>

      <Bubble variant="muted" align="end">
        <BubbleContent className="whitespace-pre-line">
          <Collapsible open={open} onOpenChange={setOpen}>
            <div>{open || !isLong ? text : preview}</div>
            {isLong ? (
              <CollapsibleTrigger
                render={
                  <Button
                    variant="link"
                    className="gap-1 p-0 text-muted-foreground"
                  />
                }
              >
                {open ? "Show less" : "Show more"}
                <ChevronDownIcon
                  data-icon="inline-end"
                  className="group-data-panel-open/button:rotate-180"
                />
              </CollapsibleTrigger>
            ) : null}
          </Collapsible>
        </BubbleContent>
      </Bubble>
    </div>
  )
}
