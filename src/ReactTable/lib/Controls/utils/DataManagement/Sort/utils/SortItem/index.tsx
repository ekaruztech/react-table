import React, { useMemo } from 'react'
import { Button, Select, Tooltip, Row, Col, InputNumber } from 'antd'
import { motion } from 'framer-motion'
import Align from '../../../../../../../../Align'

import {
  // eslint-disable-next-line no-unused-vars
  ColumnProps,

  // eslint-disable-next-line no-unused-vars
  TableColumnProps,
  // eslint-disable-next-line no-unused-vars
  DateManagementAction
} from '../../../../../../../../types'

const { Option } = Select

type SortItemProps = {
  columns: TableColumnProps
  sortData: any
  dataSource: any
  dispatch: React.Dispatch<DateManagementAction>
}
const SortItem: React.FC<SortItemProps> = (props) => {
  const { columns, sortData, dispatch } = props
  // Current Property
  // const [property, setProperty] = useState(sortData)

  const validColumns = useMemo(
    () => columns.selected.filter((o: ColumnProps) => o.type !== 'action'),
    [columns.selected]
  )

  const handleValueChange = (value: any) => {
    dispatch({
      type: 'UPDATE_SORT',
      payload: { ...sortData, sortProps: { ...sortData.sortProps, ...value } }
    })
  }
  const handleClear = () => {
    dispatch({
      type: 'REMOVE_SORT',
      payload: { sortIndex: sortData.sortIndex }
    })
  }

  return (
    <Align justifyCenter style={{ width: '100%' }} type='column'>
      <motion.div
        exit={{ opacity: 0, y: 40 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ overflow: 'hidden' }}
      >
        <Row gutter={[20, 50]} style={{ width: '100%' }}>
          <Col span={6}>
            <Select
              showSearch
              style={{
                width: '100%'
              }}
              placeholder='Select a property'
              onChange={(property) => handleValueChange({ property })}
              value={sortData.sortProps.property}
              filterOption
            >
              {(validColumns || [])?.map?.((value, index) => {
                return (
                  <Option value={value.key} key={index}>
                    {value.title}
                  </Option>
                )
              })}
            </Select>
          </Col>

          <Col span={6}>
            <Select
              style={{
                width: '100%'
              }}
              placeholder='Select a sort order'
              onChange={(order) => handleValueChange({ order })}
              value={sortData.sortProps.order}
            >
              <Option value='ascending'>Ascending</Option>
              <Option value='descending'>Descending</Option>
            </Select>
          </Col>
          <Col span={6}>
            <InputNumber
              min={1}
              max={100000}
              onChange={(from) =>
                handleValueChange({
                  range: Object.assign({}, sortData.sortProps.range, { from })
                })
              }
              value={sortData.sortProps.range?.from}
              style={{
                width: '100%'
              }}
            />
          </Col>
          <Col span={5}>
            <InputNumber
              min={1}
              max={100000}
              onChange={(to) =>
                handleValueChange({
                  range: Object.assign({}, sortData.sortProps.range, { to })
                })
              }
              value={sortData.sortProps.range?.to}
              style={{
                width: '100%'
              }}
            />
          </Col>
          <Col span={1}>
            <Tooltip title='Remove'>
              <motion.div whileTap={{ scale: 0.8 }}>
                <Button type='text' danger shape='circle' onClick={handleClear}>
                  <span className='anticon'>
                    <i
                      className='ri-delete-bin-2-line'
                      style={{ fontSize: 16 }}
                    />
                  </span>
                </Button>
              </motion.div>
            </Tooltip>
          </Col>
        </Row>
      </motion.div>
    </Align>
  )
}

export default SortItem
