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
} from '../typings'
import { clamp, isFunction, isString } from 'lodash'
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
import Model from '../_utils/model'
import {
  getNonQuickFiltersOnlyColumns,
  initializeColumnsWithReorderPresets
} from '../_utils'

// TODO: Create filter priority field. defaults to advanced filter.
// TODO: If advanced filter is priority and show in quick filter that advanced filter was enabled and add button to open for clearing

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

    if (!this.props.name) {
      invariant(false, 'Name property is required in react table')
    }
    if (!isString(this.props.name)) {
      invariant(
        false,
        `Name property in react table expected a string, got ${typeof this.props
          .name} instead.`
      )
    }

    const model = Model.instantiate(this.props.name)

    const presets = initializeColumnsWithReorderPresets(
      model,
      getNonQuickFiltersOnlyColumns(this.props.columns),
      this.maxColumns,
      this.minColumns
    )
    this.state = {
      selectedTableItems: {
        itemList: [],
        indeterminate: true,
        checkAll: false
      },
      columns: {
        all: this.props.columns,
        selected: presets.selected,
        unselected: presets.unselected
      },
      // Used to remember the initial columns in getDerivedStateFromProps after the values of the columns change on re-render
      // This is important especially in the case of column type list where the list menu might be dynamic.
      __DEFAULT_PROPS_COLUMNS_: this.props.columns,
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

  static getDerivedStateFromProps(
    props: ReactTableProps,
    state: ReactTableState
  ) {
    // JSON.stringify is used in place of lodash.isEqual or Fast-equal.deepEqual, because (column) has non-serializable objects (functions)
    // JSON.stringify removes functions from the object before stringifying it.
    // Comparison will always return false if the order of props.columns changes
    // Todo: see if _.isEqual or fe.deepEqual could be manipulated to overlook functions
    if (
      JSON.stringify(props.columns) !==
      JSON.stringify(state.__DEFAULT_PROPS_COLUMNS_)
    ) {
      const model = Model.instantiate(props.name)
      const presets = initializeColumnsWithReorderPresets(
        model,
        getNonQuickFiltersOnlyColumns(props.columns),
        props.maxColumns,
        props.minColumns
      )
      return {
        __DEFAULT_PROPS_COLUMNS_: props.columns,
        columns: {
          all: props.columns,
          selected: presets.selected,
          unselected: presets.unselected
        }
      }
    }
    return null
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

    // Instantiates Model
    const model = Model.instantiate(this.props.name)

    const nonQuickFilterOnlyColumns = getNonQuickFiltersOnlyColumns(
      this.state.columns.all
    )

    const providerValue = {
      columnKeys: columnKeys,
      columns: Object.assign({}, this.state.columns, {
        all: nonQuickFilterOnlyColumns
      }),
      withQuickFilterOnlyColumns: this.state.columns,
      minColumns: this.minColumns,
      maxColumns: this.maxColumns,
      dataSource,
      setColumns: this.setColumns,
      onSelectAll: this.onSelectAll,
      onSelectedItemChange: this.onSelectedItemChange,
      selectedTableItems: this.state.selectedTableItems,
      setSelectedTableItems: this.setSelectedTableItems,
      defaultColumns: this.props.columns,
      model,
      isControlsPresent: this.state.isControlsPresent,
      onRefresh: this.props.onRefresh
    }

    const childrenLength = React.Children.count(children)
    return (
      <div
        className={`ReactTable___table-container${
          !this.state.isControlsPresent && childrenLength > 1
            ? ' ReactTable___pt5'
            : ''
        }`}
        id='ReactTable___table-container'
      >
        {!this.state.isControlsPresent && (
          <div className='ReactTable__table-no-header-present' />
        )}
        <ReactTableContext.Provider value={providerValue}>
          {children}
        </ReactTableContext.Provider>
      </div>
    )
  }
}

export { QuickFilterProps, QuickFilterApplyFn } from './lib/QuickFilter'
export { CellMenuProps } from './lib/Table'
export { ColumnProps } from '../typings'
export { ReactTable as Table }
