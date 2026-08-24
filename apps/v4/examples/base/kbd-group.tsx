import { Kbd, KbdGroup } from "@/styles/base-nova/ui/kbd"

export default function KbdGroupExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        <KbdGroup>
          <Kbd>Ctrl + B</Kbd>
          <Kbd>Ctrl + K</Kbd>
        </KbdGroup>{" "}
        로 명령 팔레트를 엽니다
      </p>
    </div>
  )
}
