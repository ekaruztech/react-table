import React, { useReducer } from 'react'
import { Collapse, Typography, Button, Empty, Menu, Dropdown, Row } from 'antd'
import { isEmpty, isFunction, pick } from 'lodash'
import { motion } from 'framer-motion'
import QuickFilterItem from '../QuickFilterItem'
import Align from '../../../../../Align'
import Margin from '../../../../../Margin'
import Padding from '../../../../../Padding'
import Position from '../../../../../Position'
import '../../_styles.scss'
// eslint-disable-next-line no-unused-vars
import { TableColumnProps, ColumnProps } from '../../../../../types'
import { quickFilterReducer, initQuickFilterState } from '../../reducer'

const { Panel } = Collapse

const EmptyImage = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='123.58'
    height='66.37'
    viewBox='0 0 123.58 66.37'
  >
    <g transform='translate(0 1.25)'>
      <path
        d='M34.04,51.8a5.18,5.18,0,1,1,0-10.36H5.18a5.18,5.18,0,1,1,0-10.36h29.6a5.18,5.18,0,0,0,0-10.36H16.28a5.18,5.18,0,0,1,0-10.36h29.6A5.18,5.18,0,1,1,45.88,0H118.4a5.18,5.18,0,0,1,0,10.36H88.8a5.18,5.18,0,1,1,0,10.36h16.28a5.18,5.18,0,1,1,0,10.36H97.551c-3.607,0-6.531,2.319-6.531,5.179s4.44,5.18,4.44,5.18a5.18,5.18,0,1,1,0,10.36Zm79.18-25.9a5.18,5.18,0,1,1,5.18,5.18A5.18,5.18,0,0,1,113.22,25.9Z'
        transform='translate(0 7.4)'
        fill='var(--background-secondary)'
      />
      <path
        d='M21.548,0A8.88,8.88,0,1,0,39.132,0H60.68V19.753a2.22,2.22,0,0,1-2.22,2.22H2.22A2.22,2.22,0,0,1,0,19.753V0Z'
        transform='translate(31.08 43.147)'
        fill='var(--background-primary)'
      />
      <path
        d='M39.96,22.94a9.62,9.62,0,0,1-19.24,0q0-.258.013-.513H0L7.075,1.509A2.22,2.22,0,0,1,9.178,0H51.5a2.22,2.22,0,0,1,2.1,1.509L60.68,22.427H39.947Q39.96,22.682,39.96,22.94Z'
        transform='translate(31.08 19.98)'
        fill='var(--background-primary)'
      />
      <path
        d='M31.892,16.986A8.468,8.468,0,0,1,23.68,25.16a8.468,8.468,0,0,1-8.212-8.174c0-.133,0-1.005.011-1.136H0L6.039,1.166A1.89,1.89,0,0,1,7.835,0H39.525a1.89,1.89,0,0,1,1.8,1.166L47.36,15.85H31.881C31.888,15.981,31.892,16.853,31.892,16.986Z'
        transform='translate(37.74 26.64)'
        fill='var(--background-secondary)'
      />
      <g
        transform='translate(31.08 19.98)'
        fill='none'
        stroke-linejoin='round'
        stroke-miterlimit='10'
      >
        <path
          d='M7.075,1.509A2.22,2.22,0,0,1,9.178,0H51.5a2.22,2.22,0,0,1,2.1,1.509L60.68,22.427V42.18a2.22,2.22,0,0,1-2.22,2.22H2.22A2.22,2.22,0,0,1,0,42.18V22.427Z'
          stroke='none'
        />
        <path
          d='M 9.378589630126953 2.5 L 2.5 22.8382453918457 L 2.5 41.89999771118164 L 58.18000030517578 41.89999771118164 L 58.18000030517578 22.8382453918457 L 51.30142211914062 2.5 L 9.378589630126953 2.5 M 9.177707672119141 0 L 51.50229263305664 0 C 52.45426559448242 0 53.3002815246582 0.6069602966308594 53.60527801513672 1.508747100830078 L 60.68000030517578 22.42690467834473 L 60.68000030517578 42.18000030517578 C 60.68000030517578 43.40606689453125 59.68606567382812 44.39999771118164 58.45999908447266 44.39999771118164 L 2.220001220703125 44.39999771118164 C 0.9939193725585938 44.39999771118164 0 43.40606689453125 0 42.18000030517578 L 0 22.42690467834473 L 7.074718475341797 1.508747100830078 C 7.379718780517578 0.6069602966308594 8.225734710693359 0 9.177707672119141 0 Z'
          stroke='none'
          fill='#75a4fe'
        />
      </g>
      <path
        d='M10.473,10.361a9.131,9.131,0,0,1-6.423-2.6A8.723,8.723,0,0,1,1.389,1.481C1.389.963,1.389,0,0,0H20.878c-1.321.032-1.321.974-1.321,1.481A8.723,8.723,0,0,1,16.9,7.76,9.131,9.131,0,0,1,10.473,10.361Z'
        transform='translate(50.871 42.179)'
        fill='none'
        stroke='#75a4fe'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-miterlimit='10'
        stroke-width='2.5'
      />
      <path
        d='M38.553,3.184,30.34,12.4ZM19.314,0V0ZM0,3.184,8.214,12.4Z'
        transform='translate(41.44)'
        fill='none'
        stroke='#a4c3fe'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-miterlimit='10'
        stroke-width='2.5'
      />
    </g>
  </svg>
)

interface IFilterController {
  onApply: (
    value: {
      property: string
      value: string[] | number | number[] | string
    }[]
  ) => void
  onClear: () => void
  columns: TableColumnProps
  dataSource: Array<any>
}

const FilterController: React.FC<IFilterController> = (props) => {
  const { columns, dataSource, onApply, onClear } = props
  // @ts-ignore
  const [state, dispatch] = useReducer(
    quickFilterReducer,
    columns.selected,
    initQuickFilterState
  )
  const addFilter = (propertyIndex: string) => {
    const columnProperty = columns.all[parseInt(propertyIndex, 10)]
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
  }
  const applyFilter = () => {
    const filters = state.filters.map((value) =>
      pick(value, ['property', 'value'])
    )
    if (onApply && isFunction(onApply)) {
      onApply(filters)
    }
  }

  const menu = (
    <Menu
      onClick={({ key }) => (key !== 'none' ? addFilter(String(key)) : null)}
    >
      {columns.all.map(
        (value: ColumnProps, index: number, array: ColumnProps[]) => {
          const isAlreadyAdded = state.filters.find(
            (filter) => filter.key === value.key
          )
          return isAlreadyAdded ? (
            index + 1 === array.length && (
              <Menu.Item key={'none'}>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={"Oops!!! You've used all the filters"}
                />
              </Menu.Item>
            )
          ) : (
            <Menu.Item key={index}>{value?.title || '_____'}</Menu.Item>
          )
        }
      )}
    </Menu>
  )

  return (
    <div className='QuickFilter'>
      <Collapse expandIconPosition='right'>
        <Panel
          header={
            <Align alignCenter>
              <Margin right={20}>
                <Typography.Text>Quick Filter</Typography.Text>
              </Margin>
            </Align>
          }
          key='1'
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
                  description='Please add a filter'
                >
                  <Dropdown overlay={menu} trigger={['click']} arrow>
                    <Button
                      type='default'
                      icon={
                        <span className='anticon'>
                          <i className='ri-add-line' style={{ fontSize: 16 }} />
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
                        type={'primary'}
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
