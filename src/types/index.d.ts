// eslint-disable-next-line no-unused-vars
import React, { ReactElement } from 'react'
// eslint-disable-next-line no-unused-vars
import { CellMenuProps } from '../ReactTable/lib/Table/utils/CellMenu'
// eslint-disable-next-line no-unused-vars
import Model from '../_utils/model'

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
  quickFilter?: boolean
  advancedFilter?: boolean
}
export interface TableColumnProps {
  all: Array<ColumnProps>
  selected: Array<ColumnProps>
  unselected: Array<ColumnProps>
}

export type DataFilterObject = {
  property: null | string
  filterType: null | string
  value: null | string | boolean | number | Date
  propertyType: Omit<ColumnType, 'action'>
}

export type DataSortObject = {
  order: 'ascending' | 'descending'
  range: { from: number; to: number } | null
  property: string | null
}
export interface DataManagementFilterProps {
  filterIndex: number
  filterProps: DataFilterObject
}
export interface DataManagementSortProps {
  sortIndex: number
  sortProps: DataSortObject
}

export type TableFilterProps = ColumnProps & DataManagementFilterProps

export interface DateManagementState {
  filters: Array<DataManagementFilterProps>
  sorts: Array<DataManagementSortProps>
}

export type DateManagementAction =
  | {
      type: 'ADD_FILTER'
      payload: {
        filterProps: DataFilterObject
      }
    } // typescript union types allow for leading |'s to have nicer layout
  | { type: 'REMOVE_FILTER'; payload: { filterIndex: number } }
  | { type: 'UPDATE_FILTER'; payload: DataManagementFilterProps }
  | { type: 'RESET_FILTER' }
  | {
      type: 'ADD_SORT'
      payload: {
        sortProps: DataSortObject
      }
    }
  | { type: 'REMOVE_SORT'; payload: { sortIndex: number } }
  | { type: 'RESET_SORT' }
  | { type: 'UPDATE_SORT'; payload: DataManagementSortProps }

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
  unusedDefaultColumns: ColumnProps[]
}
export interface ReactTableProps {
  columns: ColumnProps[]
  dataSource: Array<any>
  name: string
  minColumns: number
  maxColumns: number
  onRefresh?: () => void
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
  model: Model
  isControlsPresent: boolean
  onRefresh?: () => void
}

export interface TableBodyProviderProps {
  cellMenu?: ReactElement<CellMenuProps>
  allowCellSelect: boolean
  expandedView?: (source: any) => React.ReactNode
  allowCellMenu: boolean
  hoverActions?: {
    onEdit: (source: any) => void
    onDelete: (key: string) => void
  }
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
  disableCell?: (source: any) => boolean
}
