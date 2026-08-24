import { Button } from "@/styles/base-nova/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/styles/base-nova/ui/field"
import { Input } from "@/styles/base-nova/ui/input"

export function FieldResponsive() {
  return (
    <div className="w-full max-w-lg">
      <form>
        <FieldSet>
          <FieldLegend>프로필</FieldLegend>
          <FieldDescription>프로필 정보를 채워 주세요.</FieldDescription>
          <FieldGroup>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="name">이름</FieldLabel>
                <FieldDescription>
                  확인을 위해 이름을 모두 입력하세요
                </FieldDescription>
              </FieldContent>
              <Input id="name" placeholder="Evil Rabbit" required />
            </Field>
            <Field orientation="responsive">
              <Button type="submit">제출</Button>
              <Button type="button" variant="outline">
                취소
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  )
}
