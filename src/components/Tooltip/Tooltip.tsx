"use client";
import React, { FC } from "react";
import "./styles.scss";

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

export const Tooltip: FC<TooltipProps> = (props) => {
  const { text, children } = props;
  return (
    <div className="tooltip">
      {children}
      <span className="tooltiptext select-none">{text}</span>
    </div>
  );
};
