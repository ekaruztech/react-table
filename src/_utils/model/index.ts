// eslint-disable-next-line no-unused-vars
import { Storage, StorageAPI } from '../storage'
import { isPlainObject } from 'lodash'

export type ColumnReorderModel = {
  save: boolean
  presets: string[]
}

export type QuickFilterObject = {
  property: string
  value: any
}
export type QuickFilterModel = Array<QuickFilterObject> | null

export type AdvancedFilterModel = {
  queryType: 'or' | 'and'
  filters: Array<{
    type: string
    property: string
    value: any
  }> | null
}

export type AdvancedSearchModel = {
  property: string
  value: any
} | null

export type RenderOrderModel = {
  items: { label: string; value: number; type: 'default' | 'custom' }[]
  selected: number
}

export interface ModelProvider {
  columnReorder: ColumnReorderModel
  quickFilter: QuickFilterModel
  renderOrder: RenderOrderModel
  advancedFilter: AdvancedFilterModel
  advancedSearch: AdvancedSearchModel
}

class Model {
  readonly name: string
  public columnReorder: ColumnReorderModel
  public quickFilter: QuickFilterModel
  public renderOrder: RenderOrderModel
  public advancedFilter: AdvancedFilterModel
  public advancedSearch: AdvancedSearchModel
  private readonly storage: StorageAPI

  static DEFAULT_VALUES: ModelProvider = {
    columnReorder: {
      save: true,
      presets: []
    },
    quickFilter: [],
    renderOrder: {
      items: [
        { label: `15 per page`, value: 15, type: 'default' },
        {
          label: '30 per page',
          value: 30,
          type: 'default'
        },
        { label: '50 per page', value: 50, type: 'default' },
        { label: '100 per page', value: 100, type: 'default' }
      ],
      selected: 15
    },
    advancedFilter: {
      queryType: 'or',
      filters: []
    },
    advancedSearch: null
  }

  constructor(model: ModelProvider & { name: string }) {
    this.name = model.name
    this.columnReorder = model.columnReorder
    this.renderOrder = model.renderOrder
    this.quickFilter = model.quickFilter
    this.advancedFilter = model.advancedFilter
    this.advancedSearch = model.advancedSearch
    this.storage = Storage(model.name, model)
  }

  public compare(): boolean {
    return false
  }

  static instantiate(name: string): Model {
    const defaultValues: ModelProvider & { name: string } = {
      ...Model.DEFAULT_VALUES,
      name
    }
    const storage = Storage(name, defaultValues)
    const retrievedStorageState = storage?.pull()

    if (retrievedStorageState && isPlainObject(retrievedStorageState)) {
      return new Model({ name, ...retrievedStorageState })
    } else {
      return new Model({ ...defaultValues, name })
    }
  }

  public store(
    field:
      | 'renderOrder'
      | 'columnReorder'
      | 'quickFilter'
      | 'advancedSearch'
      | 'advancedFilter',
    value: any,
    options?: { override?: boolean }
  ) {
    if (field && this[field] && this.storage) {
      if (isPlainObject(this[field]) && isPlainObject(value)) {
        const newValue = Object.assign({}, this[field], value)
        this.storage.update({ [field]: newValue })
        this[field] = newValue
      }
      if (Array.isArray(this[field]) && Array.isArray(value)) {
        if (options?.override) {
          this.storage.update({ [field]: value })

          // @ts-ignore
          this[field] = value
        } else {
          // @ts-ignore
          const newValue = [...this[field], ...value]
          this.storage.update({ [field]: newValue })
          // @ts-ignore
          this[field] = newValue
        }
      }
      if (
        !isPlainObject(this[field]) &&
        !Array.isArray(this[field]) &&
        (Array.isArray(value) || isPlainObject(value))
      ) {
        this.storage.update({ [field]: value })
        // @ts-ignore
        this[field] = value
      }
    }
  }
}

export default Model
