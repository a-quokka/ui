import { Button } from "@/styles/base-nova/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/styles/base-nova/ui/button-group"

export default function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        복사
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        붙여넣기
      </Button>
    </ButtonGroup>
  )
}
