// eslint-disable-next-line no-unused-vars
import { Storage, StorageAPI } from '../storage'
import { isPlainObject, isString } from 'lodash'
// eslint-disable-next-line no-unused-vars
import { DataSortObject } from '../../types'

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

export type AdvancedSortModel = DataSortObject[] | []

export type RenderOrderModel = {
  items: { label: string; value: number; type: 'default' | 'custom' }[]
  selected: number
}

export type ModelProvider = {
  columnReorder: ColumnReorderModel
  quickFilter: QuickFilterModel
  renderOrder: RenderOrderModel
  advancedFilter: AdvancedFilterModel
  advancedSort: AdvancedSortModel
  pagination: PaginationModel
}
export interface PaginationModel {
  page: number
}

type ModelField =
  | 'renderOrder'
  | 'columnReorder'
  | 'quickFilter'
  | 'advancedSort'
  | 'advancedFilter'
  | 'pagination'

type ModelOptions = {
  override: boolean
}

interface ModelAPI {
  store: (field: ModelField, value: any, options?: ModelOptions) => void
  compare: () => boolean
}

class Model implements ModelAPI {
  readonly name: string
  public columnReorder: ColumnReorderModel
  public quickFilter: QuickFilterModel
  public renderOrder: RenderOrderModel
  public advancedFilter: AdvancedFilterModel
  public advancedSort: AdvancedSortModel
  public pagination: PaginationModel
  public readonly storage: StorageAPI

  private static DEFAULT_VALUES: ModelProvider = {
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
    advancedSort: [],
    pagination: { page: 1 }
  }

  constructor(model: ModelProvider & { name: string }) {
    this.name = model.name
    this.columnReorder = model.columnReorder
    this.renderOrder = model.renderOrder
    this.quickFilter = model.quickFilter
    this.advancedFilter = model.advancedFilter
    this.advancedSort = model.advancedSort
    this.pagination = model.pagination
    this.storage = new Storage(model.name, model)
  }

  public compare(): boolean {
    return false
  }

  public store(field: ModelField, value: any, options?: ModelOptions) {
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

  public static instantiate(name: string): Model {
    const tokenizedName = `modelled-table-persistence:${name.toLowerCase()}`
    const defaultValues: ModelProvider & { name: string } = {
      ...Model.DEFAULT_VALUES,
      name: tokenizedName
    }

    const storage = new Storage(tokenizedName, defaultValues)
    const retrievedStorageState = storage.pull()

    if (retrievedStorageState && isPlainObject(retrievedStorageState)) {
      return new Model({ name: tokenizedName, ...retrievedStorageState })
    } else {
      return new Model({ ...defaultValues, name: tokenizedName })
    }
  }
}

type ExposedModelProps = {
  quickFilter: QuickFilterModel
  renderOrder: number
  advancedFilter: AdvancedFilterModel
  advancedSort: AdvancedSortModel
  pagination: PaginationModel
}
class ExposedModel {
  public readonly quickFilter: QuickFilterModel
  public readonly renderOrder: number
  public readonly advancedFilter: AdvancedFilterModel
  public readonly advancedSort: AdvancedSortModel
  public readonly pagination: PaginationModel

  constructor(exposedModel: ExposedModelProps) {
    this.renderOrder = exposedModel.renderOrder
    this.quickFilter = exposedModel.quickFilter
    this.advancedFilter = exposedModel.advancedFilter
    this.advancedSort = exposedModel.advancedSort
    this.pagination = exposedModel.pagination
  }

  public static instantiate(name: string): ExposedModel | null {
    if (!name)
      throw new Error(
        `Model name is required.\nmodel name should be the name of your React Table instance`
      )
    if (!isString(name))
      throw new Error(
        `Model name is expected a string, got ${typeof name} instead`
      )

    const tokenizedName = `modelled-table-persistence:${name.toLowerCase()}`
    const exists = localStorage.getItem(tokenizedName)

    if (!exists) return null

    const storage = new Storage(tokenizedName, null)
    const retrievedStorageState: Model = storage.pull()

    if (retrievedStorageState && isPlainObject(retrievedStorageState)) {
      return new ExposedModel({
        ...retrievedStorageState,
        renderOrder: retrievedStorageState.renderOrder.selected
      })
    } else {
      return null
    }
  }
}

export { ExposedModel }
export default Model
