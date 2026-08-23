import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/styles/base-nova/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/styles/base-nova/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">개요</TabsTrigger>
        <TabsTrigger value="analytics">분석</TabsTrigger>
        <TabsTrigger value="reports">리포트</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>개요</CardTitle>
            <CardDescription>
              핵심 지표와 최근 프로젝트 활동을 봅니다. 진행 중인 프로젝트의
              진척을 한눈에 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            진행 중인 프로젝트가 12개, 남은 작업이 3개 있습니다.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>분석</CardTitle>
            <CardDescription>
              성과와 사용자 참여 지표를 확인합니다. 흐름을 살펴보고 성장 기회를
              찾아보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            페이지 조회수가 지난달보다 25% 늘었습니다.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>리포트</CardTitle>
            <CardDescription>
              상세 리포트를 만들고 내려받습니다. 분석에 쓰도록 여러 형식으로
              내보낼 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            내보낼 수 있는 리포트가 5개 준비돼 있습니다.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>설정</CardTitle>
            <CardDescription>
              계정 환경설정을 관리합니다. 쓰임에 맞게 바꿔 보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            알림, 보안, 테마를 설정합니다.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
