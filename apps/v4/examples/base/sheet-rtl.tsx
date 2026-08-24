"use client"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Button } from "@/styles/base-nova/ui-rtl/button"
import { Field, FieldGroup, FieldLabel } from "@/styles/base-nova/ui-rtl/field"
import { Input } from "@/styles/base-nova/ui-rtl/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/styles/base-nova/ui-rtl/sheet"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      open: "Open",
      editProfile: "Edit profile",
      description: "여기서 프로필을 고칠 수 있습니다. 다 되면 저장을 누르세요.",
      name: "Name",
      username: "Username",
      save: "Save changes",
      close: "Close",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      open: "열기",
      editProfile: "프로필 수정",
      description: "여기서 프로필을 고칠 수 있습니다. 다 되면 저장을 누르세요.",
      name: "이름",
      username: "사용자 이름",
      save: "저장",
      close: "닫기",
    },
  },
}

export function SheetRtl() {
  const { dir, t, language } = useTranslation(translations, "ko")

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        {t.open}
      </SheetTrigger>
      <SheetContent
        dir={dir}
        side={dir === "rtl" ? "left" : "right"}
        data-lang={dir === "rtl" ? language : undefined}
      >
        <SheetHeader>
          <SheetTitle>{t.editProfile}</SheetTitle>
          <SheetDescription>{t.description}</SheetDescription>
        </SheetHeader>
        <FieldGroup className="px-4">
          <Field>
            <FieldLabel htmlFor="sheet-rtl-name">{t.name}</FieldLabel>
            <Input id="sheet-rtl-name" defaultValue="Pedro Duarte" />
          </Field>
          <Field>
            <FieldLabel htmlFor="sheet-rtl-username">{t.username}</FieldLabel>
            <Input id="sheet-rtl-username" defaultValue="peduarte" />
          </Field>
        </FieldGroup>
        <SheetFooter>
          <Button type="submit">{t.save}</Button>
          <SheetClose render={<Button variant="outline" />}>
            {t.close}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
