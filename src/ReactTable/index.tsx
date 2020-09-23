import React from 'react'
import {
  // eslint-disable-next-line no-unused-vars
  ColumnProps,
  // eslint-disable-next-line no-unused-vars
  ReactTableProps,
  // eslint-disable-next-line no-unused-vars
  ReactTableState,
  // eslint-disable-next-line no-unused-vars
  SelectedTableItems,
  // eslint-disable-next-line no-unused-vars
  TableColumnProps
} from '../types'
import { clamp, isFunction } from 'lodash'
import invariant from 'invariant'
import { ReactTableContext } from '../ReactTableContext'

import Controls from '../Controls'
import QuickFilter from '../QuickFilter'
import Table, { CellMenu } from '../Table'
// CSS
import '../styles/ant-custom.css'
import 'remixicon/fonts/remixicon.css'
import '../styles/override.scss'
import '../styles/styles.scss'

class ReactTable extends React.Component<ReactTableProps, ReactTableState> {
  static Controls = Controls
  static QuickFilter = QuickFilter
  static Body = Table
  static CellMenu = CellMenu
  protected readonly minColumns: number
  protected readonly maxColumns: number

  constructor(props: ReactTableProps) {
    super(props)
    /* Clamps min column to (3, 6) */
    this.minColumns = clamp(this.props.minColumns || 3, 3, 6)
    /* Clamps max column to (min, 6) */
    this.maxColumns = clamp(this.props.maxColumns || 3, this.minColumns, 6)
    this.state = {
      selectedTableItems: {
        itemList: [],
        indeterminate: true,
        checkAll: false
      },
      columns: {
        all: this.props.columns || [],
        selected: this.props.columns?.slice?.(0, this.maxColumns) || [],
        unselected:
          this.props.columns?.length > this.maxColumns
            ? this.props.columns?.slice?.(
                this.maxColumns,
                this.props.columns.length
              )
            : []
      }
    }
  }

  protected readonly setSelectedTableItems = (items: SelectedTableItems) => {
    this.setState((prev) => ({ ...prev, selectedTableItems: items }))
  }

  protected readonly setColumns = (
    state:
      | ((previousState: TableColumnProps) => TableColumnProps)
      | TableColumnProps
  ) => {
    this.setState((prev) => ({
      ...prev,
      columns: isFunction(state) ? state(prev.columns) : state
    }))
  }

  protected readonly onSelectedItemChange = (itemList: any) => {
    this.setSelectedTableItems({
      itemList,
      indeterminate:
        itemList.length > 0 && itemList.length !== this.props.dataSource.length,
      checkAll: itemList.length === this.props.dataSource.length
    })
  }

  protected readonly onSelectAll = (e: any) => {
    this.setSelectedTableItems({
      // @ts-ignore
      itemList: e.target.checked ? this.props.dataSource : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  }

  render() {
    const {
      // columns: defaultColumns,
      dataSource,
      children
      // name
    } = this.props

    invariant(
      Array.isArray(this.props.columns),
      `ReactTable expects columns to be of type Array, got ${typeof this.props
        .columns} instead`
    )
    invariant(
      Array.isArray(this.props.dataSource),
      `ReactTable expects dataSource to be of type Array, got ${typeof this
        .props.dataSource} instead`
    )

    /* Gets the keys of the selected columns */
    const columnKeys = this.state.columns.selected.map(
      (value: ColumnProps) => value?.key
    )

    const providerValue = {
      columnKeys: columnKeys,
      columns: this.state.columns,
      minColumns: this.minColumns,
      maxColumns: this.maxColumns,
      dataSource,
      setColumns: this.setColumns,
      onSelectAll: this.onSelectAll,
      onSelectedItemChange: this.onSelectedItemChange,
      selectedTableItems: this.state.selectedTableItems,
      setSelectedTableItems: this.setSelectedTableItems,
      defaultColumns: this.props.columns
    }

    return (
      <div className='ReactTable___table-container'>
        <ReactTableContext.Provider value={providerValue}>
          {children}
        </ReactTableContext.Provider>
      </div>
    )
  }
}

export default ReactTable
