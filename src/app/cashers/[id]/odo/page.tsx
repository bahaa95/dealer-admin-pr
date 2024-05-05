import React from "react";
import { OdoContainer } from "./_components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "أضافة حساب أودو",
  };

const Odo = () => {
  return (
    <main>
      <OdoContainer />
    </main>
  );
};

export default Odo;
