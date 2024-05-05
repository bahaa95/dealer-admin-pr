"use client";
import { useAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { useGetTransactions } from "../_api";
import { Container, DataGrid, Loader, MainLayout } from "@/components";
import { transactionsColumns } from "./transactionsColumns";

export const TransactionsContainer = () => {
  const { auth } = useAuth();
  // redirect to login if user not authentecated
  if (!auth.isAuthenticated) {
    redirect("/login");
  }

  const { isLoading, data: transactions } = useGetTransactions();

  if (isLoading) {
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
        <div className="pb-[2em] pt-[7em]">
          <DataGrid
            rowData={transactions || []}
            columnDefs={transactionsColumns()}
          />
        </div>
      </Container>
    </MainLayout>
  );
};
