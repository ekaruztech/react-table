import React from 'react'
// eslint-disable-next-line no-unused-vars
import { ColumnProps, TableColumnProps } from '../../../../../typings'
import { clamp, isBoolean, isFunction } from 'lodash'
import { useDimension } from '../../../../../hooks'
import { findTruthies } from '../../../../../_utils'

interface ICellExpanseSetter {
  columns: TableColumnProps
  allowCellSelect: boolean
  allowCellMenu: boolean
  enableHoverActions?:
    | [boolean, boolean, boolean]
    | [boolean, boolean]
    | [boolean]
    | boolean
    | ((
        source: Array<{}>
      ) =>
        | [boolean, boolean, boolean]
        | [boolean, boolean]
        | [boolean]
        | boolean)
}
const CellExpanseSetter: React.FC<ICellExpanseSetter> = (props) => {
  const { columns, allowCellSelect, enableHoverActions = [true] } = props

  const dimension = useDimension(
    'element',
    'ReactTable___table_wrapper-identifier'
  )

  // Currently displaying columns.
  const selectedColumnLength = columns.selected.length
  // width for  checkbox
  const selectColumnWidth = 60
  // min column width
  const minColumnWidth = 160
  // computes column width using the table width and enables resize on dimension change
  // subs the selectColumnWidth from dimension width and divides by the length of selected columns + 1(action column)
  const computedColumnWidth =
    (dimension.width - selectColumnWidth) / (selectedColumnLength + 1)

  // clamps the computed value withing the minColumnWidth and minColumnWidth * 2
  const columnWidth = clamp(
    computedColumnWidth,
    minColumnWidth,
    minColumnWidth * 2
  )

  let actionColumnWidthBounds = 60

  if (Array.isArray(enableHoverActions)) {
    const truthyHoverActions = findTruthies(enableHoverActions)
    if (truthyHoverActions >= 3) {
      actionColumnWidthBounds = 160
    }
    if (truthyHoverActions === 2) {
      actionColumnWidthBounds = 120
    }
    if (truthyHoverActions === 1) {
      actionColumnWidthBounds = 90
    }
  } else if (isBoolean(enableHoverActions)) {
    actionColumnWidthBounds = 160
  } else if (isFunction(enableHoverActions)) {
    actionColumnWidthBounds = 160
  }

  const actionColumnWidth = clamp(
    columnWidth,
    actionColumnWidthBounds,
    actionColumnWidthBounds
  )

  // Adds the remaining value from the clamped actionColumnWidth to the rest of the columns.
  // // (columnWidth - actionColumnWidth) / selectedColumnLength -- adds or remove excesses from  evenly from all all the columns
  // columnWidth =
  //   columnWidth + (columnWidth - actionColumnWidth) / selectedColumnLength

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
        const span = clamp(column?.columnSpan || 1, 0.5, 12)
        return (
          <col
            key={index}
            style={{
              width: span * columnWidth - 1,
              minWidth: span * columnWidth - 1
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
