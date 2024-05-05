import { Column } from "@/components";
import { ITransaction } from "../_types";
import { formatMoney } from "@/utils";

export const transactionsColumns = () => [
  {
    headerName: "اسم المستخدم",
    flex: 1,
    resizable: false,
    minWidth: 200,
    sortable: false,
    cellRenderer: (p: { data: ITransaction }) => (
      <Column>
        <div className="flex flex-col ">
          <span className="text-base font-semibold text-black">
            {p.data.toUserName}
          </span>
          <span className="text-xs text-gray-500">{p.data.fromUserName}</span>
        </div>
      </Column>
    ),
  },
  {
    headerName: "نوع العملية",
    flex: 1,
    resizable: false,
    minWidth: 200,
    sortable: false,
    cellRenderer: (p: { data: ITransaction }) => (
      <Column>{p.data.type === "deposit" ? "ايداع" : "سحب"}</Column>
    ),
  },
  {
    headerName: "المبلغ",
    sortable: false,
    flex: 1,
    resizable: false,
    minWidth: 200,
    cellRenderer: (p: { data: ITransaction }) => (
      <Column>
        {p.data.type === "deposit" ? (
          <p className="text-green-600">{formatMoney(p.data.amount)}+</p>
        ) : (
          <p className="text-red-600">{formatMoney(p.data.amount)}-</p>
        )}
      </Column>
    ),
  },
];
