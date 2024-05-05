"use client";
/* eslint-disable react/display-name */
import React, { FC, forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
  placeholder?: string;
  value?: Date | null;
  onChange: (
    date: Date | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => void;
  maxDate?: Date | null;
  minDate?: Date | null;
  className?: string;
};

export const DatePicker: FC<DatePickerProps> = ({
  onChange,
  value,
  placeholder = "",
  maxDate,
  minDate,
  className = "",
}) => {
  const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <div
      style={{ border: "1px solid hsl(0, 0%, 80%)" }}
      className="rounded-[4px] px-2 py-[6px] text-black w-full relative text-base"
      onClick={onClick}
      ref={ref}
    >
      {value || (
        <span className="text-gray-500 font-normal">{placeholder}</span>
      )}
    </div>
  ));

  return (
    <div className={`w-full ${className}`}>
      <ReactDatePicker
        dateFormat="dd/MM/yyyy"
        selected={value}
        onChange={onChange}
        customInput={<CustomInput />}
        className="w-full"
        maxDate={maxDate}
        minDate={minDate}
      />
    </div>
  );
};
