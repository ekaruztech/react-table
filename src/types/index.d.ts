// eslint-disable-next-line no-unused-vars
import React, { ReactElement } from 'react'
// eslint-disable-next-line no-unused-vars
import { CellMenuProps } from '../ReactTable/lib/Table/utils/CellMenu'

export declare type PresentationColor =
  | 'magenta'
  | 'volcano'
  | 'orange'
  | 'gold'
  | 'geekblue'
  | 'red'
  | 'lime'
  | 'green'
  | 'cyan'
  | 'processing'
  | 'blue'
  | 'purple'
  | 'default'

export declare type PresentationType = 'tag'
export declare type ActionPresentationType =
  | 'primary'
  | 'default'
  | 'link'
  | 'text'
  | 'ghost'
  | 'dashed'

export declare type ColumnType =
  | 'text'
  | 'boolean'
  | 'datetime'
  | 'date'
  | 'number'
  | 'action'
  | 'currency'
  | 'list'

export interface ColumnProps {
  title: string
  dataIndex: string
  key: string
  type: ColumnType
  autoComplete?: boolean
  multiple?: boolean
  bold?: boolean
  presentationType?: PresentationType
  presentationColor?: PresentationColor | ((value: string) => PresentationColor)
  actionPresentationType?: ActionPresentationType
  listMenu?: Array<{ label: string; value: string | number }>
  actionCallback?: (source: any) => void
  actionTitle?: string
  dateFormat?: string
  currency?: string
  columnSpan?: number
}
export interface TableColumnProps {
  all: Array<ColumnProps>
  selected: Array<ColumnProps>
  unselected: Array<ColumnProps>
}

export interface FilterProps {
  filterIndex: number
  filterProps: {
    property: null | string
    type: null | string
    value: null | string | boolean | number | Date
  }
}

export type TableFilterProps = ColumnProps & FilterProps

export interface TableFilterState {
  filters: Array<FilterProps>
  sorts: []
  search: {
    where: string
    what: string
  }
}

export type TableFilterAction =
  | {
      type: 'ADD_FILTER'
      payload: {
        filterProps: {
          property: null | string
          type: null | string
          value: null | string | boolean | number | Date
        }
      }
    } // typescript union types allow for leading |'s to have nicer layout
  | { type: 'REMOVE_FILTER'; payload: { filterIndex: number } }
  | { type: 'UPDATE_FILTER'; payload: FilterProps }
  | { type: 'ADD_OR_UPDATE_SEARCH'; payload: any }

export interface OnCellSelect {
  onPin: (source: any) => void
  onDelete: (source: any) => void
}

export interface SelectedTableItems {
  itemList: Array<any>
  indeterminate: boolean
  checkAll: boolean
}
export interface ReactTableState {
  columns: TableColumnProps
  selectedTableItems: SelectedTableItems
  isControlsPresent: boolean
}
export interface ReactTableProps {
  columns: ColumnProps[]
  dataSource: Array<any>
  name: string
  minColumns: number
  maxColumns: number
}
export interface ReactTableProviderProps {
  columns: TableColumnProps
  dataSource: Array<any>
  columnKeys: string[]
  minColumns: number
  maxColumns: number
  setColumns: (
    state: ((prev: TableColumnProps) => TableColumnProps) | TableColumnProps
  ) => void
  onSelectAll: (e: any) => void
  onSelectedItemChange: (itemsList: any[]) => void
  selectedTableItems: SelectedTableItems
  setSelectedTableItems: (items: SelectedTableItems) => void
  defaultColumns: ColumnProps[]
}

export interface TableBodyProviderProps {
  cellMenu?: ReactElement<CellMenuProps>
  allowCellSelect: boolean
  expandedView?: React.ComponentType | null
  allowCellMenu: boolean
}
