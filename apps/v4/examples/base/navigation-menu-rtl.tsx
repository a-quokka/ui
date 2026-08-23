"use client"

import * as React from "react"
import Link from "next/link"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/styles/base-nova/ui-rtl/navigation-menu"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      gettingStarted: "Getting started",
      introduction: "Introduction",
      introductionDesc: "Re-usable components built with Tailwind CSS.",
      installation: "Installation",
      installationDesc: "How to install dependencies and structure your app.",
      typography: "Typography",
      typographyDesc: "Styles for headings, paragraphs, lists...etc",
      components: "Components",
      alertDialog: "Alert Dialog",
      alertDialogDesc:
        "A modal dialog that interrupts the user with important content and expects a response.",
      hoverCard: "Hover Card",
      hoverCardDesc:
        "For sighted users to preview content available behind a link.",
      progress: "Progress",
      progressDesc:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
      scrollArea: "Scroll-area",
      scrollAreaDesc: "Visually or semantically separates content.",
      tabs: "Tabs",
      tabsDesc:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      tooltip: "Tooltip",
      tooltipDesc:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      withIcon: "With Icon",
      backlog: "Backlog",
      toDo: "To Do",
      done: "Done",
      docs: "Docs",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      gettingStarted: "시작하기",
      introduction: "소개",
      introductionDesc: "Tailwind CSS 로 만든 재사용 가능한 컴포넌트입니다.",
      installation: "설치",
      installationDesc: "의존성을 설치하고 앱 구조를 잡는 방법입니다.",
      typography: "Typography",
      typographyDesc: "제목·문단·목록 등의 스타일입니다.",
      components: "컴포넌트",
      alertDialog: "Alert Dialog",
      alertDialogDesc:
        "중요한 내용으로 사용자를 멈춰 세우고 응답을 받는 모달 다이얼로그입니다.",
      hoverCard: "Hover Card",
      hoverCardDesc: "링크 뒤의 내용을 미리 보여 줍니다.",
      progress: "Progress",
      progressDesc:
        "작업이 얼마나 진행됐는지 보여 줍니다. 보통 막대 형태입니다.",
      scrollArea: "Scroll-area",
      scrollAreaDesc: "내용을 시각적으로, 또 의미상으로 나눕니다.",
      tabs: "Tabs",
      tabsDesc:
        "탭 패널이라 부르는 여러 겹의 구획을 한 번에 하나씩 보여 줍니다.",
      tooltip: "Tooltip",
      tooltipDesc:
        "요소에 키보드 포커스가 가거나 마우스를 올리면 관련 정보를 띄웁니다.",
      withIcon: "아이콘 함께 쓰기",
      backlog: "백로그",
      toDo: "할 일",
      done: "완료",
      docs: "문서",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      gettingStarted: "البدء",
      introduction: "مقدمة",
      introductionDesc:
        "مكونات قابلة لإعادة الاستخدام مبنية باستخدام Tailwind CSS.",
      installation: "التثبيت",
      installationDesc: "كيفية تثبيت التبعيات وتنظيم تطبيقك.",
      typography: "الطباعة",
      typographyDesc: "أنماط للعناوين والفقرات والقوائم...إلخ",
      components: "المكونات",
      alertDialog: "حوار التنبيه",
      alertDialogDesc: "حوار نافذة يقطع المستخدم بمحتوى مهم ويتوقع استجابة.",
      hoverCard: "بطاقة التحويم",
      hoverCardDesc: "للمستخدمين المبصرين لمعاينة المحتوى المتاح خلف الرابط.",
      progress: "التقدم",
      progressDesc:
        "يعرض مؤشرًا يوضح تقدم إتمام المهمة، عادةً يتم عرضه كشريط تقدم.",
      scrollArea: "منطقة التمرير",
      scrollAreaDesc: "يفصل المحتوى بصريًا أو دلاليًا.",
      tabs: "التبويبات",
      tabsDesc:
        "مجموعة من أقسام المحتوى المتعددة الطبقات—المعروفة بألواح التبويب—التي يتم عرضها واحدة في كل مرة.",
      tooltip: "تلميح",
      tooltipDesc:
        "نافذة منبثقة تعرض معلومات متعلقة بعنصر عندما يتلقى العنصر التركيز على لوحة المفاتيح أو عند تحويم الماوس فوقه.",
      withIcon: "مع أيقونة",
      backlog: "قائمة الانتظار",
      toDo: "المهام",
      done: "منجز",
      docs: "الوثائق",
    },
  },
  he: {
    dir: "rtl",
    values: {
      gettingStarted: "התחלה",
      introduction: "הקדמה",
      introductionDesc: "רכיבים לשימוש חוזר שנבנו עם Tailwind CSS.",
      installation: "התקנה",
      installationDesc: "כיצד להתקין תלויות ולבנות את האפליקציה שלך.",
      typography: "טיפוגרפיה",
      typographyDesc: "סגנונות לכותרות, פסקאות, רשימות...וכו'",
      components: "רכיבים",
      alertDialog: "דיאלוג התראה",
      alertDialogDesc: "דיאלוג מודאלי שמפריע למשתמש עם תוכן חשוב ומצפה לתגובה.",
      hoverCard: "כרטיס ריחוף",
      hoverCardDesc:
        "למשתמשים רואים כדי להציג תצוגה מקדימה של תוכן זמין מאחורי קישור.",
      progress: "התקדמות",
      progressDesc:
        "מציג אינדיקטור המציג את התקדמות ההשלמה של משימה, בדרך כלל מוצג כסרגל התקדמות.",
      scrollArea: "אזור גלילה",
      scrollAreaDesc: "מפריד תוכן חזותית או סמנטית.",
      tabs: "כרטיסיות",
      tabsDesc:
        "קבוצה של חלקי תוכן מרובדים—המכונים לוחות כרטיסיות—המוצגים אחד בכל פעם.",
      tooltip: "טולטיפ",
      tooltipDesc:
        "חלון קופץ המציג מידע הקשור לאלמנט כאשר האלמנט מקבל מיקוד מקלדת או כאשר העכבר מרחף מעליו.",
      withIcon: "עם אייקון",
      backlog: "רשימת המתנה",
      toDo: "לעשות",
      done: "הושלם",
      docs: "תיעוד",
    },
  },
}

