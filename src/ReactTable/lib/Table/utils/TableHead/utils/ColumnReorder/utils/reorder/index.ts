// eslint-disable-next-line no-unused-vars
import { ColumnProps } from '../../../../../../../../../types'

const reorder = (
  list: Array<ColumnProps>,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list)
  // Removes the value from the start index
  const [removed]: ColumnProps[] = result.splice(startIndex, 1)
  // Inserts at the end index.

  // Delete count of zero removes nothing instead with the third argument of splice, inserts at the given position
  result.splice(endIndex, 0, removed)

  return result
}

export { reorder }
