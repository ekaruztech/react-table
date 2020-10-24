import React, { useState, FC } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Button, Checkbox } from 'antd'
import './style.scss'
import Sortable from './utils/Sortable'
// eslint-disable-next-line no-unused-vars
import { ColumnProps, TableColumnProps } from '../../../../../../../types'
// eslint-disable-next-line no-unused-vars
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { ReactTableContext } from '../../../../../ReactTableContext'
// eslint-disable-next-line no-unused-vars
import Model from '../../../../../../../_utils/model'

interface IColumnReorder {
  setColumns: (
    state: ((prev: TableColumnProps) => TableColumnProps) | TableColumnProps
  ) => void
  columns: TableColumnProps
  maxColumns: number
  minColumns: number
  defaultColumns: Array<ColumnProps>
}
const ColumnReorder: FC<IColumnReorder> = (props) => {
  const { setColumns, columns, maxColumns, minColumns, defaultColumns } = props

  const Renderer: FC<{ model: Model }> = (props) => {
    const { model } = props
    const [saveAsPreset, setSaveAsPreset] = useState(model.columnReorder.save)

    const handleSaveAsPreset = (value: CheckboxChangeEvent) => {
      model.store('columnReorder', {
        saveAsPreset: value.target.checked
      })
      setSaveAsPreset(value.target.checked)
    }

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
            model={model}
          />
        </PerfectScrollbar>
        <div className='ReactTable___table-header-cell-filter-footer'>
          <Checkbox onChange={handleSaveAsPreset} checked={saveAsPreset}>
            Save as preset
          </Checkbox>
          <Button
            type='dashed'
            onClick={() => {
              if (model.columnReorder.save) {
                model.store('columnReorder', {
                  presets: defaultColumns
                    ?.slice?.(0, maxColumns)
                    .map((column) => column.key)
                })
              }
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
  return (
    <ReactTableContext.Consumer>
      {({ model }) => {
        return <Renderer model={model} />
      }}
    </ReactTableContext.Consumer>
  )
}
export default ColumnReorder
