// eslint-disable-next-line no-unused-vars
import { ReactNode } from 'react'
type PresentationColor =
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

type PresentationType = 'tag'
type ActionPresentationType =
  | 'primary'
  | 'default'
  | 'link'
  | 'text'
  | 'ghost'
  | 'dashed'
type ColumnType =
  | 'text'
  | 'boolean'
  | 'datetime'
  | 'date'
  | 'number'
  | 'action'
  | 'currency'
  | 'list'

interface ColumnProps {
  title: string
  dataIndex: string
  key: string
  type: ColumnType
  autoComplete?: boolean
  multiple?: boolean
  bold?: boolean
  presentationType?: PresentationType
  presentationColor?: PresentationColor
  actionPresentationType?: ActionPresentationType
  listMenu?: Array<{ label: string; value: string | number }>
  actionCallback?: (source: any) => void
  actionTitle?: string
  dateFormat?: string
}
interface TableColumnProps {
  all: Array<ColumnProps>
  selected: Array<ColumnProps>
  unselected: Array<ColumnProps>
}

interface FilterProps {
  filterIndex: number
  filterProps: {
    property: null | string
    type: null | string
    value: null | string | boolean | number | Date
  }
}

type TableFilterProps = ColumnProps & FilterProps

interface TableFilterState {
  filters: Array<FilterProps>
  sorts: []
  search: {
    where: string
    what: string
  }
}

type TableFilterAction =
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

type TableColumnControls = {
  delete?: (key: string) => void
  duplicate?: (source: any) => void
  edit?: (source: any) => void
  refresh?: () => void
  export?: () => void
  deleteMultiple?: (sources: Array<string>) => void
}

type TableSettings = {
  minColumns?: number
  maxColumns?: number
  useSkeletonLoader?: boolean
  pagination: { all: number; currentPage: number }
  pageRenderOrder?: number
  onRenderOrderChange?: (renderOrder: number) => void
  onPaginationChange: (page: number) => void
  useQuickFilter?: boolean
}

type TableQuickFilterProps = {
  onApply: (
    value: Array<{
      property: string
      value: string[] | number | number[] | string
    }>
  ) => void
  onClear: () => void
}

type ColumnMenuItems = {
  title: string
  icon: ReactNode
  onClick: (source: any) => void
}[]

type TableLoaders = {
  isLoadingContent?: boolean
}

export type {
  ColumnProps,
  TableColumnProps,
  TableFilterProps,
  TableFilterState,
  FilterProps,
  TableFilterAction,
  PresentationColor,
  PresentationType,
  ColumnType,
  ActionPresentationType,
  TableColumnControls,
  TableSettings,
  TableQuickFilterProps,
  TableLoaders,
  ColumnMenuItems
}
