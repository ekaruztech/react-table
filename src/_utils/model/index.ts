// eslint-disable-next-line no-unused-vars
import { TableColumnProps } from '../../types'

type ColumnReorder = {
  saveAsPreset: boolean
  presets: TableColumnProps
}

abstract class Model {
  readonly name: string
  readonly columnReorder: ColumnReorder
  readonly renderOrder: number
}

export default Model
