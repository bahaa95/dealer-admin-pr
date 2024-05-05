import { cx } from "@/utils";
import React, { FC } from "react";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export const Section: FC<SectionProps> = ({ children, className }) => {
  return (
    <section
      className={cx(
        "bg-white/50 border border-white rounded-[12px] py-[2em] px-[1.2em]",
        className
      )}
    >
      {children}
    </section>
  );
};
