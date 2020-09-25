import React from 'react'
// eslint-disable-next-line no-unused-vars
import { ColumnProps, TableColumnProps } from '../../../../../types'
import { clamp } from 'lodash'

interface ICellExpanseSetter {
  columns: TableColumnProps
}
const CellExpanseSetter: React.FC<ICellExpanseSetter> = (props) => {
  const { columns } = props

  const UNUSED_COLUMN_WIDTH = 60
  const DEFAULT_COLUMN_WIDTH = 152

  return (
    <colgroup>
      <col
        style={{
          width: UNUSED_COLUMN_WIDTH,
          minWidth: UNUSED_COLUMN_WIDTH
        }}
      />
      {columns.selected.map((column: ColumnProps, index: any) => {
        const span = clamp(column?.columnSpan || 0, 1, 12)
        return (
          <col
            key={index}
            style={{
              width: span * DEFAULT_COLUMN_WIDTH,
              minWidth: span * DEFAULT_COLUMN_WIDTH
            }}
          />
        )
      })}
      <col
        style={{ width: UNUSED_COLUMN_WIDTH, minWidth: UNUSED_COLUMN_WIDTH }}
      />
    </colgroup>
  )
}

export default CellExpanseSetter
