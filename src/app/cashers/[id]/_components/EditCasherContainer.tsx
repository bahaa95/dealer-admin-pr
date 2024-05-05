import { MainLayout } from "@/components";
import React from "react";
import { EditCasherForm } from "./EditCasherForm";

export const EditCasherContainer = () => {
  return (
    <MainLayout className="flex justify-center items-center">
      <EditCasherForm />
    </MainLayout>
  );
};
