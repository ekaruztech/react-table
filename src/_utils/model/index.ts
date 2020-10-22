// eslint-disable-next-line no-unused-vars
import { TableColumnProps } from '../../types'
// eslint-disable-next-line no-unused-vars
import { Storage, StorageAPI } from '../storage'
import { isPlainObject } from 'lodash'

export type ColumnReorderModel = {
  saveAsPreset: boolean
  presets: TableColumnProps | null
}

export type QuickFilterModel = Array<{
  property: string
  value: any
}> | null

export type AdvancedFilterModel = {
  queryType: string
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

export interface ModelProvider {
  name: string
  columnReorder: ColumnReorderModel
  quickFilter: QuickFilterModel
  renderOrder: number
  advancedFilter: AdvancedFilterModel
  advancedSearch: AdvancedSearchModel
}

class Model implements ModelProvider {
  readonly name: string
  public columnReorder: ColumnReorderModel
  public quickFilter: QuickFilterModel
  public renderOrder: number
  public advancedFilter: AdvancedFilterModel
  public advancedSearch: AdvancedSearchModel
  private readonly storage: StorageAPI

  constructor(model: ModelProvider) {
    this.name = model.name
    this.columnReorder = model.columnReorder
    this.renderOrder = model.renderOrder
    this.quickFilter = model.quickFilter
    this.advancedFilter = model.advancedFilter
    this.advancedSearch = model.advancedSearch
    this.storage = Storage(name, model)
  }

  public compare(): boolean {
    return false
  }

  static instantiate(name: string): ModelProvider {
    const defaultValues: ModelProvider = {
      columnReorder: {
        saveAsPreset: true,
        presets: null
      },
      quickFilter: null,
      renderOrder: 15,
      advancedFilter: {
        queryType: 'or',
        filters: null
      },
      advancedSearch: null,
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
    value: any
  ) {
    if (field && this.storage) {
      this.storage.update({ [field]: value })
    }
    if (field && this[field]) {
      this[field] = value
    }
  }
}

export default Model
