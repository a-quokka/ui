import { PlusIcon } from "lucide-react"

import { Button } from "@/styles/base-nova/ui/button"
import { ButtonGroup } from "@/styles/base-nova/ui/button-group"

export default function ButtonGroupSize() {
  return (
    <div className="flex flex-col items-start gap-8">
      <ButtonGroup>
        <Button variant="outline" size="sm">
          작게
        </Button>
        <Button variant="outline" size="sm">
          버튼
        </Button>
        <Button variant="outline" size="sm">
          그룹
        </Button>
        <Button variant="outline" size="icon-sm">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">기본</Button>
        <Button variant="outline">버튼</Button>
        <Button variant="outline">그룹</Button>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">
          크게
        </Button>
        <Button variant="outline" size="lg">
          버튼
        </Button>
        <Button variant="outline" size="lg">
          그룹
        </Button>
        <Button variant="outline" size="icon-lg">
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  )
}
