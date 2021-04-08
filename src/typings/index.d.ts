// eslint-disable-next-line no-unused-vars
import React, { ReactElement } from 'react'
// eslint-disable-next-line no-unused-vars
import { CellMenuProps } from '../ReactTable/lib/Table/utils/CellMenu'
// eslint-disable-next-line no-unused-vars
import Model from '../_utils/model'
import { SupportedDateLocales } from '../_utils/locales'


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
  | 'pink'
  | 'purple'
  | 'yellow'
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

export interface ColumnNumberFormat {
  style?: 'currency' | 'unit' | 'percent' | 'decimal'
  currency?: string
  unit?: string
  unitDisplay?: 'long' | 'short' | 'narrow'
  notation?: 'standard' | 'compact'
  minimumFractionDigits?: number
  maximumSignificantDigits?: number
  locale?: string
}

export interface ColumnDateFormat {
  formatString?: string,
  locale?: SupportedDateLocales
}

export interface ColumnCurrencyFormat {
  currency?: string
  notation?: 'standard' | 'compact'
  minimumFractionDigits?: number
  maximumSignificantDigits?: number
  locale?: string
}

export interface ColumnTextFormat {
  direction?: 'ltr' | 'rtl'
  fontWeight?:
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | 'bold'
    | 'normal'
    | 'lighter'
  fontStyle?: 'italic' | 'normal' | 'oblique'
  fontStretch?:
    | 'ultra-condensed'
    | 'extra-condensed'
    | 'condensed'
    | 'semi-condensed'
    | 'normal'
    | 'semi-expanded'
    | 'expanded'
    | 'extra-expanded'
    | 'ultra-expanded'
  textAlign?: 'left' | 'right' | 'center' | 'justify'
  textDecorationLine?: 'underline' | 'line-through' | 'overline' | 'none'
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy'
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  wordSpacing?: number
  wordWrap?: 'normal' | 'break-word'
  textOverflow?: 'clip' | 'ellipsis' | 'string'
}

export interface ColumnProps {
  title: string
  dataIndex: string
  key: string
  type: ColumnType
  autoComplete?: boolean
  multiple?: boolean
  presentationType?: PresentationType
  presentationColor?: PresentationColor | ((value: string) => PresentationColor)
  actionPresentationType?: ActionPresentationType
  listMenu?: Array<{ label: string; value: string | number }>
  actionCallback?: (source: any) => void
  actionTitle?: string
  columnSpan?: number
  noQuickFilter?: boolean
  quickFilterOnly?: boolean
  advancedFilter?: boolean
  numberFormat?: ColumnNumberFormat
  currencyFormat?: ColumnCurrencyFormat
  textFormat?: ColumnTextFormat
  dateFormat?: ColumnDateFormat
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
  __DEFAULT_PROPS_COLUMNS_: ColumnProps[]
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
  withQuickFilterOnlyColumns: TableColumnProps
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
  expandedViewWidth?: string | number
  expandedViewTitle?: string
  expandedViewPlacement?: 'top' | 'right' | 'bottom' | 'left'
  expandedViewFooter?: null | React.ReactNode[]
  onExpandedViewClose?: () => void
  onExpandedViewOpen?: () => void
  allowCellMenu: boolean
  hoverActions?: {
    onExpandedView?: (source: any) => void
    onEdit?: (source: any) => void
    onDelete?: (key: string) => void
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
