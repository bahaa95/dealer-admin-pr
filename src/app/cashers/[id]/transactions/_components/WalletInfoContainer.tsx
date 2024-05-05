"use client";
import { useAuth } from "@/lib/auth";
import { redirect, useParams } from "next/navigation";
import React, { useState } from "react";
import { useWallet } from "../_api";
import { Column, Container, Loader, MainLayout, Section } from "@/components";
import { cn, cx, formatMoney } from "@/utils";
import { ErrorComponent } from "@/components/Error";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { TransferForm } from "./TransferForm";

export const WalletInfoContainer = () => {
  const { auth } = useAuth();
  // redirec to login if user not authentecated
  if (!auth.isAuthenticated) {
    redirect("/login");
  }
  const params = useParams<{ id: string }>();
  const {
    data: myWallet,
    isPending,
    isError,
  } = useWallet({ casherId: params.id });
  const [open, setOpen] = useState(false);

  if (isPending) {
    return (
      <MainLayout>
        <Container>
          <Loader />
        </Container>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout>
        <Container>
          <ErrorComponent
            title="معلومات المحفظة"
            message="حدث خطأ اثناء جلب المعلومات"
          />
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        <div className="pt-32">
          <Section>
            <div className="flex justify-between">
              <h2 className="mb-5 text-lg font-bold">معلومات المحفظة</h2>
            </div>
            <div>
              <p className="mb-2 text-sm">{`تاريخ الانشاء: ${
                myWallet?.createdAt
                  ? new Date(myWallet?.createdAt).toLocaleString()
                  : "N/A"
              }`}</p>
              <p className="mb-2 text-sm">{`اسم المستخدم: ${myWallet?.employee?.username}`}</p>
              <p className="mb-2 text-sm">{`الاسم: ${myWallet?.employee?.fullName}`}</p>
              <p className="mb-2 text-sm">
                <div className="flex gap-1">
                  <span>{`الرصيد: `}</span>
                  <div>
                    <span className="text-base  ps-[2px]">{`${formatMoney(
                      myWallet?.balance || 0
                    )}`}</span>
                    <span className="text-xs text-slate-500">د.ع</span>
                  </div>
                </div>
              </p>
            </div>
            <div className="flex justify-end pt-1">
              <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
                <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>سحب مبلغ</DialogTitle>
                    <DialogDescription>
                      <div>
                        <span>سحب مبلغ من الكاشير</span>
                        <span className="ps-[6px] font-bold text-red-600">
                          {myWallet?.employee?.fullName ||
                            myWallet?.employee?.username}
                        </span>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <TransferForm
                    balance={myWallet.balance}
                    casherId={params.id}
                    onSuccess={() => setOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              <button
                onClick={() => setOpen(true)}
                disabled={myWallet?.balance === 0}
                className={cn(
                  "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ",
                  myWallet?.balance === 0 &&
                    "bg-gray-600 pointer-events-none opacity-60"
                )}
              >
                سحب مبلغ
              </button>
            </div>
          </Section>
          <div className="mt-9 overflow-hidden rounded-lg">
            <div
              className={cx(
                "mb-[2px] grid grid-cols-4 content-center bg-white py-3 px-3 capitalize shadow-md "
              )}
            >
              <Column>المبلغ</Column>
              <Column>النوع</Column>
              <Column>التاريخ</Column>
              <Column>العملية</Column>
            </div>
            <ul className=" grid-rows-{n}  grid grid-cols-1 gap-[2px]">
              {myWallet?.transactions?.map((t) => (
                <li
                  key={t.id}
                  className={cx("block bg-white text-sm shadow-md px-3")}
                >
                  <div
                    className={cx(
                      "grid grid-cols-4 content-center py-3 capitalize"
                    )}
                  >
                    <Column>
                      {formatMoney(t.amount)}
                      <span className="text-xs mx-1 text-slate-500">IQD</span>
                    </Column>
                    <Column>{t.type}</Column>
                    <Column>
                      {new Date(t?.createdAt).toLocaleDateString()}
                    </Column>
                    <Column>{t.from}</Column>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};
