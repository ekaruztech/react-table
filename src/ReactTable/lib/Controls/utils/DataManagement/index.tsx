import React, { useReducer, useState } from 'react'
import { useDimension } from '../../../../../hooks'
import { Modal, Tabs } from 'antd'
import { initDataManagementState, dataManagementReducer } from './reducer'
import Filter from './Filter'
import Sort from './Sort'
import {
  // eslint-disable-next-line no-unused-vars
  TableColumnProps,
  // eslint-disable-next-line no-unused-vars
  DateManagementAction,
  // eslint-disable-next-line no-unused-vars
  DateManagementState,
  // eslint-disable-next-line no-unused-vars
  DataFilterObject
} from '../../../../../types'
// eslint-disable-next-line no-unused-vars
import Model from '../../../../../_utils/model'
import ModalFooter from './ModalFooter'

const { TabPane } = Tabs

interface DataManagementProps {
  visible: boolean
  handleCancel:
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined
  columns: TableColumnProps
  dataSource: any
  model: Model
  onFilterApply?: (filters: DataFilterObject[]) => void
  onFilterClear?: () => void
}

const DataManagement: React.FC<DataManagementProps> = (props) => {
  const {
    visible,
    handleCancel,
    columns,
    dataSource,
    model,
    onFilterClear,
    onFilterApply
  } = props
  const [activeTab, setActiveTab] = useState('filter')

  const [state, dispatch] = useReducer<
    React.Reducer<DateManagementState, DateManagementAction>
  >(
    dataManagementReducer(model),
    // @ts-ignore
    columns.all,
    initDataManagementState(model)
  )

  const dimension = useDimension()

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
          key='reactTable__data-mgt-modal-footer'
          activeTab={activeTab}
          dispatch={dispatch}
          state={state}
          onFilterApply={onFilterApply}
          onFilterClear={onFilterClear}
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
        <TabPane tab='Filter Data' key='filter'>
          <Filter
            columns={columns}
            dataSource={dataSource}
            dispatch={dispatch}
            state={state}
            model={model}
          />
        </TabPane>
        <TabPane tab='Sort Data' key='sort'>
          <Sort
            columns={columns}
            dataSource={dataSource}
            dispatch={dispatch}
            state={state}
            model={model}
          />
        </TabPane>
      </Tabs>
    </Modal>
  )
}

export default DataManagement
