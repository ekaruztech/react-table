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
import { ReactTableContext } from './lib/ReactTableContext'

import Controls from './lib/Controls'
import QuickFilter from './lib/QuickFilter'
import Table, { CellMenu } from './lib/Table'
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
    this.minColumns = clamp(this.props.minColumns || 3, 3, 10)
    /* Clamps max column to (min, 6) */
    this.maxColumns = clamp(this.props.maxColumns || 3, this.minColumns, 10)
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
      },
      isControlsPresent: false
      // isTableOnly: false,
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

  componentDidMount(): void {
    const { children } = this.props
    const childrenLength = React.Children.count(children)

    if (childrenLength === 0) {
      invariant(false, 'ReactTable expects at least one child')
    }

    const expectedChildren = [
      '$$REACT_TABLE_QUICK_FILTER',
      '$$REACT_TABLE_BODY',
      '$$REACT_TABLE_CONTROLS'
    ]

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const componentType = (child as React.ReactElement<any>).type[
          /* eslint-disable-next-line dot-notation */
          '__DO_NOT_MODIFY_REACT_TABLE_COMPONENT_TYPE'
        ]
        const isExpectedChild =
          componentType && expectedChildren.includes(componentType)

        if (!isExpectedChild) {
          invariant(
            false,
            `An unknown component was found as a child of ReactTable. \nReactTable expects one or all of the following [ReactTable.Controls, ReactTable.QuickFilter] and ReactTable.Body`
          )
        }
        if (isExpectedChild) {
          if (componentType === '$$REACT_TABLE_CONTROLS') {
            this.setState((prev) => ({
              ...prev,
              isControlsPresent: true
            }))
          }
        }
      }
    })

    const tableExists = React.Children.toArray(children).find((predicate) => {
      const componentType = (predicate as React.ReactElement<any>).type[
        /* eslint-disable-next-line dot-notation */
        '__DO_NOT_MODIFY_REACT_TABLE_COMPONENT_TYPE'
      ]
      return componentType === '$$REACT_TABLE_BODY'
    })

    if (!tableExists) {
      invariant(false, 'ReactTable requires ReactTable.Body to work')
    }
  }

  render() {
    const {
      // columns: defaultColumns,
      dataSource,
      children
      // name
    } = this.props

    if (!Array.isArray(this.props.columns)) {
      invariant(
        false,
        `ReactTable expects columns to be of type Array, got ${typeof this.props
          .columns} instead`
      )
    }

    if (!Array.isArray(this.props.dataSource)) {
      invariant(
        false,
        `ReactTable expects dataSource to be of type Array, got ${typeof this
          .props.dataSource} instead`
      )
    }

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

    const childrenLength = React.Children.count(children)
    return (
      <div
        style={
          !this.state.isControlsPresent
            ? { borderTop: '1.3px solid var(--border)' }
            : {}
        }
        className={`ReactTable___table-container${
          this.state.isControlsPresent
            ? ''
            : ` no-header-present${childrenLength > 1 ? ' pt5' : ''}`
        }`}
      >
        <ReactTableContext.Provider value={providerValue}>
          {children}
        </ReactTableContext.Provider>
      </div>
    )
  }
}

export { QuickFilterProps, QuickFilterApplyFn } from './lib/QuickFilter'
export { CellMenuProps } from './lib/Table'
export { ColumnProps } from '../types'
export { ReactTable as Table }
