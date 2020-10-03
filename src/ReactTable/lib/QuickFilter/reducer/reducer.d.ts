// eslint-disable-next-line no-unused-vars
import { ColumnProps } from '../../../../types'

interface FilterProps {
  filterIndex: number
  property: null | string
  type: string | null
  value: null | string | boolean | number | Date | undefined | Date[]
}
type QuickFilterProps = FilterProps & ColumnProps
interface QuickFilterState {
  filters: Array<QuickFilterProps>
}
type QuickFilterAction =
  | {
      type: 'ADD_FILTER'
      payload: {
        property: null | string
        type: string | null
        value: null | string | boolean | number | Date | undefined
      } & ColumnProps
    } // typescript union types allow for leading |'s to have nicer layout
  | { type: 'REMOVE_FILTER'; payload: { filterIndex: number } }
  | { type: 'UPDATE_FILTER'; payload: QuickFilterProps }
  | { type: 'ADD_OR_UPDATE_SEARCH'; payload: any }
  | { type: 'RESET' }

export { QuickFilterAction, QuickFilterProps, QuickFilterState, FilterProps }
