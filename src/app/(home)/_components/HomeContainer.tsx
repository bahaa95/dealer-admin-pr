"use client";
import { Column, Container, Loader, MainLayout } from "@/components";
import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { useAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { usePrivateApi } from "@/lib/api";
import { IOrdersResponse } from "@/app/orders/_types";
import { cx, formatMoney } from "@/utils";
import { Status } from "@/app/orders/_components/Status";
import Link from "next/link";
import { useGetCashers } from "@/app/cashers/_api";
import { useGetTransactions } from "@/app/transactions/_api";
import { useGetDashboardSummery } from "../_api";

export const HomeContainer = () => {
  const { auth } = useAuth();
  // redirect to login if user not authentecated
  if (!auth.isAuthenticated) {
    redirect("/login");
  }

  const api = usePrivateApi();

  const [orders, setOrders] = useState<IOrdersResponse>({
    data: [],
    meta: {},
  } as unknown as IOrdersResponse);
  const [fetchingOrders, setFetchingOrders] = useState(true);
  const {
    data: cashers,
    isLoading: gettingCashers,
    error,
  } = useGetCashers({
    filter: {
      page: 1,
      search: "",
      limit: 20,
    },
  });
  const { isLoading: gettingTransactions, data: transactions } =
    useGetTransactions();

  const { data: dashboardSummary, isLoading: gettingDashboardSummary } =
    useGetDashboardSummery();

  useEffect(() => {
    api
      .get<IOrdersResponse>(`/casher/orders/admin`, {
        headers: { "x-sas": auth.sas },
      })
      .then((res) => setOrders(res.data))
      .finally(() => {
        setFetchingOrders(false);
      });
  }, []);

  if (fetchingOrders || gettingCashers || gettingTransactions) {
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
        <div className=" pb-[3em] pt-14">
          <div className="flex flex-wrap gap-4 mb-4">
            <Card
              className="basis-[200px] max-w-[350px]"
              title="الديون"
              value={dashboardSummary?.loan || 0}
            />
            <Card
              className="basis-[200px] max-w-[350px]"
              title="اجمالي المبيعات"
              value={dashboardSummary?.totalsales || 0}
            />
            <Card
              className="basis-[200px] max-w-[350px]"
              title="اجمالي المستلم"
              value={dashboardSummary?.totalDeposit || 0}
            />
            <Card
              className="basis-[200px] max-w-[350px]"
              title="الكارتات"
              value={dashboardSummary?.totalCards || 0}
            />
          </div>
          <div className="grid grid-cols-5 gap-4 mb-4">
            <div className="py-6 px-4 bg-white/50 rounded-lg col-span-5 lg:col-span-3">
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-bold">المبيعات الأخيرة</h2>
                <span className="text-xs text-gray-600">
                  تصفح اخر عمليات البيع
                </span>
              </div>
              <ul className=" grid-rows-{n}  grid grid-cols-1 gap-3 pt-5">
                {orders?.data?.slice(0, 7).map((o) => (
                  <li
                    key={o.id}
                    className={cx(
                      "block bg-white text-sm px-4 rounded-lg py-[2px]"
                    )}
                  >
                    <div
                      className={cx(
                        "grid grid-cols-3 content-center py-3 capitalize"
                      )}
                    >
                      <Column className="text-gray-500">
                        {o.employee.fullName}
                      </Column>
                      <Column className="justify-center">
                        <Status status={o.Payment?.paymentStatus} />
                      </Column>
                      <Column className="justify-end">
                        {formatMoney(o.totalAmount)}
                      </Column>
                    </div>
                  </li>
                ))}
                <li
                  className={cx("block bg-white text-sm px-3 rounded-lg py-3")}
                >
                  <Link
                    href={"/orders"}
                    className="block w-full cursor-pointer text-center hover:text-red-600"
                  >
                    المزيد
                  </Link>
                </li>
              </ul>
            </div>
            <div className="py-12 px-4 bg-white/50 rounded-lg col-span-5 lg:col-span-2">
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-bold">الحركات المالية</h2>
                <span className="text-xs text-gray-600">
                  تصفح اخر الحركات المالية
                </span>
              </div>
              <ul className=" grid-rows-{n}  grid grid-cols-1 gap-3 pt-5">
                {transactions?.slice(0, 7).map((t) => (
                  <li
                    key={t.id}
                    className={cx(
                      "block bg-white text-sm px-3 rounded-lg py-[2px]"
                    )}
                  >
                    <div
                      className={cx(
                        "grid grid-cols-2 content-center py-3 capitalize"
                      )}
                    >
                      <Column className="text-gray-500">
                        <div className="flex flex-col ">
                          <span className="text-base font-semibold text-black">
                            {t.toUserName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {t.fromUserName}
                          </span>
                        </div>
                      </Column>
                      <Column className="justify-end">
                        {t.type === "deposit" ? (
                          <p className="text-green-600">
                            {formatMoney(t.amount)}+
                          </p>
                        ) : (
                          <p className="text-red-600">
                            {formatMoney(t.amount)}-
                          </p>
                        )}
                      </Column>
                    </div>
                  </li>
                ))}
                <li
                  className={cx("block bg-white text-sm px-3 rounded-lg py-3")}
                >
                  <Link
                    href={"/transactions"}
                    className="block w-full cursor-pointer text-center hover:text-red-600"
                  >
                    المزيد
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-6 px-4 bg-white/50 rounded-lg">
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-bold">الكاشيرية</h2>
              {/* <span className="text-xs text-gray-600">
                تصفح اخر عمليات البيع
              </span> */}
            </div>
            <ul className=" grid-rows-{n}  grid grid-cols-1 gap-3 pt-5">
              {cashers?.data?.slice(0, 7).map((c) => (
                <li
                  key={c.id}
                  className={cx(
                    "block bg-white text-sm px-4 rounded-lg py-[2px]"
                  )}
                >
                  <div
                    className={cx(
                      "grid grid-cols-2 content-center py-3 capitalize"
                    )}
                  >
                    <Column className="text-gray-500">{c.username}</Column>
                    {/* <Column className="justify-center">
                      <Status status={c.} />
                    </Column> */}
                    <Column className="justify-end text-end">
                      {formatMoney(c.totalAmount)}
                    </Column>
                  </div>
                </li>
              ))}
              <li className={cx("block bg-white text-sm px-3 rounded-lg py-3")}>
                <Link
                  href={"/cashers"}
                  className="block w-full cursor-pointer text-center hover:text-red-600"
                >
                  المزيد
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};
