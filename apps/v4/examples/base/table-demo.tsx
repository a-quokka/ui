import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/styles/base-nova/ui/table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "결제 완료",
    totalAmount: "250,000원",
    paymentMethod: "신용카드",
  },
  {
    invoice: "INV002",
    paymentStatus: "대기 중",
    totalAmount: "150,000원",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "미결제",
    totalAmount: "350,000원",
    paymentMethod: "계좌 이체",
  },
  {
    invoice: "INV004",
    paymentStatus: "결제 완료",
    totalAmount: "450,000원",
    paymentMethod: "신용카드",
  },
  {
    invoice: "INV005",
    paymentStatus: "결제 완료",
    totalAmount: "550,000원",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "대기 중",
    totalAmount: "200,000원",
    paymentMethod: "계좌 이체",
  },
  {
    invoice: "INV007",
    paymentStatus: "미결제",
    totalAmount: "300,000원",
    paymentMethod: "신용카드",
  },
]

export function TableDemo() {
  return (
    <Table>
      <TableCaption>최근 청구서 목록입니다.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">청구서</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>결제 수단</TableHead>
          <TableHead className="text-right">금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>합계</TableCell>
          <TableCell className="text-right">2,500,000원</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
