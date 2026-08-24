import {
  NativeSelect,
  NativeSelectOption,
} from "@/styles/base-nova/ui/native-select"

export default function NativeSelectDemo() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">상태 선택</NativeSelectOption>
      <NativeSelectOption value="todo">할 일</NativeSelectOption>
      <NativeSelectOption value="in-progress">진행 중</NativeSelectOption>
      <NativeSelectOption value="done">완료</NativeSelectOption>
      <NativeSelectOption value="cancelled">취소됨</NativeSelectOption>
    </NativeSelect>
  )
}
