import {
  NativeSelect,
  NativeSelectOption,
} from "@/styles/base-nova/ui/native-select"

export function NativeSelectDisabled() {
  return (
    <NativeSelect disabled>
      <NativeSelectOption value="">비활성</NativeSelectOption>
      <NativeSelectOption value="apple">사과</NativeSelectOption>
      <NativeSelectOption value="banana">바나나</NativeSelectOption>
      <NativeSelectOption value="blueberry">블루베리</NativeSelectOption>
    </NativeSelect>
  )
}
