"use client";
import { AgGridReact, AgGridReactProps } from "ag-grid-react"; // AG Grid Component
import { FC } from "react";

type DataGridProps = AgGridReactProps & { isLoading?: boolean };

export const DataGrid: FC<DataGridProps> = ({
  isLoading = false,
  className = "",
  ...props
}) => {
  return (
    <div
      style={{ height: 600, direction: "rtl" }}
      className={`ag-theme-quartz ${
        isLoading ? "opacity-70 pointer-events-none" : ""
      } ${className}`}
    >
      <AgGridReact {...props} rowHeight={50} enableRtl={true} />
    </div>
  );
};
