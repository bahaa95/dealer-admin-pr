import React, { FC } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { cx } from "@/utils";

type MainLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const MainLayout: FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div>
      <Header />
      <div
        className={cx(
          "pt-7 pb-[5em] bg-[url('/bg.png')] min-h-screen",
          className
        )}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};
