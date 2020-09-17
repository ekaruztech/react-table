import { Pagination } from "antd";
import { motion } from "framer-motion";
import React from "react";

type TableFooterProps = {
  currentPage: number;
  handlePagination: (page: number) => void;
  total: number;
  isLoadingContent: boolean;
  isAnEmptyContent: boolean;
};
export default (props: TableFooterProps) => {
  const { currentPage, handlePagination, total, isLoadingContent, isAnEmptyContent } = props;
  return !isLoadingContent && !isAnEmptyContent? (
    <motion.div
      className={"___table-footer"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={"___table-pagination-container"}>
        <Pagination
          defaultCurrent={currentPage}
          showQuickJumper
          total={total}
          current={currentPage}
          onChange={handlePagination}
        />
      </div>
    </motion.div>
  ) : null;
};
