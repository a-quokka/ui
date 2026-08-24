import { Markdown } from "@/components/markdown"
import { Bubble, BubbleContent } from "@/styles/base-rhea/ui/bubble"
import { Message, MessageContent } from "@/styles/base-rhea/ui/message"

const response = `Here's how to render markdown in a message:

1. Render assistant text through **Markdown**.
2. Keep user messages as plain text.
3. Use a \`ghost\` bubble so the response is unframed.
`

export function MessageMarkdownDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>
              메시지에서 마크다운은 어떻게 그리나요?
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <Bubble variant="ghost">
            <BubbleContent>
              <Markdown>{response}</Markdown>
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  )
}
