import { Button } from "@/styles/base-nova/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/base-nova/ui/card"

export function CardEdgeToEdge() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>이용약관</CardTitle>
        <CardDescription>동의하기 전에 약관을 읽어 주세요.</CardDescription>
      </CardHeader>
      <CardContent className="-mb-(--card-spacing)">
        <div className="-mx-(--card-spacing) max-h-48 space-y-4 overflow-y-scroll border-t bg-muted/50 px-(--card-spacing) py-4 text-sm leading-relaxed">
          <p>
            이 약관은 공유 문서, 프로젝트 파일, 협업 도구 이용을 포함한
            워크스페이스 사용 전반에 적용됩니다.
          </p>
          <p>
            올린 내용에 대한 책임은 올린 사람에게 있으며, 팀원이 그 내용을
            보거나 편집할 권한이 있는지도 직접 확인해야 합니다.
          </p>
          <p>
            서비스가 발전하면서 기능이나 한도가 바뀔 수 있습니다. 그 변화가
            업무에 크게 영향을 준다면 워크스페이스 관리자에게 알려 드립니다.
          </p>
          <p>
            계속하면 계정 정보를 안전하게 관리하고 소속 조직의 이용 정책을
            따르는 데 동의하는 것으로 봅니다.
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">거절</Button>
        <Button>동의</Button>
      </CardFooter>
    </Card>
  )
}