const components = [
  {
    titleKey: "alertDialog" as const,
    descriptionKey: "alertDialogDesc" as const,
    href: "/docs/primitives/alert-dialog",
  },
  {
    titleKey: "hoverCard" as const,
    descriptionKey: "hoverCardDesc" as const,
    href: "/docs/primitives/hover-card",
  },
  {
    titleKey: "progress" as const,
    descriptionKey: "progressDesc" as const,
    href: "/docs/primitives/progress",
  },
  {
    titleKey: "scrollArea" as const,
    descriptionKey: "scrollAreaDesc" as const,
    href: "/docs/primitives/scroll-area",
  },
  {
    titleKey: "tabs" as const,
    descriptionKey: "tabsDesc" as const,
    href: "/docs/primitives/tabs",
  },
  {
    titleKey: "tooltip" as const,
    descriptionKey: "tooltipDesc" as const,
    href: "/docs/primitives/tooltip",
  },
] as const

export function NavigationMenuRtl() {
  const { dir, t, language } = useTranslation(translations, "ko")

  return (
    <NavigationMenu dir={dir} align={dir === "rtl" ? "end" : "start"}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t.gettingStarted}</NavigationMenuTrigger>
          <NavigationMenuContent
            dir={dir}
            data-lang={dir === "rtl" ? language : undefined}
          >
            <ul className="w-96">
              <ListItem href="/docs" title={t.introduction}>
                {t.introductionDesc}
              </ListItem>
              <ListItem href="/docs/installation" title={t.installation}>
                {t.installationDesc}
              </ListItem>
              <ListItem href="/docs/primitives/typography" title={t.typography}>
                {t.typographyDesc}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>{t.components}</NavigationMenuTrigger>
          <NavigationMenuContent
            dir={dir}
            data-lang={dir === "rtl" ? language : undefined}
          >
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.titleKey}
                  title={t[component.titleKey]}
                  href={component.href}
                >
                  {t[component.descriptionKey]}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t.withIcon}</NavigationMenuTrigger>
          <NavigationMenuContent
            dir={dir}
            data-lang={dir === "rtl" ? language : undefined}
          >
            <ul className="grid w-[200px]">
              <li>
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2" />
                  }
                >
                  <CircleAlertIcon />
                  {t.backlog}
                </NavigationMenuLink>
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2" />
                  }
                >
                  <CircleDashedIcon />
                  {t.toDo}
                </NavigationMenuLink>
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2" />
                  }
                >
                  <CircleCheckIcon />
                  {t.done}
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/docs" />}
            className={navigationMenuTriggerStyle()}
            data-lang={dir === "rtl" ? language : undefined}
          >
            {t.docs}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<Link href={href} />}>
        <div className="flex flex-col gap-1 text-sm">
          <div className="leading-none font-medium">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div>
      </NavigationMenuLink>
    </li>
  )
}
