// eslint-disable-next-line no-unused-vars
import { Storage, StorageAPI } from '../storage'
import { isPlainObject, isString, isUndefined, isNull, isNaN } from 'lodash'
// eslint-disable-next-line no-unused-vars
import { DataSortObject } from '../../typings'

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
  hasAppliedQuickFilter: boolean
  hasAppliedAdvancedFilter: boolean
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
  | 'hasAppliedQuickFilter'
  | 'hasAppliedAdvancedFilter'

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
  public hasAppliedQuickFilter: boolean
  public hasAppliedAdvancedFilter: boolean
  public readonly storage: StorageAPI

  public static DEFAULT_VALUES: ModelProvider = {
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
    pagination: { page: 1 },
    hasAppliedQuickFilter: false,
    hasAppliedAdvancedFilter: false
  }

  constructor(model: ModelProvider & { name: string }) {
    this.name = model.name
    this.columnReorder = model.columnReorder
    this.renderOrder = model.renderOrder
    this.quickFilter = model.quickFilter
    this.advancedFilter = model.advancedFilter
    this.advancedSort = model.advancedSort
    this.pagination = model.pagination
    this.hasAppliedAdvancedFilter = model.hasAppliedAdvancedFilter
    this.hasAppliedQuickFilter = model.hasAppliedQuickFilter
    this.storage = new Storage(model.name, model)
  }

  public compare(): boolean {
    return false
  }

  public store(field: ModelField, value: any, options?: ModelOptions) {
    if (field && this.storage) {
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
        !isUndefined(value)
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
  hasAppliedQuickFilter: boolean
  hasAppliedAdvancedFilter: boolean
  name: string
}

type ExposedModelFields =
  | 'quickFilter'
  | 'advancedFilter'
  | 'advancedSort'
  | 'pagination'

class ExposedModel {
  public quickFilter: QuickFilterModel
  public renderOrder: number
  public advancedFilter: AdvancedFilterModel
  public advancedSort: AdvancedSortModel
  public pagination: PaginationModel
  private readonly storage: StorageAPI
  public hasAppliedQuickFilter: boolean
  public hasAppliedAdvancedFilter: boolean
  private readonly fields: ExposedModelFields[] = [
    'quickFilter',
    'advancedFilter',
    'advancedSort',
    'pagination'
  ]

  private static DEFAULT_VALUES: ExposedModelProps = {
    quickFilter: [],
    renderOrder: 15,
    advancedFilter: {
      queryType: 'or',
      filters: []
    },
    advancedSort: [],
    pagination: { page: 1 },
    name: '@voomsway/react-table',
    hasAppliedAdvancedFilter: false,
    hasAppliedQuickFilter: false
  }

  constructor(exposedModel: ExposedModelProps) {
    this.renderOrder = exposedModel.renderOrder
    this.quickFilter = exposedModel.quickFilter
    this.advancedFilter = exposedModel.advancedFilter
    this.advancedSort = exposedModel.advancedSort
    this.pagination = exposedModel.pagination
    this.hasAppliedAdvancedFilter = exposedModel.hasAppliedQuickFilter
    this.hasAppliedQuickFilter = exposedModel.hasAppliedQuickFilter
    this.storage = new Storage(exposedModel.name)
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
        renderOrder: retrievedStorageState.renderOrder.selected,
        name: tokenizedName
      })
    } else {
      return null
    }
  }

  static validValues(value: any): void {
    if (isUndefined(value) || isNaN(value) || isNull(value)) {
      throw new TypeError(`Update value cannot be of type '${typeof value}'`)
    }
  }

  private validFields(field: ExposedModelFields): void {
    if (this.fields.indexOf(field) === -1) {
      throw new RangeError(
        `Invalid table field property: Expected one of ${JSON.stringify(
          this.fields
        )}`
      )
    }
  }

  private store(
    field: ExposedModelFields,
    value: any,
    options?: { override: boolean }
  ) {
    if (field && this.storage) {
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
        !isUndefined(value)
      ) {
        this.storage.update({ [field]: value })
        this[field] = value
      }
    }
  }

  public updateField(
    field: ExposedModelFields,
    value: any,
    options?: { override: boolean }
  ): void {
    this.validFields(field)
    ExposedModel.validValues(value)
    this.store(field, value, options)
  }

  public resetField(field: ExposedModelFields): void {
    this.validFields(field)
    switch (field) {
      case 'advancedFilter':
        this.store(field, ExposedModel.DEFAULT_VALUES.advancedFilter, {
          override: true
        })
        break
      case 'quickFilter':
        this.store(field, ExposedModel.DEFAULT_VALUES.quickFilter, {
          override: true
        })
        break
      case 'advancedSort':
        this.store(field, ExposedModel.DEFAULT_VALUES.advancedSort, {
          override: true
        })
        break
      case 'pagination':
        this.store(field, ExposedModel.DEFAULT_VALUES.pagination, {
          override: true
        })
        break
      default:
        break
    }
  }

  public resetFields(fields?: ExposedModelFields[]) {
    if (fields) {
      if (!Array.isArray(fields)) {
        throw new RangeError(`Invalid argument expected an Array`)
      }
      for (const field of fields) {
        this.validFields(field)
        this.resetField(field)
      }
    }

    if (!fields) {
      for (const field of this.fields) {
        this.validFields(field)
        this.resetField(field)
      }
    }
  }

  public updateFields(
    values: {
      field: ExposedModelFields
      value: any
      options?: { override: boolean }
    }[]
  ): void {
    for (const o of values) {
      const { value, field, options } = o
      this.updateField(field, value, options)
    }
  }
}

export { ExposedModel }
export default Model
