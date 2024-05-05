import { Metadata } from "next";
import React from "react";
import { CahersContainer } from "./_components";

export const metadata: Metadata = {
  title: "الكاشير",
};

const Cahers = () => {
  return (
    <main>
      <CahersContainer />
    </main>
  );
};

export default Cahers;
