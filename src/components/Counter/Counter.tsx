"use client";
import { cx } from "@/utils";
import React, { FC, useMemo, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { CounterService } from "./CounterService";

type CounterProps = {
  // handleChange: (value: number) => void;
  handleIncrease: () => void;
  handleDecrease: () => void;
  value: number;
  max?: number;
  min?: number;
};

export const Counter: FC<CounterProps> = ({
  handleIncrease,
  handleDecrease,
  value,
  max,
  min,
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  const counter = useMemo(
    () =>
      new CounterService({
        handleIncrease,
        handleDecrease,
        value,
        target: ref,
        max,
        min,
      }),
    [value, max, min]
  );

  return (
    <div
      className={cx(
        "w-[8.6em] grid grid-cols-3 border-[1px] border-light-400 rounded-[6px] bg-light"
      )}
    >
      <button
        className={cx("flex justify-center items-center")}
        onClick={counter.increase}
      >
        <FiPlus />
      </button>
      <div
        className={cx("bg-gray-100 h-[37px] flex justify-center items-center")}
      >
        <span ref={ref}>{value}</span>
      </div>
      <button
        className={cx("flex justify-center items-center")}
        onClick={counter.decrease}
      >
        <FiMinus />
      </button>
    </div>
  );
};
