// eslint-disable-next-line no-unused-vars
import React, { FC, Fragment } from 'react'
import {
  // eslint-disable-next-line no-unused-vars
  DateManagementAction,
  // eslint-disable-next-line no-unused-vars
  DateManagementState,
  // eslint-disable-next-line no-unused-vars
  TableColumnProps
} from '../../../../../../types'
// eslint-disable-next-line no-unused-vars
import Model from '../../../../../../_utils/model'
import ScrollBar from 'react-perfect-scrollbar'
import Padding from '../../../../../../Padding'
import { toPercentage, useDimension } from '../../../../../../hooks'
import { isEmpty } from 'lodash'
import { motion } from 'framer-motion'
import { Button, Empty, Row, Col, Typography } from 'antd'
import { EmptyImage } from '../../../../../../_utils'
import Align from '../../../../../../Align'
import SortItem from './utils/SortItem'

interface SortProps {
  columns: TableColumnProps
  dataSource: Array<any>
  dispatch: React.Dispatch<DateManagementAction>
  state: DateManagementState
  model: Model
}
const Sort: FC<SortProps> = (props) => {
  const { columns, dataSource, dispatch, state } = props
  const windowDimension = useDimension()

  const addSort = () => {
    dispatch({
      type: 'ADD_SORT',
      payload: {
        sortProps: {
          property: null,
          order: 'ascending',
          range: null
        }
      }
    })
  }
  return (
    <ScrollBar>
      <Padding
        horizontal={20}
        style={{
          height: toPercentage(windowDimension.height, 0.65, 80),
          overflow: 'auto scroll'
        }}
        className={'ReactTable___DataManagement-Sort '}
      >
        {isEmpty(state.sorts) ? (
          <motion.div
            exit={{ opacity: 0, scale: 0.6 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className={'Empty__Container'}
            style={{
              height: toPercentage(windowDimension.height, 0.65, 80)
            }}
          >
            <Empty
              image={EmptyImage}
              imageStyle={{
                height: 60
              }}
              description={
                <Padding top={15} componentType='span'>
                  <p style={{ color: 'var(--text-color-secondary)' }}>
                    No sort type was added, click Add sort to add one.
                  </p>
                </Padding>
              }
            >
              <Button
                type='default'
                onClick={addSort}
                icon={
                  <span className='anticon'>
                    <i className='ri-add-line' />
                  </span>
                }
              >
                Add sort
              </Button>
            </Empty>
          </motion.div>
        ) : (
          <Fragment>
            <Row gutter={[20, 40]}>
              <Col span={6}>
                <Typography.Text>Property</Typography.Text>
              </Col>
              <Col span={6} style={{ paddingLeft: 5 }}>
                <Typography.Text>Sort Order</Typography.Text>
              </Col>
              <Col span={6} style={{ paddingLeft: 5, paddingRight: 0 }}>
                <Typography.Text>Sort Range (start)</Typography.Text>
              </Col>
              <Col span={5}>
                <Typography.Text>Sort Range (end)</Typography.Text>
              </Col>
              <Col span={1} />
            </Row>
            <Align
              type='column'
              alignCenter
              justifyCenter
              id='sort__field__container'
            >
              {(state?.sorts || []).map((sort, index: number) => {
                return (
                  <SortItem
                    key={sort?.sortIndex || index}
                    columns={columns}
                    sortData={sort}
                    dataSource={dataSource}
                    dispatch={dispatch}
                  />
                )
              })}
            </Align>
          </Fragment>
        )}
      </Padding>
    </ScrollBar>
  )
}

export default Sort
