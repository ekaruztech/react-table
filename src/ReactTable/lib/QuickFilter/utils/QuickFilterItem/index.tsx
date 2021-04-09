import React, { useState } from 'react'
import {
  isDate,
  pick,
  isFunction,
  map,
  filter,
  isEmpty,
  isNumber
} from 'lodash'
import { Button, Col, Tooltip } from 'antd'
import Align from '../../../../../Align'
import Padding from '../../../../../Padding'
import RenderQuickFilterType from '../RenderQuickFilterType'
import { motion } from 'framer-motion'
// eslint-disable-next-line no-unused-vars
import {
  QuickFilterProps,
  QuickFilterAction,
  QuickFilterState
} from '../../reducer/reducer'
import Model from '../../../../../_utils/model'
import { QuickFilterApplyFn, QuickFilterOnFieldsRemoveFn } from '../../index'

interface IQuickFilterItem {
  dataSource: Array<any>
  property: QuickFilterProps
  dispatch: React.Dispatch<QuickFilterAction>
  onFieldsChange?: QuickFilterApplyFn
  onFieldsRemove?: QuickFilterOnFieldsRemoveFn
  state: QuickFilterState
  model: Model
}

const QuickFilterItem = (props: IQuickFilterItem) => {
  const {
    property,
    dispatch,
    onFieldsChange,
    state,
    model,
    onFieldsRemove
  } = props

  const type: string = property?.type || 'text'

  // Used to toggle the range picker as default, especially when filter value has already been persisted
  const isDateRangePicker =
    (property.type === 'date' ||
      property.type === 'datetime' ||
      property.type === 'time') &&
    Array.isArray(property.value) &&
    isDate(new Date(property.value[0])) &&
    isDate(new Date(property.value[1]))

  const isNumberRangePicker =
    property.type === 'number' &&
    Array.isArray(property.value) &&
    isNumber(property.value[0]) &&
    isNumber(property.value[1])

  const [toRangePicker, setToRangePicker] = useState<boolean>(
    isDateRangePicker || isNumberRangePicker
  )

  /**
   * Removes a filter item
   * @param filterIndex
   */
  const handleFilterRemoval = (filterIndex: number): void => {
    const newFilterState = filter(
      state.filters,
      (o: QuickFilterProps) => o.filterIndex !== filterIndex
    )

    const removed = state.filters.find((o) => o.filterIndex === filterIndex)
      ?.property
    // Remove the value from the persisted state
    const newPersistedQuickFilter = filter(
      model?.quickFilter || [],
      (o) => o.property !== removed
    )

    // Updating a state  is asynchronous.
    // Updating the model the model in the reducer also makes it synchronous
    // In cases where the data is needed immediately, it poses a lot of issues.
    model.store('quickFilter', newPersistedQuickFilter, { override: true })
    if (isEmpty(newFilterState)) model.store('hasAppliedQuickFilter', false)

    dispatch({ type: 'REMOVE_FILTER', payload: newFilterState })

    const returnValue = map(newFilterState, (o: QuickFilterProps) =>
      pick(o, ['property', 'value'])
    )
    if (onFieldsChange && isFunction(onFieldsChange)) {
      onFieldsChange(returnValue)
    }
    if (onFieldsRemove && isFunction(onFieldsRemove)) {
      onFieldsRemove(removed, returnValue)
    }
  }

  const handleFilterValueChange = (
    value:
      | null
      | string
      | boolean
      | number
      | Date
      | undefined
      | Array<Date>
      | [number, number]
  ): null => {
    dispatch({
      type: 'UPDATE_FILTER',
      payload: { ...property, value }
    })
    return null
  }

  return (
    <Col span={6} sm={24} md={12} lg={8} xl={6}>
      <motion.div
        exit={{ opacity: 0, y: 40 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Align justifyCenter type='column' style={{ width: '100%' }}>
          <Padding bottom={10}>
            <Align style={{ width: '100%' }} justifyBetween alignCenter>
              <span className='filter-title'>{property?.title || ''}</span>
              <Align alignCenter>
                {(type === 'date' ||
                  type === 'datetime' ||
                  type === 'number' ||
                  type === 'time') &&
                  property?.filterOptions?.allowRange && (
                    <Padding right={10}>
                      <Tooltip
                        title={
                          toRangePicker
                            ? 'Swith back to default'
                            : 'Switch to range picker'
                        }
                      >
                        <Button
                          type='text'
                          shape='circle'
                          onClick={() =>
                            setToRangePicker((prevState: boolean) => !prevState)
                          }
                          icon={
                            <span className='anticon'>
                              <i className='ri-arrow-left-right-line' />
                            </span>
                          }
                        />
                      </Tooltip>
                    </Padding>
                  )}
                <Tooltip title='Remove filter'>
                  <Button
                    type='text'
                    shape='circle'
                    onClick={() => handleFilterRemoval(property.filterIndex)}
                    icon={
                      <span className='anticon'>
                        <i className='ri-close-line' />
                      </span>
                    }
                  />
                </Tooltip>
              </Align>
            </Align>
          </Padding>
          <RenderQuickFilterType
            property={property}
            type={type}
            handleFilterValueChange={handleFilterValueChange}
            toRangePicker={toRangePicker}
          />
        </Align>
      </motion.div>
    </Col>
  )
}
export default QuickFilterItem
