import { type Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { IconArrowRight } from "@tabler/icons-react"

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from "@/styles/base-nova/ui/button"

import { CardsDemo } from "./cards"

const title = "디자인 시스템의 바탕"
const description =
  "직접 고치고, 넓히고, 그 위에 쌓아 올릴 수 있는 잘 다듬어진 컴포넌트 모음입니다. 여기서 시작해 여러분의 것으로 만드세요. 열린 소스, 열린 코드."

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader className="md:**:[.container]:pb-8 lg:**:[.container]:pb-12">
        <PageHeaderHeading className="max-w-4xl">{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button
            className="h-[31px] rounded-lg"
            render={<Link href="/docs/components" />}
          >
            컴포넌트 보러 가기 <IconArrowRight data-icon="inline-end" />
          </Button>
        </PageActions>
      </PageHeader>
      <div className="container-wrapper flex-1 p-0">
        <div className="container overflow-hidden md:px-0 lg:max-w-none">
          <section className="-mx-4 w-[140vw] overflow-hidden md:hidden">
            <Image
              src="/images/full-light.png"
              width={2560}
              height={2764}
              alt="대시보드"
              className="block h-auto w-full dark:hidden"
              priority
            />
            <Image
              src="/images/full-dark.png"
              width={2560}
              height={2764}
              alt="대시보드"
              className="hidden h-auto w-full dark:block"
              priority
            />
          </section>
          <section className="hidden md:block">
            <CardsDemo />
          </section>
        </div>
      </div>
    </div>
  )
}
