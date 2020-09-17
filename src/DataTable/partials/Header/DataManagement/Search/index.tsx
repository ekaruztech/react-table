import { toPercentage, useDimension } from '../../../../../hooks'
import React, { useState } from 'react'
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Typography
} from 'antd'
import { Align, Padding } from '../../../../../TableUtility'
// eslint-disable-next-line no-unused-vars
import { ColumnProps, TableColumnProps } from '../../../../types'

const { Option } = Select
interface SearchProps {
  columns: TableColumnProps
}
export default (props: SearchProps) => {
  const { columns } = props
  const dimension = useDimension('element', 'search__form__input')
  const [selectedField, setSelectedField] = useState<ColumnProps | null>(null)
  const onChange = (value: string) => {
    const type = columns?.all?.find?.((o) => o.key === value) || null
    setSelectedField(() => type)
    console.log(`selected`, value, columns, type)
  }

  function onBlur() {
    console.log('blur')
  }

  function onFocus() {
    console.log('focus')
  }

  function onSearch(val: string) {
    console.log('search:', val)
  }
  const SearchType = () => {
    const displayType = selectedField?.type || 'text'
    if (displayType === 'number') {
      return (
        <InputNumber
          style={{ width: toPercentage(dimension.width, 0.45) }}
          placeholder='Search value'
        />
      )
    }
    if (displayType === 'boolean') {
      return (
        <Select
          defaultValue='true'
          optionFilterProp='children'
          filterOption={(input, option) =>
            (option || {}).children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          style={{ width: toPercentage(dimension.width, 0.45) }}
        >
          <Option value='true'>True</Option>
          <Option value='false'>False</Option>
        </Select>
      )
    }
    if (displayType === 'date') {
      return (
        <DatePicker
          style={{ width: toPercentage(dimension.width, 0.45) }}
          onChange={() => null}
        />
      )
    }
    if (displayType === 'datetime') {
      return (
        <DatePicker
          showTime
          style={{ width: toPercentage(dimension.width, 0.45) }}
          onChange={(value) => console.log(value)}
          onOk={(value) => console.log(`OK ${value}`)}
        />
      )
    }
    return (
      <Input
        style={{ width: toPercentage(dimension.width, 0.45) }}
        placeholder='Search value'
      />
    )
  }
  return (
    <Align alignCenter justifyCenter type='column' style={{ height: '100%' }}>
      <Align style={{ width: '100%' }} alignCenter justifyCenter>
        <Padding top={30} bottom={60}>
          <Typography.Text
            style={{
              fontSize: 30
            }}
          >
            What are you looking for?
          </Typography.Text>
        </Padding>
      </Align>
      <Align
        style={{ width: '80%' }}
        id='search__form__input'
        alignCenter
        justifyBetween
      >
        <Padding right={20}>
          <Align type='column'>
            <Typography.Text
              strong
              style={{ width: toPercentage(dimension.width, 0.4) }}
            >
              Where
            </Typography.Text>
            <Padding top={30}>
              <Select
                showSearch
                style={{
                  width: toPercentage(dimension.width, 0.4)
                }}
                placeholder='Select a search field'
                optionFilterProp='children'
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option || {}).children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {columns.selected.map((value, index) => {
                  return (
                    <Option value={value.key} key={index}>
                      {value.title}
                    </Option>
                  )
                })}
              </Select>
            </Padding>
          </Align>
        </Padding>

        <Align type='column'>
          <Typography.Text
            strong
            style={{ width: toPercentage(dimension.width, 0.5) }}
          >
            What
          </Typography.Text>
          <Padding top={30}>
            <SearchType />
          </Padding>
        </Align>
      </Align>
      <Align style={{ width: '100%' }} alignCenter justifyCenter>
        <Padding top={60}>
          <Button
            type='primary'
            icon={
              <span className='anticon'>
                <i className='ri-search-2-line' style={{ fontSize: 16 }} />
              </span>
            }
          >
            Search
          </Button>
        </Padding>
      </Align>
    </Align>
  )
}
