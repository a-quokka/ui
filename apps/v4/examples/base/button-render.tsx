import { buttonVariants } from "@/styles/base-nova/ui/button"

export default function ButtonRender() {
  return (
    <a
      href="#"
      className={buttonVariants({ variant: "secondary", size: "sm" })}
    >
      로그인
    </a>
  )
}
