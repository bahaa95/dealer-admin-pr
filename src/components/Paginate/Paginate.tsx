"use client";
import ReactPaginate from "react-paginate";
import "./styles.scss";
import Select from "react-select";
import { useState } from "react";

const itemsPerPageOptions = [
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
];

interface PaginateProps {
  handlePageChange: (page: number) => void;
  handleItemsPerPageChange: (page: number) => void;
  // itemsPerPage: number;
  total: number;
  page: number;
}

export function Paginate({
  handlePageChange,
  handleItemsPerPageChange,
  // itemsPerPage,
  total,
  page,
}: PaginateProps) {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const pageCount = Math.ceil(total / itemsPerPage);

  const handlePageClick = (slectedItem: { selected: number }) => {
    handlePageChange(slectedItem.selected);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center items-center mt-[2em] ">
      <div className="me-8 text-sm relative z-[50]">
        <Select
          value={itemsPerPageOptions.find((t) => t.value === itemsPerPage)}
          options={itemsPerPageOptions}
          onChange={(e) => {
            setItemsPerPage(e?.value as any);
            handleItemsPerPageChange(e?.value as any);
          }}
        />
      </div>
      <ReactPaginate
        forcePage={page}
        breakLabel="..."
        nextLabel={"التالي"}
        previousLabel=""
        onPageChange={handlePageClick}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        containerClassName="paginate select-none"
        pageClassName="paginate-item"
        nextClassName="paginate-item next"
        pageLinkClassName="paginate-link"
        activeClassName="paginate-item active"
        breakClassName="paginate-link"
      />
    </div>
  );
}
