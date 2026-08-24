"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "@/components/language-selector"
import { Button } from "@/styles/base-nova/ui-rtl/button"
import { Checkbox } from "@/styles/base-nova/ui-rtl/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/styles/base-nova/ui-rtl/field"
import { Input } from "@/styles/base-nova/ui-rtl/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/styles/base-nova/ui-rtl/select"
import { Textarea } from "@/styles/base-nova/ui-rtl/textarea"

const months = [
  { label: "MM", value: null },
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
]

const years = [
  { label: "YYYY", value: null },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
]

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      paymentMethod: "Payment Method",
      secureTransactions: "All transactions are secure and encrypted",
      nameOnCard: "Name on Card",
      cardNumber: "Card Number",
      cardNumberDescription: "Enter your 16-digit card number",
      month: "Month",
      year: "Year",
      cvv: "CVV",
      monthPlaceholder: "MM",
      month01: "01",
      month02: "02",
      month03: "03",
      month04: "04",
      month05: "05",
      month06: "06",
      month07: "07",
      month08: "08",
      month09: "09",
      month10: "10",
      month11: "11",
      month12: "12",
      billingAddress: "Billing Address",
      billingAddressDescription:
        "The billing address associated with your payment method",
      sameAsShipping: "Same as shipping address",
      comments: "Comments",
      commentsPlaceholder: "Add any additional comments",
      submit: "Submit",
      cancel: "Cancel",
    },
  },
  ko: {
    dir: "ltr",
    values: {
      paymentMethod: "결제 수단",
      secureTransactions: "모든 거래는 암호화돼 안전하게 처리됩니다",
      nameOnCard: "카드 소유자 이름",
      cardNumber: "카드 번호",
      cardNumberDescription: "16자리 카드 번호를 입력하세요",
      month: "월",
      year: "연도",
      cvv: "CVV",
      monthPlaceholder: "MM",
      month01: "01",
      month02: "02",
      month03: "03",
      month04: "04",
      month05: "05",
      month06: "06",
      month07: "07",
      month08: "08",
      month09: "09",
      month10: "10",
      month11: "11",
      month12: "12",
      billingAddress: "청구지 주소",
      billingAddressDescription: "결제 수단에 등록된 청구지 주소입니다",
      sameAsShipping: "배송지와 같음",
      comments: "메모",
      commentsPlaceholder: "남길 말이 있으면 적어 주세요",
      submit: "제출",
      cancel: "취소",
    },
  },
}

export function FieldRtl() {
  const { dir, t } = useTranslation(translations, "ko")

  const getMonthLabel = (value: string | null): string => {
    if (value === null) return t.monthPlaceholder
    const monthKey = `month${value}` as keyof typeof t
    return t[monthKey] || value
  }

  return (
    <div className="w-full max-w-md py-6" dir={dir}>
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>{t.paymentMethod}</FieldLegend>
            <FieldDescription>{t.secureTransactions}</FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j-rtl">
                  {t.nameOnCard}
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j-rtl"
                  placeholder="Evil Rabbit"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1-rtl">
                  {t.cardNumber}
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-number-uw1-rtl"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <FieldDescription>{t.cardNumberDescription}</FieldDescription>
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="checkout-exp-month-ts6-rtl">
                    {t.month}
                  </FieldLabel>
                  <Select items={months}>
                    <SelectTrigger id="checkout-exp-month-ts6-rtl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent dir={dir}>
                      <SelectGroup>
                        {months.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {getMonthLabel(item.value)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-exp-year-f59-rtl">
                    {t.year}
                  </FieldLabel>
                  <Select items={years}>
                    <SelectTrigger id="checkout-7j9-exp-year-f59-rtl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent dir={dir}>
                      <SelectGroup>
                        {years.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-cvv-rtl">
                    {t.cvv}
                  </FieldLabel>
                  <Input id="checkout-7j9-cvv-rtl" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>{t.billingAddress}</FieldLegend>
            <FieldDescription>{t.billingAddressDescription}</FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox
                  id="checkout-7j9-same-as-shipping-wgm-rtl"
                  defaultChecked
                />
                <FieldLabel
                  htmlFor="checkout-7j9-same-as-shipping-wgm-rtl"
                  className="font-normal"
                >
                  {t.sameAsShipping}
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-optional-comments-rtl">
                  {t.comments}
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments-rtl"
                  placeholder={t.commentsPlaceholder}
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">{t.submit}</Button>
            <Button variant="outline" type="button">
              {t.cancel}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
