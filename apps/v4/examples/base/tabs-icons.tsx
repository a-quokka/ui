import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Tabs, TabsList, TabsTrigger } from "@/styles/base-nova/ui/tabs"

export function TabsIcons() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindowIcon />
          미리보기
        </TabsTrigger>
        <TabsTrigger value="code">
          <CodeIcon />
          코드
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
