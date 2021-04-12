import { InputNumber, Select, Input, Switch, Slider } from 'antd'
import { has, isNumber, first, last, isPlainObject, isString } from 'lodash'
import React from 'react'
import TagRender from '../TagRender'
import {
  isDate,
  DatePicker,
  TimePicker,
  TimePickerRange
} from '../../../../../_utils'
import { add, isAfter, isBefore } from 'date-fns'
import { QuickFilterProps } from '../../reducer/reducer'

interface IRenderFilterType {
  type: string
  property: QuickFilterProps
  handleFilterValueChange: (
    value:
      | null
      | string
      | boolean
      | number
      | Date
      | undefined
      | Array<Date>
      | [number, number]
  ) => null
  toRangePicker: boolean
}
const RenderFilterType = (props: IRenderFilterType) => {
  const { type, property, handleFilterValueChange, toRangePicker } = props

  const value = property?.value

  const {
    min,
    max,
    step = 1,
    sliderOptions,
    timePickerOptions,
    datePickerType = 'date'
  } = property?.filterOptions ?? {}

  switch (type) {
    case 'time': {
      const { format, use12Hours, hourStep, minuteStep, secondStep, showNow } =
        timePickerOptions ?? {}
      if (toRangePicker) {
        return (
          <TimePickerRange
            use12Hours={use12Hours}
            format={isString(format) ? format : undefined}
            hourStep={hourStep}
            minuteStep={minuteStep}
            secondStep={secondStep}
            showNow={showNow}
            //@ts-ignore
            value={
              Array.isArray(value)
                ? [
                    first(value) && isDate(new Date(first(value) as Date))
                      ? new Date(first(value) as Date)
                      : undefined,
                    last(value) && isDate(new Date(last(value) as Date))
                      ? new Date(last(value) as Date)
                      : undefined
                  ]
                : [new Date(), add(new Date(), { weeks: 1 })]
            }
            onChange={(dates: any) =>
              handleFilterValueChange(
                (dates || []).map((value: any) => new Date(value || Date.now()))
              )
            }
          />
        )
      }
      return (
        <TimePicker
          use12Hours={use12Hours}
          format={isString(format) ? format : undefined}
          hourStep={hourStep}
          minuteStep={minuteStep}
          secondStep={secondStep}
          showNow={showNow}
          value={
            value && isDate(new Date(value as Date))
              ? new Date(value as Date)
              : undefined
          }
          onChange={(date: any) =>
            handleFilterValueChange(new Date(date || Date.now()))
          }
        />
      )
    }
    case 'number':
      if (toRangePicker) {
        const { tipFormatter, autoFocus, marks } = sliderOptions ?? {}
        return (
          <Slider
            min={min as number}
            max={max as number | undefined}
            tipFormatter={tipFormatter}
            autoFocus={autoFocus}
            marks={isPlainObject(marks) ? marks : undefined}
            step={step}
            range={{ draggableTrack: true }}
            onChange={(rangeValue: number | [number, number]) => {
              handleFilterValueChange(rangeValue)
            }}
          />
        )
      }
      return (
        <InputNumber
          defaultValue={0}
          value={isNumber(value) ? value : 0}
          style={{ width: '100%' }}
          onChange={(num) => handleFilterValueChange(num)}
          min={min as number}
          max={max as number | undefined}
          step={step}
          placeholder={
            property?.title ? `Specify ${property.title?.toLowerCase?.()}` : ''
          }
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
          placeholder={
            property?.title ? `Specify ${property.title?.toLowerCase?.()}` : ''
          }
          min={min as number}
          max={max as number | undefined}
          step={step}
        />
      )
    case 'date':
    case 'datetime':
      const disabledDate = (date: Date) => {
        if (!!min && isDate(new Date(min)) && !!max && isDate(new Date(max))) {
          return isBefore(date, new Date(min)) && isAfter(date, new Date(max))
        }
        if (
          !!min &&
          isDate(new Date(min)) &&
          !(!!max && isDate(new Date(max)))
        ) {
          return isBefore(date, new Date(min))
        }

        if (
          !(!!min && isDate(new Date(min))) &&
          !!max &&
          isDate(new Date(max))
        ) {
          return isAfter(date, new Date(max))
        }

        return false
      }
      if (toRangePicker) {
        return (
          <DatePicker.RangePicker
            showTime={type === 'datetime'}
            style={{ width: '100%' }}
            disabledDate={disabledDate}
            picker={datePickerType}
            // @ts-ignore
            value={
              Array.isArray(value)
                ? [
                    first(value) && isDate(new Date(first(value) as Date))
                      ? new Date(first(value) as Date)
                      : undefined,
                    last(value) && isDate(new Date(last(value) as Date))
                      ? new Date(last(value) as Date)
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
        )
      }
      return (
        <DatePicker
          showTime={type === 'datetime'}
          style={{ width: '100%' }}
          picker={datePickerType}
          value={
            value && isDate(new Date(value as Date))
              ? new Date(value as Date)
              : undefined
          }
          disabledDate={disabledDate}
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
