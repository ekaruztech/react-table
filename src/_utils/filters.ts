const stringFilters = [
  { label: 'Equals', value: 'equals' },
  { label: 'Does not equal', value: 'does not equal' },
  { label: 'Begins with', value: 'begins with' },
  { label: 'Ends with', value: 'ends with' },
  { label: 'Contains', value: 'contains' },
  { label: 'Does not contains', value: 'does not contains' }
]
const numberFilters = [
  { label: 'Equals to', value: 'equals' },
  { label: 'Greater than', value: 'greater than' },
  { label: 'Less than', value: 'less than' },
  { label: 'In between', value: 'in between' }
]
const dateFilters = [
  { label: 'more than', value: 'more than' },
  { label: 'less than', value: 'less than' },
  { label: 'on', value: 'on' },
  { label: 'between', value: 'between' }
]
const booleanFilters = [
  { label: 'True', value: 'true' },
  { label: 'False', value: 'false' }
]
const listFilters = [
  { label: 'Equals', value: 'equals' },
  { label: 'Does not equal', value: 'does not equal' }
]

export {
  stringFilters,
  numberFilters,
  dateFilters,
  booleanFilters,
  listFilters
}
