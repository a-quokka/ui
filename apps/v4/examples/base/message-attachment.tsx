"use client"

import { DownloadIcon, FileTextIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/styles/base-rhea/ui/attachment"
import { Bubble, BubbleContent } from "@/styles/base-rhea/ui/bubble"
import { Message, MessageContent } from "@/styles/base-rhea/ui/message"

export function MessageAttachmentDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Message align="end">
        <MessageContent>
          <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                alt="워크스페이스"
              />
            </AttachmentMedia>
          </Attachment>
          <Bubble>
            <BubbleContent>
              이미지예요. PDF 에 넣어 줄래요? 표지로 쓰면 좋겠어요.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              됐습니다. 이미지를 표지로 넣은 PDF 예요.
            </BubbleContent>
          </Bubble>
          <Attachment>
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                type="button"
                title="내려받기"
                aria-label="내려받기"
                size="icon-sm"
                variant="secondary"
              >
                <DownloadIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>고마워요. 좋네요.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  )
}
