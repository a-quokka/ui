"use client"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Button } from "@/styles/base-nova/ui-rtl/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/styles/base-nova/ui-rtl/dialog"
import { Field, FieldGroup } from "@/styles/base-nova/ui-rtl/field"
import { Input } from "@/styles/base-nova/ui-rtl/input"
import { Label } from "@/styles/base-nova/ui-rtl/label"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      openDialog: "Open Dialog",
      editProfile: "Edit profile",
      description: "여기서 프로필을 고칠 수 있습니다. 다 되면 저장을 누르세요.",
      name: "Name",
      username: "Username",
      cancel: "Cancel",
      saveChanges: "Save changes",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      openDialog: "다이얼로그 열기",
      editProfile: "프로필 수정",
      description: "여기서 프로필을 고칠 수 있습니다. 다 되면 저장을 누르세요.",
      name: "이름",
      username: "사용자 이름",
      cancel: "취소",
      saveChanges: "저장",
    },
  },
}

export function DialogRtl() {
  const { dir, t, language } = useTranslation(translations, "ko")

  return (
    <Dialog>
      <form>
        <DialogTrigger render={<Button variant="outline" />}>
          {t.openDialog}
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-sm"
          dir={dir}
          data-lang={dir === "rtl" ? language : undefined}
        >
          <DialogHeader>
            <DialogTitle>{t.editProfile}</DialogTitle>
            <DialogDescription>{t.description}</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">{t.name}</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">{t.username}</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              {t.cancel}
            </DialogClose>
            <Button type="submit">{t.saveChanges}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
