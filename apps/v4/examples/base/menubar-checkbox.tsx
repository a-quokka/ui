import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/styles/base-nova/ui/menubar"

export function MenubarCheckbox() {
  return (
    <Menubar className="w-72">
      <MenubarMenu>
        <MenubarTrigger>보기</MenubarTrigger>
        <MenubarContent className="w-64">
          <MenubarCheckboxItem>항상 북마크 바 표시</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>항상 전체 URL 표시</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            새로 고침 <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            강제 새로 고침 <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>서식</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>취소선</MenubarCheckboxItem>
          <MenubarCheckboxItem>코드</MenubarCheckboxItem>
          <MenubarCheckboxItem>위 첨자</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
