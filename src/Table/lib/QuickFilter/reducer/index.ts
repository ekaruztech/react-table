import { isEmpty, pick, map, find, isUndefined, reduce } from 'lodash'
import {
  QuickFilterState,
  QuickFilterAction,
  QuickFilterProps
} from './reducer'
import { ColumnProps } from '../../../../typings'
import Model, {
  QuickFilterModel,
  QuickFilterObject
} from '../../../../_utils/model'

const initQuickFilterState = (
  model: Model,
  columns: ColumnProps[]
) => (): QuickFilterState => {
  const persistedFilters: QuickFilterModel = model?.quickFilter?.slice?.() || []
  if (!isEmpty(persistedFilters)) {
    return {
      filters: reduce(
        persistedFilters || [],
        (acc: QuickFilterProps[], filter: QuickFilterObject, index: number) => {
          const findInColumns = find(
            columns,
            (column: ColumnProps) => column.key === filter.property
          )
          // If the persisted value is in the current columns add it to the state
          if (findInColumns) {
            return acc.concat(
              Object.assign({}, findInColumns, filter, {
                filterIndex: index
              })
            )
          }
          // If the persisted value does not exist in the current column remove it from the persisted state
          if (isUndefined(findInColumns)) {
            model.store(
              'quickFilter',
              persistedFilters.filter((o) => o.property !== filter.property),
              { override: true }
            )
          }
          return acc
        },
        []
      )
    }
  }
  return {
    filters: []
  }
}
const quickFilterReducer = (model: Model) => (
  state: QuickFilterState,
  action: QuickFilterAction
): QuickFilterState => {
  switch (action.type) {
    case 'ADD_FILTER': {
      const filterIndex = state.filters.length
      const filters = state.filters.concat({ ...action.payload, filterIndex })

      model.store(
        'quickFilter',
        filters.map((o) => pick(o, ['property', 'value'])),
        { override: true }
      )
      return {
        ...state,
        filters
      }
    }
    case 'REINITIALIZE_FILTER': {
      model.store(
        'quickFilter',
        map(action.payload || [], (o: QuickFilterProps) =>
          pick(o, ['property', 'value'])
        ),
        { override: true }
      )
      return {
        ...state,
        filters: action.payload
      }
    }
    case 'REMOVE_FILTER': {
      return {
        ...state,
        filters: action.payload
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
