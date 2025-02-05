import React, { useState, useCallback, useEffect } from 'react'

import { Button, Col, Tooltip } from 'antd'
import Align from '../../../../../Align'
import Padding from '../../../../../Padding'
import RenderQuickFilterType from '../RenderQuickFilterType'
import { motion } from 'framer-motion'
// eslint-disable-next-line no-unused-vars
import { QuickFilterProps, QuickFilterAction } from '../../reducer/reducer'

interface IQuickFilterItem {
  dataSource: Array<any>
  property: QuickFilterProps
  dispatch: React.Dispatch<QuickFilterAction>
}
const QuickFilterItem: React.FC<IQuickFilterItem> = (props) => {
  const { dataSource, property, dispatch } = props

  const type: string = property?.type || 'text'
  const [autoCompleteProps, setAutoCompleteProps] = useState<string | null>(
    null
  )
  const [toRangePicker, setToRangePicker] = useState<boolean>(false)

  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    Array<{ value: string }> | undefined
  >([])
  /**
   * Tokenizes a text field value for autocompletion
   * Tokenization replaces space with underscore and adds a new line to the beginning of each word, starting from the second.
   * @param acc
   * @param current
   * @param index
   */
  const handleAutoCompleteResource = useCallback(
    (acc: string, current: any, index: number): string => {
      const currentValue = current[property?.key || ''] || ''
      const tokenize = currentValue.trim().split(' ').join('_')
      return index === 0 ? acc.concat(tokenize) : acc.concat(`\n${tokenize}`)
    },
    [property]
  )

  useEffect(() => {
    if (type === 'text' && property?.autoComplete) {
      setAutoCompleteProps(dataSource.reduce(handleAutoCompleteResource, ''))
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
    const options = autoCompleteProps?.match(regex)
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

  const handleFilterValueChange = (
    value: null | string | boolean | number | Date | undefined | Array<Date>
  ): null => {
    dispatch({
      type: 'UPDATE_FILTER',
      payload: { ...property, value }
    })
    return null
  }

  return (
    <Col span={6}>
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
                {(type === 'date' || type === 'datetime') && (
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
                            <i className='ri-arrow-left-right-line'></i>
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
            autoCompleteOptions={autoCompleteOptions}
            type={type}
            handleAutoComplete={handleAutoComplete}
            handleFilterValueChange={handleFilterValueChange}
            toRangePicker={toRangePicker}
          />
        </Align>
      </motion.div>
    </Col>
  )
}
export default QuickFilterItem
