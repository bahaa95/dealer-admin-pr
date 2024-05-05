import React from "react";

import { Metadata } from "next";
import { TransactionsContainer } from "./_components/TransactionsContainer";

export const metadata: Metadata = {
  title: "الحركات المالية",
};

const Transactions = () => {
  return (
    <div>
      <TransactionsContainer />
    </div>
  );
};

export default Transactions;
