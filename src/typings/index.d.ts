// eslint-disable-next-line no-unused-vars
import React, { ReactElement, ReactNode } from 'react'
// eslint-disable-next-line no-unused-vars
import { CellMenuProps } from '../Table/lib/Table/utils/CellMenu'
// eslint-disable-next-line no-unused-vars
import Model from '../_utils/model'
import { SupportedDateLocales } from '../_utils/locales'

export type PresentationColor =
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

export type PresentationType = 'tag'
export type ActionPresentationType =
  | 'primary'
  | 'default'
  | 'link'
  | 'text'
  | 'ghost'
  | 'dashed'

export type ColumnType =
  | 'text'
  | 'boolean'
  | 'datetime'
  | 'date'
  | 'time'
  | 'number'
  | 'action'
  | 'currency'
  | 'list'

export interface NumberFormat {
  style?: 'currency' | 'unit' | 'percent' | 'decimal'
  currency?: string
  unit?: string
  unitDisplay?: 'long' | 'short' | 'narrow'
  notation?: 'standard' | 'compact'
  minimumFractionDigits?: number
  maximumSignificantDigits?: number
  locale?: string
}

export type ColumnNumberFormat =
  | NumberFormat
  | ((text?: number | string, source?: any) => NumberFormat)

export interface DateFormat {
  formatString?: string
  locale?: SupportedDateLocales
}
export type ColumnDateFormat =
  | DateFormat
  | ((text?: Date | string | undefined, source?: any) => DateFormat)

export interface CurrencyFormat {
  currency?: string
  notation?: 'standard' | 'compact'
  minimumFractionDigits?: number
  maximumSignificantDigits?: number
  locale?: string
}

export type ColumnCurrencyFormat =
  | CurrencyFormat
  | ((text?: number | string, source?: any) => CurrencyFormat)

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


export interface ColumnFilterOptions {
  /**
   * Minimum value (applicable to both date and number types)
   */
  min?: number | Date
  /**
   * Maximum value (applicable to both date and number types)
   */
  max?: number | Date
  /**
   * Steps for number range slider
   */
  step?: number
  /**
   * Allows the application of range pickers on date and number in the quick filter
   */
  allowRange?: boolean
  /**
   * Quick filter initial value
   */
  initialValue?:
    | null
    | string
    | boolean
    | number
    | Date
    | undefined
    | Array<Date>
    | [number, number]
  datePickerType?: 'year' | 'week' | 'quarter' | 'month' | 'time' | 'date'
  timePickerOptions?: {
    use12Hours?: boolean
    format?: string
    hourStep?: number
    minuteStep?: number
    secondStep?: number
    showNow?: boolean
  }
  sliderOptions?: {
    autoFocus?: boolean
    marks?: any
    tipFormatter?:
      | ((value?: number | undefined) => ReactNode)
      | null
      | undefined
  }
}

export interface ColumnProps {
  /**
   * Title of the column
   */
  title: string
  /**
   *
   */
  dataIndex: string
  /**
   * Key of the specified column: Note the key is very important, it controls every thing on the table (Presentations and Filters)
   */
  key: string
  /**
   * Type of the column
   */
  type: ColumnType
  /**
   * Applicable to type list, to specify multiple selection
   */
  multiple?: boolean
  /**
   * Presentation type for column (usually, Tag | Date, when specified)
   */
  presentationType?: PresentationType
  /**
   * Preset Presentation color for column
   */
  presentationColor?: PresentationColor | ((value: string) => PresentationColor)
  /**
   * Presentation/Button type for type action
   */
  actionPresentationType?: ActionPresentationType
  /**
   * List menu in for type list
   */
  listMenu?: Array<{ label: string; value: string | number }>
  /**
   * Callback for action
   * @param source
   */
  actionCallback?: (source: any) => void
  /**
   * Applicable to type action, This is the title of the button
   */
  actionTitle?: string
  /**
   * The span of a column in ratio
   */
  columnSpan?: number
  /**
   * Prevents a column from being used in the quick filter (Columns with this setting is presentation only)
   */
  noQuickFilter?: boolean
  /**
   * Creates a column for quick filter only (Column data would not be displayed on table)
   */
  quickFilterOnly?: boolean
  /**
   * Enables/Disables the advanced filter for a specified column
   */
  customFilter?: boolean
  /**
   * Number format settings (applicable to only type of number)
   */
  numberFormat?: ColumnNumberFormat
  /**
   * Currency format settings (applicable to only type of currency)
   */
  currencyFormat?: ColumnCurrencyFormat
  /**
   * Text format settings (applicable to all columns)
   */
  textFormat?: ColumnTextFormat
  /**
   * Format settings for column type date
   */
  dateFormat?: ColumnDateFormat
  /**
   * Settings for quick filter.
   */
  filterOptions?: ColumnFilterOptions
}

export interface TableColumnProps {
  all: Array<ColumnProps>
  selected: Array<ColumnProps>
  unselected: Array<ColumnProps>
}

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
