import React from 'react'
import { isFunction } from 'lodash'
import {
  // eslint-disable-next-line no-unused-vars
  DataFilterObject,
  // eslint-disable-next-line no-unused-vars
  DateManagementAction,
  // eslint-disable-next-line no-unused-vars
  DataManagementFilterProps,
  // eslint-disable-next-line no-unused-vars
  DateManagementState,
  // eslint-disable-next-line no-unused-vars
  DataSortObject,
  // eslint-disable-next-line no-unused-vars
  DataManagementSortProps
} from '../../../../../../types'
import Align from '../../../../../../Align'
import { Button, Popover, Tooltip } from 'antd'
import Margin from '../../../../../../Margin'
// eslint-disable-next-line no-unused-vars
import Model from '../../../../../../_utils/model'

interface ModalFooterProps {
  activeTab: string
  dispatch: React.Dispatch<DateManagementAction>
  state: DateManagementState
  onFilterApply?: (value: {
    filters: DataFilterObject[]
    queryType: 'or' | 'and'
  }) => void
  onFilterClear?: () => void
  onSortApply?: (filters: DataSortObject[]) => void
  onSortClear?: () => void
  model: Model
}
const ModalFooter: React.FC<ModalFooterProps> = (props) => {
  const {
    activeTab,
    dispatch,
    state,
    onFilterApply,
    onFilterClear,
    onSortApply,
    onSortClear,
    model
  } = props
  if (activeTab === 'filter') {
    const addFilter = () => {
      dispatch({
        type: 'ADD_FILTER',
        payload: {
          filterProps: {
            property: null,
            filterType: null,
            value: null,
            propertyType: 'text'
          }
        }
      })
    }
    const applyFilter = () => {
      if (isFunction(onFilterApply)) {
        const filters: DataFilterObject[] = state.filters.map(
          (o: DataManagementFilterProps) => o.filterProps
        )
        onFilterApply({ filters, queryType: model.advancedFilter.queryType })
      }
      model.store('hasAppliedAdvancedFilter', true)
    }
    const clearFilters = () => {
      dispatch({ type: 'RESET_FILTER' })
      if (isFunction(onFilterClear)) {
        onFilterClear()
      }
      model.store('hasAppliedAdvancedFilter', false)
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
    const applySort = () => {
      if (isFunction(onSortApply)) {
        const sorts: DataSortObject[] = state.sorts.map(
          (o: DataManagementSortProps) => o.sortProps
        )
        onSortApply(sorts)
      }
    }
    const clearSorts = () => {
      dispatch({ type: 'RESET_SORT' })
      if (isFunction(onSortClear)) {
        onSortClear()
      }
    }
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
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
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
              onClick={addSort}
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
          <Button onClick={clearSorts}>Clear sort</Button>
          <Margin left={20}>
            <Button
              onClick={applySort}
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

export default ModalFooter
