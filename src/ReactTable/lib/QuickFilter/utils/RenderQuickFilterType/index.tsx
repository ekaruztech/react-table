import { AutoComplete, InputNumber, Select, Input } from 'antd'
import { has, isNumber } from 'lodash'
import React from 'react'
import TagRender from '../../../Controls/utils/DataManagement/Filter/utils/TagRender'
import { isDate, DatePicker } from '../../../../../_utils'
import { add } from 'date-fns'

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
                  new Date(
                    value[0] && isDate(new Date(value[0]))
                      ? value[0]
                      : new Date()
                  ),
                  new Date(
                    value[1] && isDate(new Date(value[1]))
                      ? value[1]
                      : new Date()
                  )
                ]
              : [new Date(), add(new Date(), { weeks: 1 })]
          }
          onChange={(dates) =>
            handleFilterValueChange(
              // @ts-ignore
              (dates || []).map((value: any) => new Date(value || Date.now()))
            )
          }
        />
      ) : (
        <DatePicker
          showTime={type === 'datetime'}
          style={{ width: '100%' }}
          value={
            new Date(value && isDate(new Date(value)) ? value : new Date())
          }
          onChange={(date) =>
            handleFilterValueChange(new Date(date || Date.now()))
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
            options={property?.listMenu || []}
            showSearch
            showArrow
            tagRender={TagRender}
            optionFilterProp='label'
            filterOption={(input: any, option: any) =>
              option?.label?.toLowerCase()?.indexOf?.(input?.toLowerCase?.()) >=
              0
            }
            filterSort={(optionA: any, optionB: any) =>
              optionA?.label
                ?.toLowerCase?.()
                ?.localeCompare?.(optionB?.label?.toLowerCase?.())
            }
          />
        )
      } else {
        throw new Error(
          "Column of type 'List' expects an 'Array' listMenu props"
        )
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
