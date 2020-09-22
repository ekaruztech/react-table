// eslint-disable-next-line no-unused-vars
import { ColumnProps } from '../../../../../../../types'

const reorder = (
  list: Array<ColumnProps>,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list)
  // Removes the value from the start index
  const [removed] = result.splice(startIndex, 1)
  // Inserts at the end index.
  result.splice(endIndex, 0, removed)

  return result
}

export { reorder }
