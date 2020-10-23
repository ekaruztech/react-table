import React, { useReducer, useState } from 'react'
import { useDimension } from '../../../../../hooks'
import Margin from '../../../../../Margin'
import Align from '../../../../../Align'
import { Button, Modal, Popover, Tabs, Tooltip } from 'antd'
import { initDataManagementState, dataManagementReducer } from './reducer'
import Filter from './Filter'
import Sort from './Sort'
import {
  // eslint-disable-next-line no-unused-vars
  TableColumnProps,
  // eslint-disable-next-line no-unused-vars
  DateManagementAction,
  // eslint-disable-next-line no-unused-vars
  DateManagementState
} from '../../../../../types'
// eslint-disable-next-line no-unused-vars
import Model from '../../../../../_utils/model'

const { TabPane } = Tabs

interface DataManagementProps {
  visible: boolean
  handleCancel:
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined
  columns: TableColumnProps
  dataSource: any
  model: Model
}

interface ModalFooterProps {
  activeTab: string
  dispatch: React.Dispatch<DateManagementAction>
  state: DateManagementState
}

const DataManagement: React.FC<DataManagementProps> = (props) => {
  const { visible, handleCancel, columns, dataSource, model } = props
  const [activeTab, setActiveTab] = useState('filter')

  const [state, dispatch] = useReducer<
    React.Reducer<DateManagementState, DateManagementAction>
  >(
    dataManagementReducer(model),
    // @ts-ignore
    columns.selected,
    initDataManagementState(model)
  )

  const dimension = useDimension()

  const ModalFooter: React.FC<ModalFooterProps> = (props) => {
    const { activeTab, dispatch, state } = props
    if (activeTab === 'filter') {
      const addFilter = () => {
        dispatch({
          type: 'ADD_FILTER',
          payload: {
            filterProps: {
              property: null,
              type: null,
              value: null
            }
          }
        })
      }
      const applyFilter = () => {
        console.log(state?.filters)
      }
      const clearFilters = () => {
        dispatch({ type: 'RESET_FILTER' })
      }
      return (
        <Align style={{ width: '100%' }} alignCenter justifyBetween>
          <Align alignCenter>
            <Popover
              placement='rightBottom'
              style={{ width: 240 }}
              title={
                <strong style={{ color: 'var(--text-color)' }}>
                  Using the filter
                </strong>
              }
              content={
                <p
                  style={{
                    width: 240,
                    fontSize: 13,
                    color: 'var(--text-color)'
                  }}
                >
                  This Filter allows you to assign filtering parameters to
                  specific columns.
                </p>
              }
              trigger='click'
            >
              <Tooltip title='Help'>
                <Button type='link'>
                  <span className='anticon'>
                    <i className='ri-question-line' style={{ fontSize: 20 }} />
                  </span>
                </Button>
              </Tooltip>
            </Popover>
            <Margin left={20}>
              <Button
                type='primary'
                icon={
                  <span className='anticon'>
                    <i className='ri-add-line' style={{ fontSize: 16 }} />
                  </span>
                }
                onClick={addFilter}
              >
                Add Filter
              </Button>
            </Margin>
          </Align>
          <Align>
            <Button onClick={clearFilters}>Clear filter</Button>
            <Margin left={20}>
              <Button
                icon={
                  <span className='anticon'>
                    <i className='ri-filter-line' style={{ fontSize: 16 }} />
                  </span>
                }
                onClick={applyFilter}
                type='primary'
              >
                Apply filter
              </Button>
            </Margin>
          </Align>
        </Align>
      )
    }
    if (activeTab === 'sort') {
      return (
        <Align style={{ width: '100%' }} alignCenter justifyBetween>
          <Align alignCenter>
            <Popover
              style={{ width: 240 }}
              title={
                <strong style={{ color: 'var(--text-color)' }}>
                  Using the sort
                </strong>
              }
              content={
                <p
                  style={{
                    width: 240,
                    fontSize: 13,
                    color: 'var(--text-color)'
                  }}
                >
                  We supply a series of design principles, practical patterns
                  and high quality design resources (Sketch and Axure), to help
                  people create their product prototypes beautifully and
                  efficiently.
                </p>
              }
              trigger='click'
            >
              <Tooltip title='Help'>
                <Button type='link'>
                  <span className='anticon'>
                    <i className='ri-question-line' style={{ fontSize: 20 }} />
                  </span>
                </Button>
              </Tooltip>
            </Popover>
            <Margin left={20}>
              <Button
                type='primary'
                icon={
                  <span className='anticon'>
                    <i className='ri-add-line' style={{ fontSize: 16 }} />
                  </span>
                }
              >
                Add sort
              </Button>
            </Margin>
          </Align>
          <Align>
            {' '}
            <Button>Clear sort</Button>
            <Margin left={20}>
              <Button
                icon={
                  <span className='anticon'>
                    <i className='ri-sort-desc' style={{ fontSize: 16 }} />
                  </span>
                }
                type='primary'
              >
                Apply sort
              </Button>
            </Margin>
          </Align>
        </Align>
      )
    }
    return null
  }

  return (
    <Modal
      visible={visible}
      title='Data Management'
      onCancel={handleCancel}
      centered
      width='75%'
      bodyStyle={{ height: dimension.height * 0.65, padding: 0 }}
      footer={[
        <ModalFooter
          key='modal-footer'
          activeTab={activeTab}
          dispatch={dispatch}
          state={state}
        />
      ]}
    >
      <Tabs
        defaultActiveKey='filter'
        centered
        tabBarStyle={{ height: 50 }}
        tabBarGutter={40}
        onChange={(key) => setActiveTab(key)}
      >
        <TabPane tab='Filter' key='filter'>
          <Filter
            columns={columns}
            dataSource={dataSource}
            dispatch={dispatch}
            state={state}
            model={model}
          />
        </TabPane>
        <TabPane tab='Sort' key='sort'>
          <Sort />
        </TabPane>
      </Tabs>
    </Modal>
  )
}

export default DataManagement
