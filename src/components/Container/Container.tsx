import { cx } from "@/utils";
import React, { FC } from "react";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className={cx("mx-auto w-[90%] max-w-[2000px] px-[1em] sm:px-[2em]")}>
      {children}
    </div>
  );
};
