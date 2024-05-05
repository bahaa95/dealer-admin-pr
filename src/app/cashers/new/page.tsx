import { Metadata } from "next";
import React from "react";
import { NewCasherContainer } from "./_components";

export const metadata: Metadata = {
  title: "اضافة كاشير",
};

const NewCasher = () => {
  return (
    <main>
      <NewCasherContainer />
    </main>
  );
};

export default NewCasher;
