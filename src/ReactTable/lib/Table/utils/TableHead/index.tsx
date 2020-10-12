import { Button, Checkbox, Popover, Tooltip } from 'antd'
import ColumnReorder from './utils/ColumnReorder'

import React from 'react'
import { motion } from 'framer-motion'
// eslint-disable-next-line no-unused-vars
import { TableColumnProps, ColumnProps } from '../../../../../types'

interface ITableHead {
  columns: TableColumnProps
  columnKeys: string[]
  selectedTableItems: any
  onSelectAll: ((e: any) => void) | undefined
  setColumns: (
    state: ((prev: TableColumnProps) => TableColumnProps) | TableColumnProps
  ) => void
  maxColumns: number
  minColumns: number
  defaultColumns: ColumnProps[]
  allowCellSelect: boolean
}

const TableHead: React.FC<ITableHead> = (props) => {
  const {
    columns,
    // columnKeys,
    selectedTableItems,
    onSelectAll,
    setColumns,
    maxColumns,
    minColumns,
    defaultColumns,
    allowCellSelect
  } = props

  return (
    <motion.thead
      className='ReactTable___table-header'
      transition={{ type: 'inertia' }}
    >
      <tr className='ReactTable___table-header-row'>
        {allowCellSelect && (
          <motion.th
            className='ReactTable___table-header-cell table-header-cell-fixed-left'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'spring',
              delay: 0.1,
              stiffness: 100,
              damping: 13
            }}
          >
            <div className='ReactTable___table-header-checkbox-container'>
              <Checkbox
                indeterminate={selectedTableItems.indeterminate}
                onChange={onSelectAll}
                checked={selectedTableItems.checkAll}
              />
            </div>
          </motion.th>
        )}
        {columns.selected.map((value, index) => {
          return (
            <motion.th
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: 'spring',
                delay: ((index || 1) + 1) * 0.1,
                stiffness: 100,
                damping: 13
              }}
              className={`ReactTable___table-header-cell ${
                index === 0 ? 'table-header-cell-fixed-left' : ''
              }`}
              key={value?.key}
            >
              <div className='ReactTable___table-header-cell-container'>
                <div className='ReactTable___table-header-cell-title'>
                  {value?.title}
                </div>
              </div>
            </motion.th>
          )
        })}
        <motion.th
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: 'spring',
            delay: (columns.selected.length || 1) * 0.1,
            stiffness: 100,
            damping: 13
          }}
          className='ReactTable___table-header-cell selectable-header-cell table-header-cell-fixed-right'
        >
          <motion.div
            className='ReactTable___table-selectable-header-cell-child-container'
          >
            <Popover
              placement='bottomRight'
              content={() => (
                <ColumnReorder
                  columns={columns}
                  setColumns={setColumns}
                  maxColumns={maxColumns}
                  minColumns={minColumns}
                  defaultColumns={defaultColumns}
                />
              )}
              trigger='click'
              style={{ borderRadius: 10 }}
            >
              <Tooltip title='Customize columns' placement='left'>
                <Button
                  type='text'
                  shape={'circle'}
                  icon={
                    <span className='anticon'>
                      <i
                        className='ri-list-settings-line column-reorder-button'
                        style={{ fontSize: 17 }}
                      />
                    </span>
                  }
                />
              </Tooltip>
            </Popover>
          </motion.div>
        </motion.th>
      </tr>
    </motion.thead>
  )
}
export default TableHead
