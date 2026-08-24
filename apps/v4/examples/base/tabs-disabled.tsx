import { Tabs, TabsList, TabsTrigger } from "@/styles/base-nova/ui/tabs"

export function TabsDisabled() {
  return (
    <Tabs defaultValue="home">
      <TabsList>
        <TabsTrigger value="home">홈</TabsTrigger>
        <TabsTrigger value="settings" disabled>
          비활성
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
