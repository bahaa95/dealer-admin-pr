import { cx } from "@/utils";
import { FC, useState } from "react";
import { motion } from "framer-motion";

import Select from "react-select";
import { IFilter } from "../_types";
import { DatePicker } from "@/components";

type AdvanceFilterTypes = {
  className: string;
  show: boolean;
  handleSearch: (filter: IFilter) => void | Promise<void>;
};

const statusOptions = [
  { value: "PENDING", label: "قيد الانتظار" },
  { value: "COMPLETED", label: "مكتمل" },
  { value: "FAILED", label: "فشل" },
];

const pay = [
  { value: "strawberry", label: "زين كاش" },
  { value: "fff", label: "بطاقة ائتمانية" },
  { value: "vanilla", label: "كشك" },
];

const typesOptions = [
  { value: "wifi", label: "wifi" },
  { value: "ftth", label: "ftth" },
];

const initialFilter = {
  dateFrom: null,
  dateTo: null,
  paymentStatus: null,
  pay: null,
  type: null,
  search: null,
};

export const AdvanceFilter: FC<AdvanceFilterTypes> = ({
  className,
  show,
  handleSearch,
}) => {
  const [filter, setFilter] = useState<IFilter>(initialFilter);

  return (
    <motion.div
      animate={{ height: show ? "auto" : 0 }}
      initial={{ height: 0 }}
      className="overflow-hidden"
    >
      <div
        className={cx(
          className,
          "grid grid-cols-8  gap-4 rounded-md bg-white p-4"
        )}
      >
        <input
          value={filter.search || ""}
          type="text"
          name="search"
          style={{ border: "1px solid hsl(0, 0%, 80%)" }}
          className="rounded-[4px] px-2 py-[6px] text-black relative text-base col-span-1"
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              search: e.target.value,
            }));
          }}
          placeholder="بحث"
        />
        <Select
          value={typesOptions.find((t) => t.value === filter.type) || null}
          className="col-span-1"
          options={typesOptions}
          placeholder="النوع"
          isClearable
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              type: (e?.value as any) || null,
            }));
          }}
        />
        <Select
          value={
            statusOptions.find((s) => s.value === filter.paymentStatus) || null
          }
          className="col-span-1"
          options={statusOptions}
          placeholder="الحالة"
          isClearable
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              paymentStatus: (e?.value as any) || null,
            }));
          }}
        />
        <Select
          value={pay.find((p) => p.value === filter.pay) || null}
          className="col-span-1"
          options={pay}
          placeholder="عملية الدفع"
          isClearable
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              pay: e?.value || null,
            }));
          }}
        />
        <DatePicker
          className="col-span-1"
          value={filter.dateFrom ? new Date(filter.dateFrom) : null}
          onChange={(d) => {
            const dateTo = filter.dateTo
              ? new Date(filter.dateTo).getTime()
              : 0;

            setFilter((prev) => ({
              ...prev,
              // clear dateTo if dateFrom greater from it
              dateTo: d && d.getTime() > dateTo ? null : prev.dateTo,
              dateFrom: d ? d.toString() : null,
            }));
          }}
          placeholder="التاريخ من"
        />

        <DatePicker
          className=" col-span-1"
          value={filter.dateTo ? new Date(filter.dateTo) : null}
          onChange={(d) => {
            setFilter((prev) => ({
              ...prev,
              dateTo: d ? d.toString() : null,
            }));
          }}
          placeholder="التاريخ الى"
          minDate={filter.dateFrom ? new Date(filter.dateFrom) : null}
        />
        <button
          onClick={() => {
            handleSearch(filter);
          }}
          className="h-9 w-full rounded-md bg-green-500 text-white hover:bg-green-600 col-span-1"
        >
          بحث
        </button>
        <button
          onClick={() => {
            setFilter(initialFilter);
            handleSearch(initialFilter);
          }}
          className="h-9 w-full rounded-md bg-red-500 text-white hover:bg-gray-600 col-span-1"
        >
          محو
        </button>
      </div>
    </motion.div>
  );
};
