import { Pagination } from 'antd'
import { motion } from 'framer-motion'
import React from 'react'
import './styles.scss'

interface TableFooterProps {
  currentPage: number
  handlePagination: (page: number) => void
  total: number
  loading: boolean
  isAnEmptyContent: boolean
}
const TableFooter: React.FC<TableFooterProps> = (props) => {
  const {
    currentPage,
    handlePagination,
    total,
    loading,
    isAnEmptyContent
  } = props

  return (
    <motion.div
      className='ReactTable___table-footer'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='ReactTable___table-pagination-container'>
        {!loading && !isAnEmptyContent && (
          <Pagination
            defaultCurrent={currentPage}
            showQuickJumper
            total={total}
            current={currentPage}
            onChange={handlePagination}
          />
        )}
      </div>
    </motion.div>
  )
}
export default TableFooter
