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

  const selectedColumnLength = columns.selected.length
  // width for select column
  const selectColumnWidth = 60
  // min column width
  const minColumnWidth = 150
  // computes column width using the table width and enables resize on dimension change
  // subs the selectColumnWidth from dimension width and divides by the length of selected columns + 1(action column)
  const computedColumnWidth =
    (dimension.width - selectColumnWidth) / (selectedColumnLength + 1)

  // clamps the computed value withing the minColumnWidth and minColumnWidth * 2
  let columnWidth = clamp(
    computedColumnWidth,
    minColumnWidth,
    minColumnWidth * 2
  )

  // clamps the action width (within the columnWidth, 120 and minColumnWidth)
  const actionColumnWidth = clamp(columnWidth, 120, minColumnWidth)

  // Adds the remaining value from the clamped actionColumnWidth to the rest of the columns.
  columnWidth =
    columnWidth + (columnWidth - actionColumnWidth) / selectedColumnLength

  return (
    <colgroup>
      {allowCellSelect && (
        <col
          style={{
            width: selectColumnWidth,
            minWidth: selectColumnWidth,
            maxWidth: selectColumnWidth
          }}
        />
      )}
      {columns.selected.map((column: ColumnProps, index: any) => {
        const span = clamp(column?.columnSpan || 0, 1, 12)
        return (
          <col
            key={index}
            style={{
              width: span * columnWidth,
              minWidth: span * columnWidth
            }}
          />
        )
      })}

      <col
        style={{
          width: actionColumnWidth,
          minWidth: actionColumnWidth,
          maxWidth: actionColumnWidth
        }}
      />
    </colgroup>
  )
}

export default CellExpanseSetter
