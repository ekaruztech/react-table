import { filter, isEmpty, pick, map, find } from 'lodash'
import {
  // eslint-disable-next-line no-unused-vars
  QuickFilterState,
  // eslint-disable-next-line no-unused-vars
  QuickFilterAction,
  // eslint-disable-next-line no-unused-vars
  QuickFilterProps
} from './reducer'
// eslint-disable-next-line no-unused-vars
import { ColumnProps } from '../../../../types'
// eslint-disable-next-line no-unused-vars
import Model, {
  // eslint-disable-next-line no-unused-vars
  QuickFilterModel,
  // eslint-disable-next-line no-unused-vars
  QuickFilterObject
} from '../../../../_utils/model'

const initQuickFilterState = (model: Model) => (columns: ColumnProps[]) => {
  const persistedFilters: QuickFilterModel = model.quickFilter
  if (!isEmpty(persistedFilters)) {
    return {
      filters: map(
        persistedFilters,
        (filter: QuickFilterObject, index: number) => {
          const findInColumns = find(
            columns,
            (column: ColumnProps) => column.key === filter.property
          )
          return Object.assign({}, findInColumns, filter, {
            filterIndex: index
          })
        }
      )
    }
  } else {
    return {
      filters: []
    }
  }
}
const quickFilterReducer = (model: Model) => (
  state: QuickFilterState,
  action: QuickFilterAction
): QuickFilterState => {
  switch (action.type) {
    case 'ADD_FILTER': {
      const filterIndex = state.filters.length
      return {
        ...state,
        filters: state.filters.concat({ ...action.payload, filterIndex })
      }
    }
    case 'REINITIALIZE_FILTER': {
      return {
        ...state,
        filters: action.payload
      }
    }
    case 'REMOVE_FILTER': {
      const newFilterState = filter(
        state.filters,
        (o: QuickFilterProps) => o.filterIndex !== action.payload?.filterIndex
      )
      model.store(
        'quickFilter',
        map(newFilterState, (o: QuickFilterProps) =>
          pick(o, ['property', 'value'])
        ),
        { override: true }
      )
      return {
        ...state,
        filters: newFilterState
      }
    }
    case 'UPDATE_FILTER': {
      const filters = state.filters
      const filterIndex = action.payload?.filterIndex
      filters[filterIndex] = action.payload
      // Persist data.
      model.store(
        'quickFilter',
        map(filters, (o: QuickFilterProps) => pick(o, ['property', 'value'])),
        { override: true }
      )
      return { ...state, filters }
    }
    case 'RESET':
      // Persist data.
      model.store('quickFilter', [], { override: true })
      return { filters: [] }
    default:
      return state
  }
}

export { quickFilterReducer, initQuickFilterState }
