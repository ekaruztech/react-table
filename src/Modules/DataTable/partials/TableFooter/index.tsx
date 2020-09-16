import { Pagination } from "antd";
import React from "react";

type TableFooterProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<{all: number, currentPage: number}>>;
  total: number;
};
export default (props: TableFooterProps) => {
  const { currentPage, setCurrentPage, total } = props;
  return (
    <div className={"___table-footer"}>
      <div className={"___table-pagination-container"}>
        <Pagination
          // onShowSizeChange={setCurrentPage}
          defaultCurrent={currentPage}
          total={total}
        />
      </div>
    </div>
  );
};
