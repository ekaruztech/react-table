import { toPercentage, useDimension } from '../../../../../../hooks'
import React, { useState, Fragment } from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import Align from '../../../../../../Align'
import Padding from '../../../../../../Padding'
import { Button, Empty, Radio, Tooltip } from 'antd'
import {
  // eslint-disable-next-line no-unused-vars
  TableColumnProps,
  // eslint-disable-next-line no-unused-vars
  DateManagementState,
  // eslint-disable-next-line no-unused-vars
  DateManagementAction
} from '../../../../../../types'
import FilterItem from './utils/FilterItem'
// eslint-disable-next-line no-unused-vars
import Model from '../../../../../../_utils/model'
import { isEmpty } from 'lodash'
import { motion } from 'framer-motion'
import { EmptyImage } from '../../../../../../_utils'
import './styles.scss'

interface FilterProps {
  columns: TableColumnProps
  dataSource: Array<any>
  dispatch: React.Dispatch<DateManagementAction>
  state: DateManagementState
  model: Model
}
export default (props: FilterProps) => {
  const { columns, dataSource, dispatch, state, model } = props
  const windowDimension = useDimension()

  const [logicType, setLogicType] = useState<'or' | 'and'>(
    model.advancedFilter.queryType
  )

  const onLogicTypeChange = (logicType: 'or' | 'and') => {
    model.store('advancedFilter', {
      queryType: logicType
    })
    setLogicType(logicType)
  }
  const filterDataLength = state.filters.length

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
  return (
    <ScrollBar>
      <Padding
        horizontal={20}
        style={{
          height: toPercentage(windowDimension.height, 0.65, 80),
          overflow: 'auto scroll'
        }}
        className={'ReactTable___DataManagement-Filter '}
      >
        {isEmpty(state.filters) ? (
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
              description='Please add a filter'
            >
              <Button
                type='default'
                onClick={addFilter}
                icon={
                  <span className='anticon'>
                    <i className='ri-add-line' style={{ fontSize: 16 }} />
                  </span>
                }
              >
                Add filter
              </Button>
            </Empty>
          </motion.div>
        ) : (
          <Fragment>
            <Align alignCenter justifyCenter style={{ width: '100%' }}>
              <Padding bottom={20}>
                <Radio.Group
                  onChange={(e) => onLogicTypeChange(e.target.value)}
                  value={logicType}
                  optionType='button'
                  buttonStyle='solid'
                >
                  <Tooltip
                    title={
                      "Returns result if there's a match for any of the queries (read guide below)."
                    }
                  >
                    <Radio value='or'>Match any query</Radio>
                  </Tooltip>
                  <Tooltip
                    title={
                      "Returns result if there's a match for all of the queries  (read guide below)."
                    }
                  >
                    <Radio value='and'>Match all queries</Radio>
                  </Tooltip>
                </Radio.Group>
              </Padding>
            </Align>
            <Align
              type='column'
              alignCenter
              justifyCenter
              id='filter__field__container'
            >
              {(state?.filters || []).map((data, index: number) => {
                return (
                  <FilterItem
                    key={data?.filterIndex || index}
                    columns={columns}
                    filterData={data}
                    logicType={logicType}
                    isLastIndex={index === filterDataLength - 1}
                    isMoreThanOne={filterDataLength > 1}
                    isFirstIndex={index === 0}
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
