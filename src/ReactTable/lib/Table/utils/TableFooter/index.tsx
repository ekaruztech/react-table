import { Pagination } from 'antd'
import { motion } from 'framer-motion'
import React from 'react'
import './styles.scss'
import Model from '../../../../../_utils/model'

interface TableFooterProps {
  currentPage: number
  handlePagination: (page: number) => void
  total: number
  loading: boolean
  isAnEmptyContent: boolean
  model: Model
}
const TableFooter: React.FC<TableFooterProps> = (props) => {
  const {
    currentPage,
    handlePagination,
    total,
    loading,
    model,
    isAnEmptyContent
  } = props

  const onPaginate = (page: number) => {
    handlePagination(page)
    model.store(
      'pagination',
      {
        page
      },
      { override: true }
    )
  }
  return (
    <motion.div
      className='ReactTable___table-footer'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        borderTop:
          isAnEmptyContent && !loading ? '1.3px solid var(--border)' : 0
      }}
    >
      <div className='ReactTable___table-pagination-container'>
        {!loading && (
          <Pagination
            defaultCurrent={currentPage}
            showQuickJumper
            total={total}
            current={currentPage}
            onChange={onPaginate}
            pageSize={model?.renderOrder?.selected || 15}
          />
        )}
      </div>
    </motion.div>
  )
}
export default TableFooter
