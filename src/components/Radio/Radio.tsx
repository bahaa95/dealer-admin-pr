"use client";
import React, { FC, useRef } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import "./styles.scss";
import { cx } from "@/utils";

type RadioProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
};

export const Radio: FC<RadioProps> = ({ label, ...props }) => {
  const radioRef = useRef<HTMLInputElement | null>(null);

  return (
    <div id="radio" className="select-none">
      <label>
        <input ref={radioRef} {...props} type="radio" />
        <div
          className={cx(
            "radio py-[2em] px-[1.5em] border border-gray-400 rounded-[24px] text-silent flex justify-between items-center cursor-pointer transition-colors []"
          )}
        >
          <h3 className={cx("  font-semibold")}>{label}</h3>
          <ImCheckboxChecked className={cx("text-red-600 check-box")} />
        </div>
      </label>
    </div>
  );
};
