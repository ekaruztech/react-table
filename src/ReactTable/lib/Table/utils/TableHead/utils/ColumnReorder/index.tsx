import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Button } from 'antd'
import './_style.scss'
import Sortable from './utils/Sortable'
// eslint-disable-next-line no-unused-vars
import { ColumnProps, TableColumnProps } from '../../../../../../../types'

interface IColumnReorder {
  setColumns: (
    state: ((prev: TableColumnProps) => TableColumnProps) | TableColumnProps
  ) => void
  columns: TableColumnProps
  maxColumns: number
  minColumns: number
  defaultColumns: Array<ColumnProps>
}
const ColumnReorder: React.FC<IColumnReorder> = (props) => {
  const { setColumns, columns, maxColumns, minColumns, defaultColumns } = props

  return (
    <div className='ReactTable___table-header-cell-filter'>
      <div className='ReactTable___table-header-cell-filter-header'>
        <span className='ReactTable___table-header-cell-filter-header-text'>
          Customize Column
        </span>
      </div>
      <PerfectScrollbar>
        <Sortable
          setColumns={setColumns}
          columns={columns}
          maxColumns={maxColumns}
          minColumns={minColumns}
        />
      </PerfectScrollbar>
      <div className='ReactTable___table-header-cell-filter-footer'>
        <Button
          type='primary'
          onClick={() => null}
          style={{
            marginRight: 10
          }}
        >
          Save as preset
        </Button>
        <Button
          type='dashed'
          onClick={() => {
            setColumns({
              selected: defaultColumns?.slice?.(0, maxColumns),
              unselected:
                defaultColumns?.length > maxColumns
                  ? defaultColumns?.slice?.(0, defaultColumns.length)
                  : [],
              all: defaultColumns
            })
          }}
        >
          Clear all
        </Button>
      </div>
    </div>
  )
}
export default ColumnReorder
