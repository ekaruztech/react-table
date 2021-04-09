import { InputNumber, Select, Input, Switch } from 'antd'
import { has, isNumber, first, last } from 'lodash'
import React from 'react'
import TagRender from '../../../Controls/utils/DataManagement/Filter/utils/TagRender'
import { isDate, DatePicker } from '../../../../../_utils'
import { add } from 'date-fns'

interface IRenderFilterType {
  type: string
  property: any
  handleFilterValueChange: (
    value: null | string | boolean | number | Date | undefined | Array<Date>
  ) => null
  toRangePicker: boolean
}
const RenderFilterType = (props: IRenderFilterType) => {
  const { type, property, handleFilterValueChange, toRangePicker } = props

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
    case 'boolean':
      return (
        <div className='filter-switch-container'>
          <Switch
            checkedChildren={
              <span className='anticon'>
                <i className='ri-check-line' />
              </span>
            }
            unCheckedChildren={
              <span className='anticon'>
                <i className='ri-close-line' />
              </span>
            }
            checked={!!value}
            onChange={(checked) => handleFilterValueChange(checked)}
          />
        </div>
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
            `₦ ${value || ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value: string | undefined) =>
            value ? parseInt(value.replace(/₦\s?|(,*)/g, '')) : 1
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
                  first(value) && isDate(new Date(first(value)))
                    ? new Date(first(value))
                    : undefined,
                  last(value) && isDate(new Date(last(value)))
                    ? new Date(last(value))
                    : undefined
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
          value={value && isDate(new Date(value)) ? new Date(value) : undefined}
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
      return (
        <Input
          style={{ width: '100%' }}
          value={value}
          onChange={(e) => handleFilterValueChange(e.target.value)}
          placeholder={
            property?.title ? `Specify ${property.title?.toLowerCase?.()}` : ''
          }
        />
      )
  }
}

export default RenderFilterType
