"use client";
import {
  MainLayout,
  Container,
  DataGrid,
  Loader,
  CanAccess,
} from "@/components";
import React, { useState } from "react";
import { useGetCashers } from "../_api";
import { cashersColumns } from "./casherColumns";
import { Paginate } from "@/components/Paginate";
import { Search } from "@/components/icon/search";
import Link from "next/link";
import { ErrorComponent } from "@/components/Error";
import { useAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const CahersContainer = () => {
  const { auth } = useAuth();
  // redirect to login if user not authentecated
  if (!auth.isAuthenticated) {
    redirect("/login");
  }

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const {
    data: cashers,
    isPending,
    isLoading,
    error,
  } = useGetCashers({
    filter: {
      page,
      search,
      limit: itemsPerPage,
    },
  });

  if (isLoading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <ErrorComponent
          title={error?.name}
          message={error?.message || "حدث خطأ أثناء جلب المعلومات"}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        <div className="pb-[5em] pt-12">
          <div className="flex justify-between gap-4 py-10">
            <h3 className="text-[2rem] font-bold text-gray-800">الكاشير</h3>

            <CanAccess role="admin">
              <div className="flex gap-4">
                <Link
                  className="mr-2 px-4 flex cursor-pointer items-center text-white text-sm justify-center rounded-md bg-[crimson] hover:bg-red-700"
                  href={"/cashers/new"}
                >
                  أضافة كاشير
                </Link>
              </div>
            </CanAccess>
          </div>
          <div className="bg-white rounded-lg">
            <div>
              <div>
                <label
                  htmlFor="search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                  بحث
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <Search />
                  </div>
                  <input
                    value={searchInput}
                    type="search"
                    id="search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  outline-none"
                    placeholder="البحث عن كاشير"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!value) {
                        setSearch("");
                      }
                      setSearchInput(e.target.value);
                    }}
                    required
                  />
                  <button
                    type="submit"
                    onClick={() => setSearch(searchInput)}
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 outline-none font-medium rounded-lg text-sm px-4 py-2 "
                  >
                    بحث
                  </button>
                </div>
              </div>
            </div>
            {/* orders list */}
            <DataGrid
              rowData={cashers?.data || []}
              columnDefs={cashersColumns()}
              isLoading={isPending}
            />
          </div>
          <div className="">
            <Paginate
              page={page - 1}
              handleItemsPerPageChange={(i) => setItemsPerPage(i)}
              handlePageChange={(page) => setPage(++page)}
              total={cashers?.meta?.total || 0}
            />
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};
