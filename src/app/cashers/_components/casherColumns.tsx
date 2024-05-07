"use client";
import { AlertDialog, CanAccess, Column, IconButton } from "@/components";
import { ICasher } from "../_types";
import { useDeleteCasher } from "../_api/useDeleteCasher";
import { toast } from "react-toastify";
import { cx, formatMoney } from "@/utils";
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEdit,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip } from "@/components/ui/Tooltip";
import { BsBoxArrowLeft } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useState } from "react";
import { TransferForm } from "../[id]/transactions/_components/TransferForm";

export const cashersColumns = () => [
  {
    headerName: "اسم المستخدم",
    field: "username",
    flex: 1,
    resizable: false,
    minWidth: 200,
    cellRenderer: (p: { data: ICasher }) => <Column>{p.data?.username}</Column>,
  },
  {
    headerName: "الاسم",
    field: "fullname",
    flex: 1,
    resizable: false,
    minWidth: 200,
    cellRenderer: (p: { data: ICasher }) => <Column>{p.data.fullName}</Column>,
  },
  // {
  //   headerName: "تاريخ الانشاء",
  //   field: "createdAt",
  //   flex: 1,
  //   resizable: false,
  //   minWidth: 200,
  //   cellRenderer: (p: { data: ICasher }) => (
  //     <Column> {new Date(p.data?.createdAt).toLocaleString("en-GB")}</Column>
  //   ),
  // },
  {
    headerName: "الفواتير",
    field: "orderCount",
    flex: 1,
    resizable: false,
    minWidth: 200,
    cellRenderer: (p: { data: ICasher }) => (
      <Column> {p.data.orderCount}</Column>
    ),
  },
  {
    headerName: "المبلغ الكلي",
    field: "totalAmount",
    flex: 1,
    resizable: false,
    minWidth: 200,
    cellRenderer: (p: { data: ICasher }) => (
      <Column> {formatMoney(p.data.totalAmount)}</Column>
    ),
  },
  {
    headerName: "الدين",
    field: "balance",
    flex: 1,
    resizable: false,
    sortable: false,
    minWidth: 200,
    cellRenderer: (p: { data: ICasher }) => (
      <Column> {formatMoney(p.data.casherWalet?.balance)}</Column>
    ),
  },
  {
    resizable: false,
    sortable: false,
    flex: 1,
    minWidth: 200,
    cellRenderer: (p: { data: ICasher }) => {
      const [open, setOpen] = useState(false);
      const router = useRouter();
      const pathname = usePathname();
      const { isPending, mutateAsync: deleteCasher } = useDeleteCasher({
        casherId: p.data.id,
      });

      const handleDeleteCasher = async () => {
        try {
          await deleteCasher(p.data.id);
          toast.success("تمت عملية الحذف بنجاح.");
        } catch (error) {
          toast.error("حدث خطأ ما اثناء عملية الحذف.");
        }
      };

      return (
        <div className="flex items-center h-full gap-3">
          <CanAccess role="admin">
            <AlertDialog
              title="!حذف كاشير"
              description="هل انت متأكد من حذف الكاشير؟"
              action={handleDeleteCasher}
            >
              <div>
                <IconButton
                  loading={isPending}
                  icon={<MdOutlineDeleteOutline className="text-xl" />}
                  className={cx(
                    "bg-red-600/60 hover:bg-red-600",
                    isPending ? "bg-red-600" : "bg-red-600/60"
                  )}
                />
              </div>
            </AlertDialog>
          </CanAccess>

          <CanAccess role="admin">
            <Tooltip content="تعديل">
              <div>
                <IconButton
                  onClick={() => router.push(`${pathname}/${p.data.id}`)}
                  onMouseEnter={() =>
                    router.prefetch(`${pathname}/${p.data.id}`)
                  }
                  icon={<MdOutlineModeEdit className="text-xl" />}
                  className={cx("bg-blue-600/60 hover:bg-blue-600")}
                />
              </div>
            </Tooltip>
          </CanAccess>

          <Tooltip content="سحب مبلغ">
            <div>
              <IconButton
                onClick={() => setOpen(true)}
                icon={<BsBoxArrowLeft className="text-xl" />}
                className={cx("bg-green-600/60 hover:bg-green-600")}
              />
            </div>
          </Tooltip>
          <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>سحب مبلغ</DialogTitle>
                <DialogDescription>
                  <div>
                    <span>سحب مبلغ من الكاشير</span>
                    <span className="ps-[6px] font-bold text-red-600">
                      {p.data?.username || p.data?.username}
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <TransferForm
                casherId={p.data?.id}
                balance={p.data?.casherWalet?.balance}
                onSuccess={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Tooltip content="عرض التفاصيل">
            <div>
              <IconButton
                onClick={() =>
                  router.push(`${pathname}/${p.data.id}/transactions`)
                }
                onMouseEnter={() =>
                  router.prefetch(`${pathname}/${p.data.id}/transactions`)
                }
                icon={<MdOutlineRemoveRedEye className="text-xl" />}
                className={cx("bg-yellow-600/60 hover:bg-yellow-600")}
              />
            </div>
          </Tooltip>
        </div>
      );
    },
  },
];
