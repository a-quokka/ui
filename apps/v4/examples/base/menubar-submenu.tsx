import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/styles/base-nova/ui/menubar"

export function MenubarSubmenu() {
  return (
    <Menubar className="w-72">
      <MenubarMenu>
        <MenubarTrigger>파일</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>공유</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>링크 메일로 보내기</MenubarItem>
              <MenubarItem>메시지</MenubarItem>
              <MenubarItem>메모</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            인쇄... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>편집</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            실행 취소 <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            다시 실행 <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>찾기</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>찾기...</MenubarItem>
              <MenubarItem>다음 찾기</MenubarItem>
              <MenubarItem>이전 찾기</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>잘라내기</MenubarItem>
          <MenubarItem>복사</MenubarItem>
          <MenubarItem>붙여넣기</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
