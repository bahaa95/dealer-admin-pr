"use client";
import { Status } from "@/app/orders/_components/Status";
import { Column, Container, Loader, MainLayout, Section } from "@/components";
import { useAuth } from "@/lib/auth";
import { cx, formatMoney } from "@/utils";
import React, { FC, useRef } from "react";
import { useGetOrder } from "../_api";
import { ErrorComponent } from "@/components/Error";
import { redirect } from "next/navigation";

type OderDetailesProps = {
  orderId: string;
};

export const OderDetailes: FC<OderDetailesProps> = ({ orderId }) => {
  const { auth } = useAuth();
  // redirec to login if user not authentecated
  if (!auth.isAuthenticated) {
    redirect("/login");
  }

  const { data: order, isPending, isError } = useGetOrder({ orderId });
  const printContentRef = useRef();

  if (isPending) {
    return (
      <MainLayout>
        <Container>
          <Loader />
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        {isError ? (
          <ErrorComponent
            title="لا يوجد طلب"
            message="لم يتم العثور على طلب مطابق "
          />
        ) : (
          <div className="pt-32">
            <div ref={printContentRef as any}>
              <Section>
                <div className="flex justify-between">
                  <h2 className="mb-5 text-lg font-bold">معلومات الفاتورة</h2>
                  <h3 className="text-xl font-bold">#{order?.id}</h3>
                </div>
                <div>
                  <p className="mb-2 text-sm">{`التاريخ: ${
                    order?.createdAt
                      ? new Date(order?.createdAt).toLocaleString()
                      : "N/A"
                  }`}</p>
                  <p className="mb-2 text-sm">
                    {`المبلغ: ${
                      order?.totalAmount
                        ? formatMoney(order?.totalAmount)
                        : "N/A"
                    }`}{" "}
                    <span className="text-xs text-slate-500">IQD</span>
                  </p>
                  <p className="mb-2 text-sm">
                    {`الحالة: `}{" "}
                    {order?.Payment?.paymentStatus ? (
                      <Status status={order?.Payment?.paymentStatus} />
                    ) : (
                      "N/A"
                    )}
                  </p>
                  <p className="mb-2 text-sm">{` الدفع بواسطة: ${
                    order?.Payment?.paymentMethod || "N/A"
                  }`}</p>
                </div>
              </Section>
              <div className="mt-9 overflow-hidden rounded-lg">
                <div
                  className={cx(
                    "mb-[2px] grid grid-cols-5 content-center bg-white py-3 px-3 capitalize shadow-md "
                  )}
                >
                  <Column>المادة</Column>
                  <Column>السعر</Column>
                  <Column>الكمية</Column>
                  <Column>السعر الكلي</Column>
                </div>
                <ul className=" grid-rows-{n}  grid grid-cols-1 gap-[2px]">
                  {order?.MearchentOrderLineItems?.map((item) => (
                    <li
                      key={item.id}
                      className={cx("block bg-white text-sm shadow-md px-3")}
                    >
                      <div
                        className={cx(
                          "grid grid-cols-5 content-center py-3 capitalize"
                        )}
                      >
                        <Column>{item.name}</Column>
                        <Column>
                          {formatMoney(item.price)}
                          <span className="text-xs mx-1 text-slate-500">
                            IQD
                          </span>
                        </Column>
                        <Column>{item.quantity}</Column>
                        <Column>
                          {formatMoney(item.totalAmount)}{" "}
                          <span className="text-xs mx-1 text-slate-500">
                            IQD
                          </span>
                        </Column>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Container>
    </MainLayout>
  );
};
