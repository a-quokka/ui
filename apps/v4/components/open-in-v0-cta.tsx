import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/styles/base-nova/ui/button"

/**
 * 문서 우측 하단 카드.
 *
 * 원본은 Vercel 가입 페이지로 보내면서 링크에 shadcn 캠페인 파라미터
 * (utm_campaign=docs_cta_deploy_now_callout)를 달고 있었고, 본문에는
 * "Trusted by OpenAI, Sonos, Adobe" 같은 제3자 마케팅 문구가 들어 있었다.
 * 이 포크가 할 말이 아니고 남의 유입 추적을 대신 달아 줄 이유도 없어서
 * 설치 문서로 보내는 중립 문안으로 바꿨다.
 */
export function OpenInV0Cta({ className }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-2 rounded-2xl bg-surface p-6 text-sm text-surface-foreground",
        className
      )}
    >
      <div className="text-base leading-tight font-semibold text-balance group-hover:underline">
        복사해서 바로 쓰세요
      </div>
      <div className="text-muted-foreground">
        컴포넌트는 라이브러리가 아니라 소스입니다.
      </div>
      <div className="text-muted-foreground">
        프로젝트 안으로 가져온 뒤 원하는 대로 고쳐 쓰면 됩니다.
      </div>
      <Button variant="outline" size="sm" className="mt-2 w-fit">
        설치 방법
      </Button>
      <Link href="/docs/installation" className="absolute inset-0">
        <span className="sr-only">설치 문서로 이동</span>
      </Link>
    </div>
  )
}
