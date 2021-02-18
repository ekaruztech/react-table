import { AutoComplete, InputNumber, Select, Input, DatePicker } from 'antd'
import { has, isNumber } from 'lodash'
import React from 'react'
import TagRender from '../../../Controls/utils/DataManagement/Filter/utils/TagRender'
import { isDate } from '../../../../../_utils'
import { add } from 'date-fns'
import moment from 'moment';

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
    case 'currency':
      // const currencyCode = property?.currency;
      // TODO: Add currency code / sign to the currency formatter during localisation
      return (
        <InputNumber
          defaultValue={0}
          value={isNumber(value) ? value : 0}
          style={{ width: '100%' }}
          onChange={(num) => handleFilterValueChange(num)}
          formatter={(value: number | string | undefined) =>
            `${value || ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value: string | undefined) =>
            value ? value.replace(/₦\s?|(,*)/g, '') : ''
          }
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
                  moment(new Date(
                    value[0] && isDate(new Date(value[0]))
                      ? value[0]
                      : new Date()
                  )),
                  moment(new Date(
                    value[1] && isDate(new Date(value[1]))
                      ? value[1]
                      : new Date()
                  ))
                ]
              : [moment(new Date()), moment(add(new Date(), { weeks: 1 }))]
          }
          onChange={(dates) =>
            handleFilterValueChange(
              // @ts-ignore
              (dates || []).map((value) => new Date(value.toDate() || Date.now()))
            )
          }
        />
      ) : (
        <DatePicker
          showTime={type === 'datetime'}
          style={{ width: '100%' }}
          value={
            moment(new Date(value && isDate(new Date(value)) ? value : new Date()))
          }
          onChange={(date) =>
            handleFilterValueChange(new Date(date.toDate() || Date.now()))
          }
        />
      )
    case 'list':
      if (has(property, 'listMenu') && Array.isArray(property?.listMenu)) {
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
      } else {
        throw new Error("Column of type 'List' expects an array listMenu props")
      }
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
