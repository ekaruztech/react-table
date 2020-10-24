import { filter, find, map } from 'lodash'
import {
  // eslint-disable-next-line no-unused-vars
  ColumnProps,
  // eslint-disable-next-line no-unused-vars
  DateManagementAction,
  // eslint-disable-next-line no-unused-vars
  DateManagementState
} from '../../../../../../types'
// eslint-disable-next-line no-unused-vars
import Model from '../../../../../../_utils/model'

const initDataManagementState = (model: Model) => (columns: ColumnProps[]) => {
  return {
    filters: map(model.advancedFilter.filters || [], (o, index: number) => {
      const findInColumns = find(
        columns,
        (column: ColumnProps) => column.key === o.property
      )
      return Object.assign({}, findInColumns, {
        filterIndex: index,
        filterProps: o
      })
    }),
    sorts: [],
    search: {
      where: '',
      what: ''
    }
  }
}
const dataManagementReducer = (model: Model) => (
  state: DateManagementState,
  action: DateManagementAction
): DateManagementState => {
  switch (action.type) {
    case 'ADD_FILTER': {
      const filterIndex = state.filters.length
      return {
        ...state,
        filters: state.filters.concat({ ...action.payload, filterIndex })
      }
    }
    case 'REMOVE_FILTER': {
      const newFilter = filter(
        state.filters,
        (o) => o.filterIndex !== action.payload?.filterIndex
      )

      model.store('advancedFilter', {
        filters: newFilter.map((o) => o.filterProps)
      })
      return {
        ...state,
        filters: newFilter
      }
    }
    case 'UPDATE_FILTER': {
      const filters = state.filters
      const filterIndex = action.payload?.filterIndex
      filters[filterIndex] = action.payload

      model.store('advancedFilter', {
        filters: filters.map((o) => o.filterProps)
      })

      return { ...state, filters }
    }
    case 'RESET_FILTER': {
      model.store('advancedFilter', {
        filters: []
      })
      return { ...state, filters: [] }
    }
    default:
      return state
  }
}

export { dataManagementReducer, initDataManagementState }
