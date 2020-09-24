import { filter } from 'lodash'
import {
  // eslint-disable-next-line no-unused-vars
  ColumnProps,
  // eslint-disable-next-line no-unused-vars
  TableFilterAction,
  // eslint-disable-next-line no-unused-vars
  TableFilterState
} from '../../../../../../types'

const initDataManagementState = (columns: ColumnProps[]) => {
  return {
    filters: columns.slice(0, 3).map((value, index) => {
      return {
        ...value,
        filterIndex: index,
        filterProps: {
          property: null,
          type: null,
          value: null
        }
      }
    }),
    sorts: [],
    search: {
      where: '',
      what: ''
    }
  }
}
const dataManagementReducer = (
  state: TableFilterState,
  action: TableFilterAction
): TableFilterState => {
  switch (action.type) {
    case 'ADD_FILTER': {
      const filterIndex = state.filters.length
      return {
        ...state,
        filters: state.filters.concat({ ...action.payload, filterIndex })
      }
    }
    case 'REMOVE_FILTER':
      return {
        ...state,
        filters: filter(
          state.filters,
          (o) => o.filterIndex !== action.payload?.filterIndex
        )
      }
    case 'UPDATE_FILTER': {
      const filters = state.filters
      const filterIndex = action.payload?.filterIndex
      filters[filterIndex] = action.payload
      return { ...state, filters }
    }
    case 'ADD_OR_UPDATE_SEARCH':
      return { ...state, search: action.payload }
    default:
      return state
  }
}

export { dataManagementReducer, initDataManagementState }
