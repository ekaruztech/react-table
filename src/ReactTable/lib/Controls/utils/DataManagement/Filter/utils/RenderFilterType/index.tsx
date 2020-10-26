import Align from '../../../../../../../../Align'
import {
  AutoComplete,
  DatePicker,
  InputNumber,
  Select,
  Input,
  Row,
  Col
} from 'antd'
import moment from 'moment'
import { has, isEmpty, isNumber } from 'lodash'
import { toPercentage } from '../../../../../../../../hooks'
import React from 'react'
import TagRender from '../TagRender'
import { isDate } from '../../../../../../../../_utils'

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
        <Row gutter={[20, 0]} style={{ width: '100%', margin: 0 }}>
          <Col span={10} style={{ paddingLeft: 0 }}>
            {type === 'date' || type === 'datetime' ? (
              <DatePicker
                style={{ width: '100%' }}
                showTime={type === 'datetime'}
                value={moment(
                  isDate(value?.start && new Date(value?.start))
                    ? value?.start
                    : new Date()
                )}
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
                style={{ width: '100%' }}
                onChange={(num) =>
                  handleFilterValueChange(num, 'range', 'start')
                }
              />
            )}
          </Col>
          <Col span={4}>
            <SuffixStatement />
          </Col>
          <Col span={10} style={{ paddingRight: 0 }}>
            {type === 'date' || type === 'datetime' ? (
              <DatePicker
                style={{ width: '100%' }}
                showTime={type === 'datetime'}
                value={moment(
                  isDate(value?.end && new Date(value?.end))
                    ? value?.end
                    : new Date()
                )}
                onChange={(date) =>
                  handleFilterValueChange(
                    moment(date || new Date()).toDate(),
                    'range',
                    'end'
                  )
                }
              />
            ) : (
              <InputNumber
                defaultValue={0}
                style={{ width: '100%' }}
                value={isNumber(value?.end) ? value?.end : 0}
                onChange={(num) => handleFilterValueChange(num, 'range', 'end')}
              />
            )}
          </Col>
        </Row>
      </Align>
    )

  switch (type) {
    case 'number':
    case 'currency':
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
          value={moment(value && isDate(new Date(value)) ? value : new Date())}
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
          value={moment(value && isDate(new Date(value)) ? value : new Date())}
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
