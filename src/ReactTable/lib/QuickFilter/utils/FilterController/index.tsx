import React, { useMemo, useReducer } from 'react'
import { Collapse, Typography, Button, Empty, Menu, Dropdown, Row } from 'antd'
import { isEmpty, isFunction, pick } from 'lodash'
import { motion } from 'framer-motion'
import QuickFilterItem from '../QuickFilterItem'
import Align from '../../../../../Align'
import Margin from '../../../../../Margin'
import Padding from '../../../../../Padding'
import Position from '../../../../../Position'
import '../../styles.scss'
// eslint-disable-next-line no-unused-vars
import { TableColumnProps, ColumnProps } from '../../../../../types'
import { quickFilterReducer, initQuickFilterState } from '../../reducer'
import Model from '../../../../../_utils/model'
import { EmptyImage } from '../../../../../_utils'

const { Panel } = Collapse

interface FilterControllerProps {
  onApply: (
    value: {
      property: string
      value: string[] | number | number[] | string
    }[]
  ) => void
  onClear: () => void
  columns: TableColumnProps
  dataSource: Array<any>
  model: Model
}

const FilterController: React.FC<FilterControllerProps> = (props) => {
  const { columns, dataSource, onApply, onClear, model } = props

  const validColumns = useMemo(
    () =>
      columns.all.filter(
        (o: ColumnProps) => o.type !== 'action' && o.quickFilter !== false
      ),
    [columns.all]
  )
  // @ts-ignore
  const [state, dispatch] = useReducer(
    quickFilterReducer(model),
    validColumns,
    initQuickFilterState(model)
  )

  const addFilter = (propertyIndex: string) => {
    const columnProperty = validColumns[parseInt(propertyIndex, 10)]
    dispatch({
      type: 'ADD_FILTER',
      payload: {
        ...columnProperty,
        property: columnProperty?.key,
        value: null
      }
    })
  }
  const clearFilter = () => {
    dispatch({ type: 'RESET' })

    if (onClear && isFunction(onClear)) {
      onClear()
    }
    model.store('hasAppliedQuickFilter', false)
  }
  const applyFilter = () => {
    const filters = state.filters.map((value) =>
      pick(value, ['property', 'value'])
    )
    if (onApply && isFunction(onApply)) {
      onApply(filters)
    }
    model.store('hasAppliedQuickFilter', true)
  }

  const menu = (
    <Menu
      onClick={({ key }) => (key !== 'none' ? addFilter(String(key)) : null)}
    >
      {validColumns.map(
        (value: ColumnProps, index: number, array: ColumnProps[]) => {
          const isAlreadyAdded = state.filters.find(
            (filter) => filter.key === value.key
          )
          if (isAlreadyAdded) {
            if (index + 1 === array.length) {
              return (
                <Menu.Item key='none'>
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={"Oops!!! You've used all the filters"}
                  />
                </Menu.Item>
              )
            } else {
              return null
            }
          }
          return <Menu.Item key={index}>{value?.title || '---'}</Menu.Item>
        }
      )}
    </Menu>
  )

  return (
    <div className='ReactTable___QuickFilter'>
      <Collapse expandIconPosition='right'>
        <Panel
          header={
            <Align alignCenter>
              <Margin right={20}>
                <Typography.Text style={{ color: 'var(--heading-color)' }}>
                  Quick Filter
                </Typography.Text>
              </Margin>
            </Align>
          }
          key='quick-filter'
        >
          <Align
            className='filter-container'
            alignCenter
            justifyCenter={isEmpty(state.filters)}
          >
            {isEmpty(state.filters) ? (
              <motion.div
                exit={{ opacity: 0, scale: 0.6 }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ width: '100%' }}
              >
                <Empty
                  image={EmptyImage}
                  imageStyle={{
                    height: 60
                  }}
                  description={
                    <Padding
                      top={15}
                      componentType='span'
                      style={{ color: 'var(--text-color-secondary)' }}
                    >
                      No filter was added, click Add filter to add one.
                    </Padding>
                  }
                >
                  <Dropdown overlay={menu} trigger={['click']} arrow>
                    <Button
                      type='default'
                      icon={
                        <span className='anticon'>
                          <i className='ri-add-line' />
                        </span>
                      }
                    >
                      Add filter
                    </Button>
                  </Dropdown>
                </Empty>
              </motion.div>
            ) : (
              <motion.div style={{ width: '100%' }}>
                <Align className='filter-body' type='column'>
                  <Align alignStart className='filter-header'>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <Button
                        type='link'
                        icon={
                          <span className='anticon'>
                            <i
                              className='ri-add-line'
                              style={{ fontSize: 16 }}
                            />
                          </span>
                        }
                      >
                        Add filter
                      </Button>
                    </Dropdown>
                  </Align>

                  <Padding
                    className='filter-elements-wrapper'
                    vertical={16}
                    horizontal={16}
                  >
                    <Row gutter={[15, 20]}>
                      {state.filters.map((property, index) => {
                        return (
                          <QuickFilterItem
                            key={`${property.type}___${index}`}
                            dataSource={dataSource}
                            dispatch={dispatch}
                            property={property}
                          />
                        )
                      })}
                    </Row>
                  </Padding>
                  <Position
                    type='absolute'
                    bottom={0}
                    style={{ width: '100%' }}
                    className='filter-footer'
                  >
                    <Align style={{ width: '100%' }} justifyBetween alignCenter>
                      <Button
                        type='default'
                        onClick={clearFilter}
                        icon={
                          <span className='anticon'>
                            <i
                              className='ri-close-line'
                              style={{ fontSize: 16 }}
                            />
                          </span>
                        }
                      >
                        Clear filter
                      </Button>
                      <Button
                        type='primary'
                        onClick={applyFilter}
                        icon={
                          <span className='anticon'>
                            <i
                              className='ri-filter-line'
                              style={{ fontSize: 16 }}
                            />
                          </span>
                        }
                      >
                        Apply filter
                      </Button>
                    </Align>
                  </Position>
                </Align>
              </motion.div>
            )}
          </Align>
        </Panel>
      </Collapse>
    </div>
  )
}

export default FilterController
