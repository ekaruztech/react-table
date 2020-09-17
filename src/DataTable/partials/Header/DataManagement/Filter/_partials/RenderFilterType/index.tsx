import { Align } from '../../../../../../../TableUtility'
import { AutoComplete, DatePicker, InputNumber, Select, Input } from 'antd'
import moment from 'moment'
import { has, isDate, isEmpty, isNumber } from 'lodash'
import { toPercentage } from '../../../../../../../hooks'
import React from 'react'
import TagRender from '../TagRender'

type RenderFilterTypeProps = {
  type: string
  filterType: string | null
  property: any
  dimension: { height: number; width: number }
  handleAutoComplete: (value: string) => void
  suffix: React.FunctionComponent
  autoCompleteOptions: Array<{ value: string }> | undefined
  currentData: any
  handleFilterValueChange: (
    value: number | string | Date | undefined,
    valueType?: string | undefined,
    rangePosition?: string | undefined
  ) => null
}
export default (props: RenderFilterTypeProps) => {
  const {
    type,
    filterType,
    property,
    dimension,
    handleAutoComplete,
    suffix,
    autoCompleteOptions,
    handleFilterValueChange,
    currentData
  } = props
  const SuffixStatement = suffix
  const value = currentData?.filterProps?.value
  if ((filterType || '').includes('between'))
    return (
      <Align style={{ width: '100%' }} alignCenter justifyBetween>
        {type === 'date' || type === 'datetime' ? (
          <DatePicker
            style={{ width: '45%' }}
            value={moment(isDate(value?.start) ? value?.start : new Date())}
            onChange={(date) =>
              handleFilterValueChange(
                moment(date || new Date()).toDate(),
                'range',
                'start'
              )
            }
          />
        ) : (
          <InputNumber
            defaultValue={0}
            value={isNumber(value?.start) ? value?.start : 0}
            style={{ width: '45%' }}
            onChange={(num) => handleFilterValueChange(num, 'range', 'end')}
          />
        )}
        <SuffixStatement />
        {type === 'date' || type === 'datetime' ? (
          <DatePicker
            style={{ width: '45%' }}
            value={moment(isDate(value?.end) ? value?.end : new Date())}
            onChange={(date) =>
              handleFilterValueChange(
                moment(date || new Date()).toDate(),
                'range',
                'start'
              )
            }
          />
        ) : (
          <InputNumber
            defaultValue={0}
            style={{ width: '45%' }}
            value={isNumber(value?.end) ? value?.end : 0}
            onChange={(num) => handleFilterValueChange(num, 'range', 'end')}
          />
        )}
      </Align>
    )

  switch (type) {
    case 'number':
      return (
        <InputNumber
          defaultValue={0}
          value={isNumber(value) ? value : 0}
          style={{ width: '100%' }}
          onChange={(num) => handleFilterValueChange(num)}
        />
      )
    case 'date':
      return (
        <DatePicker
          style={{ width: '100%' }}
          value={moment(isDate(value) ? value : new Date())}
          onChange={(date) =>
            handleFilterValueChange(moment(date || new Date()).toDate())
          }
        />
      )
    case 'datetime':
      return (
        <DatePicker
          showTime
          style={{ width: '100%' }}
          value={moment(isDate(value) ? value : new Date())}
          onChange={(date) =>
            handleFilterValueChange(moment(date || new Date()).toDate())
          }
        />
      )
    case 'list':
      if (has(property, 'listMenu') && !isEmpty(property?.listMenu)) {
        return (
          <Select
            mode={property?.multiple ? 'multiple' : undefined}
            style={{
              width: toPercentage(dimension.width, 0.4)
            }}
            placeholder={
              property?.title ? `Select ${property?.title?.toLowerCase()}` : ''
            }
            value={value || undefined}
            onChange={(value) => handleFilterValueChange(value)}
            filterOption
            options={property?.listMenu || []}
            showSearch
            showArrow
            tagRender={TagRender}
          />
        )
      } else return null
    default:
      if (property.autoComplete) {
        return (
          <AutoComplete
            options={autoCompleteOptions}
            onSelect={(value) => handleFilterValueChange(value)}
            onSearch={handleAutoComplete}
            style={{ width: '100%' }}
            placeholder={
              property?.title
                ? `Specify ${property.title?.toLowerCase?.()}`
                : ''
            }
          />
        )
      } else {
        return (
          <Input
            style={{ width: '100%' }}
            value={value}
            onChange={(e) => handleFilterValueChange(e.target.value)}
            placeholder={
              property?.title
                ? `Specify ${property.title?.toLowerCase?.()}`
                : ''
            }
          />
        )
      }
  }
}
