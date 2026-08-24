import { Button } from "@/styles/base-nova/ui/button"
import { Kbd } from "@/styles/base-nova/ui/kbd"

export default function KbdButton() {
  return (
    <Button variant="outline">
      수락{" "}
      <Kbd data-icon="inline-end" className="translate-x-0.5">
        ⏎
      </Kbd>
    </Button>
  )
}
