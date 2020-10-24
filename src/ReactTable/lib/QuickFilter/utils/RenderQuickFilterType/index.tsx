import { AutoComplete, DatePicker, InputNumber, Select, Input } from 'antd'
// eslint-disable-next-line no-unused-vars
import moment, { Moment } from 'moment'
import { has, isEmpty, isNumber } from 'lodash'
import React from 'react'
import TagRender from '../../../Controls/utils/DataManagement/Filter/utils/TagRender'
import { isDate } from '../../../../../_utils'

interface IRenderFilterType {
  type: string
  property: any
  handleAutoComplete: (value: string) => void
  autoCompleteOptions: Array<{ value: string }> | undefined
  handleFilterValueChange: (
    value: null | string | boolean | number | Date | undefined | Array<Date>
  ) => null
  toRangePicker: boolean
}
const RenderFilterType: React.FC<IRenderFilterType> = (props) => {
  const {
    type,
    property,
    handleAutoComplete,
    autoCompleteOptions,
    handleFilterValueChange,
    toRangePicker
  } = props

  const value = property?.value

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
    case 'datetime':
      return toRangePicker ? (
        <DatePicker.RangePicker
          showTime={type === 'datetime'}
          style={{ width: '100%' }}
          // @ts-ignore
          value={
            Array.isArray(value)
              ? [
                  moment(isDate(new Date(value[0])) ? value[0] : new Date()),
                  moment(isDate(new Date(value[1])) ? value[1] : new Date())
                ]
              : [moment(), moment().add(1, 'week')]
          }
          onChange={(dates) =>
            handleFilterValueChange(
              // @ts-ignore
              (dates || []).map((value: Moment) => value.toDate())
            )
          }
        />
      ) : (
        <DatePicker
          showTime={type === 'datetime'}
          style={{ width: '100%' }}
          value={moment(isDate(value && new Date(value)) ? value : new Date())}
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
              width: '100%'
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
            defaultValue={value}
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

export default RenderFilterType
