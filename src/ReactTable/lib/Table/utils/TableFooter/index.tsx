import { Pagination } from 'antd'
import { motion } from 'framer-motion'
import React from 'react'

interface ITableFooter {
  currentPage: number
  handlePagination: (page: number) => void
  total: number
  loading: boolean
  isAnEmptyContent: boolean
}
const TableFooter: React.FC<ITableFooter> = (props) => {
  const {
    currentPage,
    handlePagination,
    total,
    loading,
    isAnEmptyContent
  } = props
  return !loading && !isAnEmptyContent ? (
    <motion.div
      className='ReactTable___table-footer'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='ReactTable___table-pagination-container'>
        <Pagination
          defaultCurrent={currentPage}
          showQuickJumper
          total={total}
          current={currentPage}
          onChange={handlePagination}
        />
      </div>
    </motion.div>
  ) : null
}
export default TableFooter
