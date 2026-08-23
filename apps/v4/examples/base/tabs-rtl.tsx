"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/styles/base-nova/ui-rtl/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/styles/base-nova/ui-rtl/tabs"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      overview: "Overview",
      analytics: "Analytics",
      reports: "Reports",
      settings: "Settings",
      overviewTitle: "Overview",
      overviewDesc:
        "View your key metrics and recent project activity. Track progress across all your active projects.",
      overviewContent: "You have 12 active projects and 3 pending tasks.",
      analyticsTitle: "Analytics",
      analyticsDesc:
        "Track performance and user engagement metrics. Monitor trends and identify growth opportunities.",
      analyticsContent: "Page views are up 25% compared to last month.",
      reportsTitle: "Reports",
      reportsDesc:
        "Generate and download your detailed reports. Export data in multiple formats for analysis.",
      reportsContent: "You have 5 reports ready and available to export.",
      settingsTitle: "Settings",
      settingsDesc:
        "Manage your account preferences and options. Customize your experience to fit your needs.",
      settingsContent: "Configure notifications, security, and themes.",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      overview: "개요",
      analytics: "분석",
      reports: "리포트",
      settings: "설정",
      overviewTitle: "개요",
      overviewDesc:
        "핵심 지표와 최근 프로젝트 활동을 봅니다. 진행 중인 프로젝트의 진척을 한눈에 확인하세요.",
      overviewContent: "진행 중인 프로젝트가 12개, 남은 작업이 3개 있습니다.",
      analyticsTitle: "분석",
      analyticsDesc:
        "성과와 사용자 참여 지표를 확인합니다. 흐름을 살펴보고 성장 기회를 찾아보세요.",
      analyticsContent: "페이지 조회수가 지난달보다 25% 늘었습니다.",
      reportsTitle: "리포트",
      reportsDesc:
        "상세 리포트를 만들고 내려받습니다. 분석에 쓰도록 여러 형식으로 내보낼 수 있습니다.",
      reportsContent: "내보낼 수 있는 리포트가 5개 준비돼 있습니다.",
      settingsTitle: "설정",
      settingsDesc: "계정 환경설정을 관리합니다. 쓰임에 맞게 바꿔 보세요.",
      settingsContent: "알림, 보안, 테마를 설정합니다.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      overview: "نظرة عامة",
      analytics: "التحليلات",
      reports: "التقارير",
      settings: "الإعدادات",
      overviewTitle: "نظرة عامة",
      overviewDesc:
        "عرض مقاييسك الرئيسية وأنشطة المشروع الأخيرة. تتبع التقدم عبر جميع مشاريعك النشطة.",
      overviewContent: "لديك ١٢ مشروعًا نشطًا و٣ مهام معلقة.",
      analyticsTitle: "التحليلات",
      analyticsDesc:
        "تتبع مقاييس الأداء ومشاركة المستخدمين. راقب الاتجاهات وحدد فرص النمو.",
      analyticsContent: "زادت مشاهدات الصفحة بنسبة ٢٥٪ مقارنة بالشهر الماضي.",
      reportsTitle: "التقارير",
      reportsDesc:
        "إنشاء وتنزيل تقاريرك التفصيلية. تصدير البيانات بتنسيقات متعددة للتحليل.",
      reportsContent: "لديك ٥ تقارير جاهزة ومتاحة للتصدير.",
      settingsTitle: "الإعدادات",
      settingsDesc:
        "إدارة تفضيلات حسابك وخياراته. تخصيص تجربتك لتناسب احتياجاتك.",
      settingsContent: "تكوين الإشعارات والأمان والسمات.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      overview: "סקירה כללית",
      analytics: "אנליטיקה",
      reports: "דוחות",
      settings: "הגדרות",
      overviewTitle: "סקירה כללית",
      overviewDesc:
        "הצג את המדדים העיקריים שלך ופעילות הפרויקט האחרונה. עקוב אחר התקדמות בכל הפרויקטים הפעילים שלך.",
      overviewContent: "יש לך 12 פרויקטים פעילים ו-3 משימות ממתינות.",
      analyticsTitle: "אנליטיקה",
      analyticsDesc:
        "עקוב אחר ביצועים ומדדי מעורבות משתמשים. עקוב אחר מגמות וזהה הזדמנויות צמיחה.",
      analyticsContent: "צפיות בדף עלו ב-25% בהשוואה לחודש שעבר.",
      reportsTitle: "דוחות",
      reportsDesc:
        "צור והורד את הדוחות המפורטים שלך. ייצא נתונים בפורמטים מרובים לניתוח.",
      reportsContent: "יש לך 5 דוחות מוכנים וזמינים לייצוא.",
      settingsTitle: "הגדרות",
      settingsDesc:
        "נהל את העדפות החשבון והאפשרויות שלך. התאם אישית את החוויה שלך כך שתתאים לצרכים שלך.",
      settingsContent: "הגדר התראות, אבטחה וערכות נושא.",
    },
  },
}

export function TabsRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  return (
    <Tabs defaultValue="overview" className="w-full max-w-sm" dir={dir}>
      <TabsList dir={dir}>
        <TabsTrigger value="overview">{t.overview}</TabsTrigger>
        <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
        <TabsTrigger value="reports">{t.reports}</TabsTrigger>
        <TabsTrigger value="settings">{t.settings}</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card dir={dir}>
          <CardHeader>
            <CardTitle>{t.overviewTitle}</CardTitle>
            <CardDescription>{t.overviewDesc}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t.overviewContent}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card dir={dir}>
          <CardHeader>
            <CardTitle>{t.analyticsTitle}</CardTitle>
            <CardDescription>{t.analyticsDesc}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t.analyticsContent}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card dir={dir}>
          <CardHeader>
            <CardTitle>{t.reportsTitle}</CardTitle>
            <CardDescription>{t.reportsDesc}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t.reportsContent}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card dir={dir}>
          <CardHeader>
            <CardTitle>{t.settingsTitle}</CardTitle>
            <CardDescription>{t.settingsDesc}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t.settingsContent}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
