import React from "react";

import { Metadata } from "next";
import { WalletInfoContainer } from "./_components/WalletInfoContainer";

export const metadata: Metadata = {
  title: "معلومات المحفظة",
};

const WalletPage = () => {
  return (
    <div>
      <WalletInfoContainer />
    </div>
  );
};

export default WalletPage;
