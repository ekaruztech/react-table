import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { Button, Select, Tag, Tooltip } from 'antd'
import { motion } from 'framer-motion'
import { toPercentage, useDimension } from '../../../../../../../../hooks'
import Align from '../../../../../../../../Align'
import Margin from '../../../../../../../../Margin'
import {
  // eslint-disable-next-line no-unused-vars
  ColumnProps,
  // eslint-disable-next-line no-unused-vars
  ColumnType,
  // eslint-disable-next-line no-unused-vars
  TableColumnProps,
  // eslint-disable-next-line no-unused-vars
  DateManagementAction,
  // eslint-disable-next-line no-unused-vars
  TableFilterProps
} from '../../../../../../../../types'
import RenderFilterType from '../RenderFilterType'

const { Option } = Select

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

/**
 * Evaluates the column types and displays its filter
 * @param type
 */
const evaluatePropertyTypeToFilterType = (
  type: Omit<ColumnType, 'action'>
): { value: string; label: string }[] => {
  if (type === 'number' || type === 'currency') return numberFilters
  if (type === 'boolean') return booleanFilters
  if (type === 'date' || type === 'datetime') return dateFilters
  if (type === 'list') return listFilters
  return stringFilters
}
type FilterItemProps = {
  columns: TableColumnProps
  filterData: any
  logicType: string
  isLastIndex: boolean
  isMoreThanOne: boolean
  isFirstIndex: boolean
  dataSource: any
  dispatch: React.Dispatch<DateManagementAction>
}
export default (props: FilterItemProps) => {
  const {
    columns,
    filterData,
    logicType,
    isLastIndex,
    isMoreThanOne,
    isFirstIndex,
    dataSource,
    dispatch
  } = props
  // Current Property
  const [property, setProperty] = useState<TableFilterProps>(filterData)

  const type: string = filterData.filterProps.propertyType
    ? filterData.filterProps.propertyType
    : property?.type || 'text'

  const initialFilterType = () => {
    const evaluatedFilterType = evaluatePropertyTypeToFilterType(
      property.filterProps.propertyType || 'text'
    )
    if (property.filterProps.propertyType && property.filterProps.filterType) {
      const findCurrent = evaluatedFilterType.find(
        (predicate) => predicate.value === property.filterProps.filterType
      )

      if (findCurrent) {
        return findCurrent.value
      } else {
        return evaluatedFilterType[0].value
      }
    } else {
      return evaluatedFilterType[0].value
    }
  }

  const dimension = useDimension('element', 'filter__field__container')

  const validColumns = useMemo(
    () => columns.selected.filter((o: ColumnProps) => o.type !== 'action'),
    [columns.selected]
  )

  // filter type.
  const [filterType, setFilterType] = useState<string | null>(
    initialFilterType()
  )

  // On load of filter item, tokenizes the fields value from data source for later usage.
  const [
    tokenizedAutoCompleteOptions,
    setTokenizedAutoCompleteOptions
  ] = useState<string | null>(null)

  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    Array<{ value: string }> | undefined
  >([])

  /**
   * Tokenizes a text field value for auto-completion
   * Tokenization replaces space with underscore and adds a new line to the beginning of each word, starting from the second.
   * @param acc
   * @param current
   * @param index
   */
  const handleAutoCompleteResource = useCallback(
    // Reduce callback
    (acc: string, current: any, index: number): string => {
      // Current is an object of data (from data-source)
      const currentValue = current[property?.key || ''] || ''
      const tokenize = currentValue.trim().split(' ').join('_')
      // Arranges the tokenized string in new lines
      return index === 0 ? acc.concat(tokenize) : acc.concat(`\n${tokenize}`)
    },
    [property]
  )

  /**
   * Prepares the data for an auto-complete feature.
   */
  useEffect(() => {
    if (type === 'text' && property?.autoComplete) {
      setTokenizedAutoCompleteOptions(
        dataSource.reduce(handleAutoCompleteResource, '')
      )
    }
  }, [dataSource, handleAutoCompleteResource, property, type])

  /**
   * Matches user input with tokenized resource for autocompletion
   * Converts all matched results to [{value: result}] format
   * @param value
   */
  const handleAutoComplete = (value: string): void => {
    const regex = new RegExp(
      `(^|\\s)${value}+(?:\\w)*(\\s|$)|(^|\\s)\\w+(?:\\w)*(?:_)${value}+(?:\\w)*(\\s|$)`,
      'gim'
    )
    const options = tokenizedAutoCompleteOptions?.match(regex)
    if (options) {
      setAutoCompleteOptions(
        (options || []).map((o) => ({ value: o.split('_').join(' ').trim() }))
      )
    }
  }

  /**
   * Removes a filter item
   * @param filterIndex
   */
  const handleFilterRemoval = (filterIndex: number): void => {
    dispatch({ type: 'REMOVE_FILTER', payload: { filterIndex } })
  }

  /**
   * Handles the selection of different property(column) for a given filter.
   * @param value
   */
  const handlePropertyChange = (value: string): void => {
    const key = value
    const newProperty = columns.all.find((o) => o.key === key)
    setProperty((prevState) => ({
      ...prevState,
      ...newProperty,
      filterProps: {
        property: key,
        filterType: null,
        value: null,
        propertyType: 'text'
      }
    }))
  }

  /**
   * Stores the filter value whenever it changes
   * @param value
   * @param valueType
   * @param rangePosition
   */
  const handleFilterValueChange = (
    value: number | string | Date | undefined,
    valueType: string | undefined = 'fixed',
    rangePosition: string | undefined
  ): null => {
    // For range-type filter
    if (valueType === 'range' && rangePosition) {
      const filterProps = {
        property: property?.key,
        filterType: filterType,
        propertyType: property.type,
        value: {
          ...filterData.filterProps.value,
          [rangePosition]: value
        }
      }
      dispatch({
        type: 'UPDATE_FILTER',
        payload: { ...filterData, filterProps }
      })
      return null
    }
    const filterProps = {
      property: property?.key,
      filterType: filterType,
      propertyType: property.type,
      value
    }
    dispatch({
      type: 'UPDATE_FILTER',
      payload: { ...filterData, filterProps }
    })
    return null
  }

  /**
   * Updates the store whenever the filter type changes
   * @param newFilterType
   */
  const onFilterTypeChange = (newFilterType: string) => {
    const filterProps = {
      property: property?.key,
      filterType: newFilterType,
      propertyType: property.type,
      value: property.filterProps.value
    }
    dispatch({
      type: 'UPDATE_FILTER',
      payload: { ...filterData, filterProps }
    })
    setFilterType(newFilterType)
  }

  const PrefixStatement = () => {
    const prefix = () => {
      if (
        type === 'number' ||
        type === 'boolean' ||
        type === 'date' ||
        type === 'datetime' ||
        type === 'currency'
      )
        return 'is'
      return null
    }
    return type !== 'text' && type !== 'list' ? (
      <Margin right={20}>
        <Tag style={{ height: 32, lineHeight: '32px' }} color='processing'>
          {prefix()}
        </Tag>
      </Margin>
    ) : null
  }
  const SuffixStatement = () => {
    const suffix = () => {
      if (
        (type === 'number' ||
          type === 'date' ||
          type === 'datetime' ||
          type === 'currency') &&
        (filterType || '').includes('between')
      )
        return 'and'
      return null
    }
    return (type === 'number' ||
      type === 'date' ||
      type === 'datetime' ||
      type === 'currency') &&
      (filterType || '').includes('between') ? (
      <Margin horizontal={20}>
        <Tag style={{ height: 32, lineHeight: '32px' }} color='processing'>
          {suffix()}
        </Tag>
      </Margin>
    ) : null
  }

  return (
    <Align justifyCenter style={{ width: '100%' }} type='column'>
      <motion.div
        exit={{ opacity: 0, y: 40 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ overflow: 'hidden' }}
      >
        {isFirstIndex && (
          <Align
            justifyCenter
            alignCenter
            type='column'
            style={{ width: 'fit-content' }}
          >
            <Tag color='processing'>FIND DATA WHERE</Tag>
            <div
              style={{
                height: 20,
                width: 5,
                borderLeft: '1.5px solid var(--border)'
              }}
            />
          </Align>
        )}
        <Margin style={{ width: '100%' }}>
          <Align alignCenter style={{ width: '100%' }}>
            <Margin right={20}>
              <Select
                showSearch
                style={{
                  width: toPercentage(
                    dimension.width,
                    type === 'boolean' ? 0.45 : 0.3
                  )
                }}
                placeholder='Select a property'
                onChange={handlePropertyChange}
                value={property?.key}
                filterOption
              >
                {(validColumns || [])?.map?.((value, index) => {
                  return (
                    <Option value={value.key} key={index}>
                      {value.title}
                    </Option>
                  )
                })}
              </Select>
            </Margin>
            <Margin right={20}>
              <Align alignCenter>
                <PrefixStatement />
                <Select
                  style={{
                    width: toPercentage(
                      dimension.width,
                      type === 'boolean' ? 0.41 : 0.2
                    )
                  }}
                  onChange={(value) => onFilterTypeChange(value)}
                  value={filterType || ''}
                >
                  {(
                    evaluatePropertyTypeToFilterType(
                      property?.type || 'text'
                    ) || stringFilters
                  ).map(({ value, label }, index) => {
                    return (
                      <Option value={value} key={index}>
                        {label}
                      </Option>
                    )
                  })}
                </Select>
              </Align>
            </Margin>
            {type !== 'boolean' && (
              <Align
                alignCenter
                style={{ width: toPercentage(dimension.width, 0.5) }}
              >
                <RenderFilterType
                  autoCompleteOptions={autoCompleteOptions}
                  suffix={SuffixStatement}
                  property={property}
                  filterType={filterType}
                  dimension={dimension}
                  type={type}
                  handleAutoComplete={handleAutoComplete}
                  handleFilterValueChange={handleFilterValueChange}
                  currentData={filterData}
                />
              </Align>
            )}

            <Tooltip title='Remove'>
              <motion.div whileTap={{ scale: 0.8 }}>
                <Button
                  type='text'
                  danger
                  shape={'circle'}
                  onClick={() => handleFilterRemoval(filterData.filterIndex)}
                >
                  <span className='anticon'>
                    <i
                      className='ri-delete-bin-2-line'
                      style={{ fontSize: 16 }}
                    />
                  </span>
                </Button>
              </motion.div>
            </Tooltip>
          </Align>
        </Margin>
        {!isLastIndex && isMoreThanOne && (
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ overflow: 'hidden' }}
          >
            <Align
              justifyCenter
              alignCenter
              type='column'
              style={{ width: 'fit-content' }}
            >
              <motion.div
                style={{
                  height: 20,
                  width: 5,
                  borderLeft: '1.5px solid var(--border)'
                }}
              />
              <Tag color='processing'>{(logicType || '')?.toUpperCase()}</Tag>
              <div
                style={{
                  height: 20,
                  width: 5,
                  borderLeft: '1.5px solid var(--border)'
                }}
              />
            </Align>
          </motion.div>
        )}
      </motion.div>
    </Align>
  )
}
