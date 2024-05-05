import { MainLayout, Container, CanAccess } from "@/components";
import React from "react";
import { NewCasherForm } from "./NewCasherForm";

export const NewCasherContainer = () => {
  return (
    <CanAccess role="admin">
      <MainLayout className="flex justify-center items-center">
        <NewCasherForm />
      </MainLayout>
    </CanAccess>
  );
};
