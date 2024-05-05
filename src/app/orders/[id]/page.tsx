import { Container, MainLayout, Section } from "@/components";
import React, { useEffect } from "react";

import { Metadata } from "next";
import { OderDetailes } from "./_components";
import { privateApi } from "@/lib/api";

export const metadata: Metadata = {
  title: "تفاصيل الفاتورة",
};

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <OderDetailes orderId={params?.id} />
    </div>
  );
};

export default page;
