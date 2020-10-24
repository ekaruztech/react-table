import React from 'react'
// eslint-disable-next-line no-unused-vars
import { ColumnProps, TableColumnProps } from '../../../../../types'
import { clamp, first, isBoolean, last, isFunction } from 'lodash'
import { useDimension } from '../../../../../hooks'

interface ICellExpanseSetter {
  columns: TableColumnProps
  allowCellSelect: boolean
  allowCellMenu: boolean
  enableHoverActions?:
    | [boolean, boolean]
    | [boolean]
    | boolean
    | ((source: Array<{}>) => [boolean, boolean] | [boolean] | boolean)
}
const CellExpanseSetter: React.FC<ICellExpanseSetter> = (props) => {
  const { columns, allowCellSelect, enableHoverActions = [true] } = props

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

  // if enableHoverActions is an array (and) its length is equal to 2, and either the first or the last item in a truthy | falsy value
  // or if enableHoverActions is a boolean
  // When enableHoverActions is function we want to enable it
  const allowAllHoverActions =
    (Array.isArray(enableHoverActions) &&
      enableHoverActions.length === 2 &&
      first(enableHoverActions) &&
      last(enableHoverActions)) ||
    (isBoolean(enableHoverActions) && enableHoverActions) ||
    isFunction(enableHoverActions)

  // If EnableHoverActions is an array (and) the first item is a boolean
  // or the length of enableHoverActions is equal to 2 and the last item is a boolean
  const allowOneHoverAction =
    Array.isArray(enableHoverActions) &&
    (first(enableHoverActions) ||
      (enableHoverActions.length === 2 && last(enableHoverActions)))

  const oneOrAllAllowedMin = allowAllHoverActions
    ? 120
    : allowOneHoverAction
    ? 90
    : 60
  const oneOrAllAllowedMax = allowAllHoverActions
    ? 140
    : allowOneHoverAction
    ? 90
    : 60
  const actionColumnWidth = clamp(
    columnWidth,
    oneOrAllAllowedMin,
    oneOrAllAllowedMax
  )

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
