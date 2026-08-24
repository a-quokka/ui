import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/styles/base-nova/ui/native-select"

export default function NativeSelectGroups() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">부서 선택</NativeSelectOption>
      <NativeSelectOptGroup label="엔지니어링">
        <NativeSelectOption value="frontend">프론트엔드</NativeSelectOption>
        <NativeSelectOption value="backend">백엔드</NativeSelectOption>
        <NativeSelectOption value="devops">DevOps</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="세일즈">
        <NativeSelectOption value="sales-rep">세일즈 담당</NativeSelectOption>
        <NativeSelectOption value="account-manager">
          어카운트 매니저
        </NativeSelectOption>
        <NativeSelectOption value="sales-director">
          세일즈 디렉터
        </NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="운영">
        <NativeSelectOption value="support">고객 지원</NativeSelectOption>
        <NativeSelectOption value="product-manager">
          프로덕트 매니저
        </NativeSelectOption>
        <NativeSelectOption value="ops-manager">운영 매니저</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  )
}
