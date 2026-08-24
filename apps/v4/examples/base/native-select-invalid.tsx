import {
  NativeSelect,
  NativeSelectOption,
} from "@/styles/base-nova/ui/native-select"

export function NativeSelectInvalid() {
  return (
    <NativeSelect aria-invalid="true">
      <NativeSelectOption value="">오류 상태</NativeSelectOption>
      <NativeSelectOption value="apple">사과</NativeSelectOption>
      <NativeSelectOption value="banana">바나나</NativeSelectOption>
      <NativeSelectOption value="blueberry">블루베리</NativeSelectOption>
    </NativeSelect>
  )
}
