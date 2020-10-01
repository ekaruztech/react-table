import React from 'react'
// eslint-disable-next-line no-unused-vars
import { ColumnProps, TableColumnProps } from '../../../../../types'
import { clamp } from 'lodash'
import { useDimension } from '../../../../../hooks'

interface ICellExpanseSetter {
  columns: TableColumnProps
  allowCellSelect: boolean
  allowCellMenu: boolean
}
const CellExpanseSetter: React.FC<ICellExpanseSetter> = (props) => {
  const { columns, allowCellSelect } = props

  const dimension = useDimension(
    'element',
    'ReactTable___table_wrapper-identifier'
  )

  const UNUSED_COLUMN_WIDTH = 60
  const DEFAULT_COLUMN_WIDTH = 150
  const COMPUTED_COLUMN_WIDTH =
    dimension.width / columns.selected.length - UNUSED_COLUMN_WIDTH

  const COLUMN_WIDTH = clamp(
    COMPUTED_COLUMN_WIDTH,
    DEFAULT_COLUMN_WIDTH,
    DEFAULT_COLUMN_WIDTH * 12
  )
  const ACTION_WIDTH = clamp(COLUMN_WIDTH, 120, 150)

  return (
    <colgroup>
      {allowCellSelect && (
        <col
          style={{
            width: UNUSED_COLUMN_WIDTH,
            minWidth: UNUSED_COLUMN_WIDTH,
            maxWidth: UNUSED_COLUMN_WIDTH
          }}
        />
      )}
      {columns.selected.map((column: ColumnProps, index: any) => {
        const span = clamp(column?.columnSpan || 0, 1, 12)
        return (
          <col
            key={index}
            style={{
              width: span * COLUMN_WIDTH,
              minWidth: span * COLUMN_WIDTH
            }}
          />
        )
      })}

      <col
        style={{
          width: ACTION_WIDTH,
          minWidth: ACTION_WIDTH,
          maxWidth: ACTION_WIDTH
        }}
      />
    </colgroup>
  )
}

export default CellExpanseSetter
