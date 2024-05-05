import { Metadata } from "next";
import React from "react";
import { EditCasherContainer } from "./_components";

export const metadata: Metadata = {
  title: "معلومات الكاشير",
};

const CasherInfo = () => {
  return (
    <main>
      <EditCasherContainer />
    </main>
  );
};

export default CasherInfo;
