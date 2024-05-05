import { MainLayout } from "@/components";
import React from "react";
import { OdoForm } from "./OdoForm";

export const OdoContainer = () => {
  return (
    <MainLayout className="flex justify-center items-center">
      <OdoForm />
    </MainLayout>
  );
};
