import { Button, Checkbox, Popover, Tooltip } from 'antd'
import ColumnReorder from './utils/ColumnReorder'

import React from 'react'
import { motion } from 'framer-motion'
// eslint-disable-next-line no-unused-vars
import { TableColumnProps, ColumnProps } from '../../../types'

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
    columnKeys,
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
      <tr className='ReactTable___table-columns'>
        {allowCellSelect && (
          <motion.th
            className='ReactTable___table-column'
            style={{
              width: '64px'
            }}
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            transition={{
              type: 'spring',
              delay: 0.02,
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
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              transition={{
                type: 'spring',
                delay: ((index || 1) + 1) * 0.02,
                stiffness: 100,
                damping: 13
              }}
              className='ReactTable___table-column'
              key={value?.key}
              style={{
                width: `calc(100% / ${columnKeys.length + 2}) - ${
                  allowCellSelect ? '64px' : '120px'
                }`
              }}
            >
              <div className='ReactTable___table-column-container'>
                <div className='ReactTable___table-column-title'>
                  {value?.title}
                </div>
              </div>
            </motion.th>
          )
        })}
        <th
          className='ReactTable___table-column selectable-columns'
          style={{
            width: 64
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className='ReactTable___table-selectable-columns-child-container'
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
                  type='link'
                  style={{ background: 'transaparent' }}
                  icon={
                    <span className='anticon'>
                      <span className='anticon'>
                        <i
                          className='ri-list-settings-line'
                          style={{ fontSize: 17 }}
                        />
                      </span>
                    </span>
                  }
                />
              </Tooltip>
            </Popover>
          </motion.div>
        </th>
      </tr>
    </motion.thead>
  )
}
export default TableHead
