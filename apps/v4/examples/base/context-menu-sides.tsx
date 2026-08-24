import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/styles/base-nova/ui/context-menu"

export function ContextMenuSides() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
          <span className="hidden pointer-fine:inline-block">
            오른쪽 클릭 (위)
          </span>
          <span className="hidden pointer-coarse:inline-block">
            길게 누르기 (위)
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent side="top">
          <ContextMenuGroup>
            <ContextMenuItem>뒤로</ContextMenuItem>
            <ContextMenuItem>앞으로</ContextMenuItem>
            <ContextMenuItem>새로 고침</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
          <span className="hidden pointer-fine:inline-block">
            오른쪽 클릭 (오른쪽)
          </span>
          <span className="hidden pointer-coarse:inline-block">
            길게 누르기 (오른쪽)
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent side="right">
          <ContextMenuGroup>
            <ContextMenuItem>뒤로</ContextMenuItem>
            <ContextMenuItem>앞으로</ContextMenuItem>
            <ContextMenuItem>새로 고침</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
          <span className="hidden pointer-fine:inline-block">
            오른쪽 클릭 (아래)
          </span>
          <span className="hidden pointer-coarse:inline-block">
            길게 누르기 (아래)
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent side="bottom">
          <ContextMenuGroup>
            <ContextMenuItem>뒤로</ContextMenuItem>
            <ContextMenuItem>앞으로</ContextMenuItem>
            <ContextMenuItem>새로 고침</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
          <span className="hidden pointer-fine:inline-block">
            오른쪽 클릭 (왼쪽)
          </span>
          <span className="hidden pointer-coarse:inline-block">
            길게 누르기 (왼쪽)
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent side="left">
          <ContextMenuGroup>
            <ContextMenuItem>뒤로</ContextMenuItem>
            <ContextMenuItem>앞으로</ContextMenuItem>
            <ContextMenuItem>새로 고침</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
