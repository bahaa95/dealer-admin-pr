"use client";

import { usePrivateApi } from "@/lib/api";
import { formatMoney, toUrl } from "@/utils";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import Select from "react-select";

import { Status } from "./Status";
import { Column } from "@/components/Column";
import { ActionButton } from "./ActionButton";
import { Paginate } from "@/components/Paginate";
import IconFilter from "@/components/icon/icon-filter";
import {
  IExportToExcelResponse,
  IFilter,
  IOrderResponse,
  IOrdersResponse,
} from "../_types";
import { AdvanceFilter } from "./AdvanceFilter";
import { Container, DataGrid, Loader, MainLayout, Tooltip } from "@/components";
import { useAuth } from "@/lib/auth";
import { RiFileExcel2Line } from "react-icons/ri";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";

const columns = [
  {
    headerName: "رقم الطلب",
    field: "id",
    valueGetter: (p: { data: IOrderResponse }) => p.data.id,
    width: 100,
    cellRenderer: (p: { data: IOrderResponse }) => <Column>{p.data.id}</Column>,
  },
  {
    headerName: "اسم الكاشير",
    field: "username",
    sortable: false,
    valueGetter: (p: { data: IOrderResponse }) => p.data.employee.fullName,
    cellRenderer: (p: { data: IOrderResponse }) => p.data.employee.fullName,
  },
  {
    headerName: "الحالة",
    field: "status",
    sortable: false,
    valueGetter: (p: { data: IOrderResponse }) => p.data.Payment.paymentStatus,
    cellRenderer: (p: { data: IOrderResponse }) => (
      <Status status={p.data.Payment.paymentStatus} />
    ),
  },
  // {
  //   headerName: "النوع",
  //   field: "type",
  //   sortable: false,
  //   valueGetter: (p: { data: IOrderResponse }) => p.data.manger?.username,
  //   cellRenderer: (p: { data: IOrderResponse }) =>
  //     p.data.manger?.username?.split("/")[0],
  // },
  {
    headerName: "المبلغ",
    field: "totalAmount",
    valueGetter: (p: { data: IOrderResponse }) => p.data.totalAmount,
    cellRenderer: (p: { data: IOrderResponse }) => (
      <div className="flex items-center">
        <h1 className="m-w-[50px]">{formatMoney(p.data.totalAmount)}</h1>
        <span className="text-xs mx-1 text-slate-500">IQD</span>
      </div>
    ),
  },
  {
    headerName: "طريقة الدفع",
    field: "method",
    sortable: false,
    cellRenderer: (p: { data: IOrderResponse }) => (
      <h1>{p.data?.Payment?.paymentMethod}</h1>
    ),
  },
  {
    headerName: "تاريخ العملية",
    field: "createdAt",
    valueGetter: (p: { data: IOrderResponse }) =>
      new Date(p.data?.createdAt).getTime(),
    cellRenderer: (p: { data: IOrderResponse }) =>
      new Date(p.data?.createdAt).toLocaleString("en-GB"),
  },
  {
    headerName: "العمليات",
    field: "actions",
    sortable: false,
    cellRenderer: (p: { data: IOrderResponse }) => (
      <div className="flex items-center pt-2">
        <ActionButton
          className="border-xl flex gap-2 items-center w-[8em] h-[2.2em]"
          href={`/orders/${p.data.id}`}
        >
          <span>عرض</span>
          <FiChevronLeft className="mt-[2px]" size={15} />
        </ActionButton>
      </div>
    ),
  },
];

export const Home = () => {
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
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterShow, setFilterShow] = useState(false);
  const [filter, setFilter] = useState<IFilter>({
    dateFrom: null,
    dateTo: null,
    paymentStatus: null,
    pay: null,
    type: null,
    search: null,
  });
  const [sort, setSort] = useState<Record<string, string | null>>({
    sortBy: null,
    sortDirection: null,
  });

  useEffect(() => {
    handleFetchOrders(filter);
  }, [page, itemsPerPage, sort]);

  const handleFetchOrders = async (filter: IFilter) => {
    setFetching(true);
    const params = toUrl({
      ...filter,
      dateFrom: filter.dateFrom
        ? new Date(filter.dateFrom).toISOString()
        : null,
      dateTo: filter.dateTo ? new Date(filter.dateTo).toISOString() : null,
      ...sort,
    });

    api
      .get<IOrdersResponse>(
        `/casher/orders/admin?page=${page}&limit=${itemsPerPage}&${params}`,
        {
          headers: { "x-sas": auth.sas },
        }
      )
      .then((res) => setOrders(res.data))
      .finally(() => {
        setLoading(false);
        setFetching(false);
      });
  };

  const excelExport = async () => {
    const params = toUrl({
      ...filter,
      dateFrom: filter.dateFrom
        ? new Date(filter.dateFrom).toISOString()
        : null,
      dateTo: filter.dateTo ? new Date(filter.dateTo).toISOString() : null,
    });

    api
      .get<IExportToExcelResponse>(
        `/manger-api/orders/admin/report?${params}`,
        {
          headers: { "x-sas": auth.sas },
        }
      )
      .then((res) =>
        saveAs(
          `https://notify.supercellnetwork.com/api/attachment/download/${res.data?.path}`,
          res.data?.path
        )
      )
      .catch(() => toast.error("فشل تحميل الملف. الرجاء المحاولة مرة اخرى"));
  };

  const handleExcelExport = useDebouncedCallback(excelExport, 1500);

  const onSortChanged = (e: any) => {
    const sortState = e.columnApi
      .getColumnState()
      .filter(function (s: any) {
        return s.sort != null;
      })
      .map(function (s: any) {
        return { colId: s.colId, sort: s.sort, sortIndex: s.sortIndex };
      });

    const sortedCol = sortState[0] || {};
    setSort({
      sortBy: sortedCol?.colId || null,
      sortDirection: sortedCol.sort || null,
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <Container>
        <div className=" pb-[5em] pt-12">
          <div>
            <div className="flex justify-between gap-4 py-4">
              <div className="flex  flex-col">
                <h3 className="text-[2rem] font-bold text-gray-800">الطلبات</h3>
              </div>
              <div className="flex gap-4">
                <div
                  className="mr-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-[crimson] hover:bg-red-700"
                  onClick={() => setFilterShow(!filterShow)}
                >
                  <IconFilter className="cursor-pointer" fill={filterShow} />
                </div>
                <Tooltip text="حفظ كملف أكسل">
                  <div
                    onClick={handleExcelExport}
                    className="bg-primary cursor-pointer p-3 text-gray-200 text-2xl rounded-md hover:opacity-80 transition-opacity"
                  >
                    <RiFileExcel2Line />
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="bg-white rounded-lg">
              <AdvanceFilter
                show={filterShow}
                className={""}
                handleSearch={async (f) => {
                  setPage(1);
                  setFilter(f);
                  await handleFetchOrders(f);
                }}
              />
              {/* orders list */}
              <DataGrid
                rowData={orders.data || []}
                columnDefs={columns}
                isLoading={fetching}
                onSortChanged={onSortChanged}
              />
            </div>

            <Paginate
              page={page - 1}
              handleItemsPerPageChange={(i) => setItemsPerPage(i)}
              handlePageChange={(page) => setPage(++page)}
              total={orders.meta?.total}
            />
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};
