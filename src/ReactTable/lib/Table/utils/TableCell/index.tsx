/* eslint-disable no-unused-vars */
import React, { useRef, useState, Fragment } from 'react'
import { Checkbox, Drawer, Button, Tooltip, Modal } from 'antd'
import { motion } from 'framer-motion'
import presentationHOC from './utils/presentationHOC'
import Presentation from './utils/Presentation'
import { ReactTableContext } from '../../../ReactTableContext'
import { TableBodyContext } from '../TableBody/utils/TableBodyContext'
import Padding from '../../../../../Padding'
import { find, isBoolean, first, isFunction, isString, isNumber } from 'lodash'
import './styles/index.scss'
import { ColumnProps } from '../../../../../typings'
import { formatColumnsToKey } from '../../../../../_utils'

interface ITableCell {
  /** DataSource item. */
  source: any
  extraColumnsLength: number
  index?: number
}

// TODO: Update TableCells to allow for more presentation types.
const TableCell: React.FC<ITableCell> = (props) => {
  const { source, extraColumnsLength = 1, index } = props

  const trRef = useRef()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [showHoverActions, setShowHoverActions] = useState(false)
  const onClose = () => {
    setDrawerVisible(false)
  }
  const showDeleteConfirm = (onDelete: (key: string) => void): void => {
    Modal.confirm({
      title: 'Do you want to delete item?',
      content: 'You might not be able to undo this action!',
      icon: (
        <span className={'anticon'}>
          <i className='ri-error-warning-line' style={{ fontSize: 20 }} />
        </span>
      ),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        if (onDelete && isFunction(onDelete)) {
          onDelete(source?.key || null)
        }
      }
    })
  }

  // @ts-ignore

  // TODO: Add table numbering.
  return (
    <ReactTableContext.Consumer>
      {({ onSelectedItemChange, selectedTableItems, columnKeys, columns }) => (
        <TableBodyContext.Consumer>
          {({
            expandedView = null,
            allowCellSelect,
            cellMenu,
            hoverActions,
            enableHoverActions,
            disableCell,
            expandedViewWidth = '50%',
            expandedViewTitle = 'Expanded View',
            expandedViewPlacement = 'left',
            expandedViewFooter = null,
            onExpandedViewClose,
            onExpandedViewOpen
          }) => {
            const tableColumnsObject = formatColumnsToKey(columns.all ?? [])
            const _expandedViewWidth =
              isString(expandedViewWidth) ||
              (isNumber(expandedViewWidth) && !isNaN(expandedViewWidth))
                ? expandedViewWidth
                : '50%'

            const showDrawer = () => {
              if (expandedView && isFunction(expandedView)) {
                if (React.isValidElement(expandedView(source))) {
                  setDrawerVisible(true)
                  if (isFunction(onExpandedViewOpen)) {
                    onExpandedViewOpen()
                  }
                }
              }
            }
            const onOpenExpandedView = () => {
              showDrawer()
              if (
                hoverActions &&
                hoverActions?.onExpandedView &&
                isFunction(hoverActions?.onExpandedView)
              ) {
                const onExpandedView = hoverActions.onExpandedView
                onExpandedView(source)
              }
            }
            const isDisabled = isFunction(disableCell)
              ? disableCell(source)
              : false
            const cellSelected =
              find(selectedTableItems?.itemList, ['key', source?.key]) !==
              undefined

            /**
             * When enableHoverActions is a function, you want to show the hover actions,
             * but disabled or enable their clicks (button) based on whether the function returns a truthy value or falsy value
             **/
            const enableExpandedViewHoverAction =
              (Array.isArray(enableHoverActions) &&
                first(enableHoverActions)) ||
              (isBoolean(enableHoverActions) && enableHoverActions) ||
              isFunction(enableHoverActions)

            /**
             * When enableHoverActions is a function, you want to show the hover actions,
             * but disabled or enable their clicks (button) based on whether the function returns a truthy value or falsy value
             **/
            const enableDeleteHoverAction =
              (Array.isArray(enableHoverActions) &&
                enableHoverActions.length === 3 &&
                enableHoverActions[2]) ||
              (isBoolean(enableHoverActions) && enableHoverActions) ||
              isFunction(enableHoverActions)

            /**
             * When enableHoverActions is a function, you want to show the hover actions,
             * but disabled or enable their clicks (button) based on whether the function returns a truthy value or falsy value
             **/
            const enableEditHoverAction =
              (Array.isArray(enableHoverActions) &&
                enableHoverActions.length >= 2 &&
                !!enableHoverActions[1]) ||
              (isBoolean(enableHoverActions) && enableHoverActions) ||
              isFunction(enableHoverActions)

            // Returns a result for the hoverActions enabler if it is a function, otherwise default to true.
            const enableHoverActionFnResult = isFunction(enableHoverActions)
              ? enableHoverActions(source)
              : true

            /**
             * Disabled state is for situation where enableHoverActions is of type `function`
             * Note: when enableHoverActions is a function that returns an array of boolean, we show the hover actions,
             * but only disable it based on the return value of the function
             **/
            const expandedViewHoverActionDisabledState =
              (Array.isArray(enableHoverActionFnResult) &&
                !first(enableHoverActionFnResult)) ||
              (isBoolean(enableHoverActionFnResult) &&
                !enableHoverActionFnResult)

            const editHoverActionDisabledState = isFunction(enableHoverActions)
              ? Array.isArray(enableHoverActionFnResult)
                ? enableHoverActionFnResult[1] !== true
                : !enableHoverActionFnResult
              : false

            const deleteHoverActionDisabledState =
              (Array.isArray(enableHoverActionFnResult) &&
                enableHoverActionFnResult.length === 3 &&
                !enableHoverActionFnResult[2]) ||
              (isBoolean(enableHoverActionFnResult) &&
                !enableHoverActionFnResult)

            const cellMenuCallback = (child: React.ReactElement<any>) => {
              if (React.isValidElement(child)) {
                // Adds showDrawer as a property for cellmenu to enable showing of drawer.
                return React.cloneElement(child as React.ReactElement<any>, {
                  showDrawer,
                  source,
                  showExpandedView: enableExpandedViewHoverAction
                })
              }
              return null
            }
            const revisedCellMenu = React.Children.map(
              cellMenu,
              cellMenuCallback
            )

            return (
              <Fragment>
                <motion.tr
                  // layout
                  onMouseOver={() => {
                    setShowHoverActions(true)
                  }}
                  onMouseLeave={() => {
                    setShowHoverActions(false)
                  }}
                  // @ts-ignore
                  ref={trRef}
                  className={`${
                    cellSelected
                      ? 'ReactTable___table-body-row-checked '
                      : 'ReactTable___table-body-row'
                  }`}
                  key={`react-table-col-${source?.key ?? index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: 'spring',
                    delay: (index || 1) * 0.02,
                    stiffness: 100,
                    damping: 13
                  }}
                >
                  {allowCellSelect && (
                    <td className='ReactTable___table-body-cell table-body-cell-fixed-left'>
                      <div
                        className='ReactTable___table-body-cell-checkbox-container'
                        style={{ opacity: isDisabled ? 0.5 : 1 }}
                      >
                        <Checkbox
                          key={source?.key}
                          onChange={(e) => {
                            onSelectedItemChange(
                              !e.target?.checked
                                ? selectedTableItems?.itemList.filter(
                                    (value: any) => value?.key !== source?.key
                                  )
                                : selectedTableItems?.itemList.concat(source)
                            )
                          }}
                          checked={cellSelected}
                        />
                      </div>
                    </td>
                  )}

                  {columnKeys.map((key, cellIndex) => {
                    const retrieved = tableColumnsObject[key]
                    /** Value is mapped to the key of the column */
                    const data = source[key]

                    return presentationHOC({
                      extraColumnsLength,
                      columnKeys,
                      key: `#PRESENTATION_${source?.key || index}_${cellIndex}`,
                      cellIndex,
                      isDisabled
                    })(
                      <Presentation
                        data={data}
                        columnProps={retrieved as ColumnProps}
                        source={source}
                        isDisabled={isDisabled}
                      />
                    )
                  })}

                  <td className='ReactTable___table-body-cell table-body-cell-fixed-right'>
                    <div
                      className='ReactTable___table-utility'
                      style={{ opacity: isDisabled ? 0.5 : 1 }}
                    >
                      {showHoverActions && (
                        <Fragment>
                          {enableExpandedViewHoverAction && (
                            <Padding
                              right={
                                !!cellMenu && !enableEditHoverAction ? 5 : 0
                              }
                            >
                              <Tooltip placement='top' title='Quick view'>
                                <Button
                                  type='text'
                                  shape='circle'
                                  onClick={onOpenExpandedView}
                                  disabled={
                                    expandedViewHoverActionDisabledState
                                  }
                                  icon={
                                    <motion.span
                                      exit={{ opacity: 0, y: 10 }}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 0.7, y: 0 }}
                                      transition={{ delay: 0.1 }}
                                      whileHover={{
                                        scale: 1.2,
                                        opacity: 1
                                      }}
                                      className='anticon table-cell-hover-actions-icon'
                                    >
                                      <i
                                        className='ri-eye-2-line'
                                        style={{ fontSize: 16 }}
                                      />
                                    </motion.span>
                                  }
                                />
                              </Tooltip>
                            </Padding>
                          )}

                          {enableEditHoverAction && (
                            <Padding right={!!cellMenu ? 5 : 0}>
                              <Tooltip placement='top' title={'Edit'}>
                                <Button
                                  type='text'
                                  shape='circle'
                                  disabled={editHoverActionDisabledState}
                                  onClick={() => {
                                    if (
                                      typeof hoverActions?.onEdit === 'function'
                                    ) {
                                      const onEdit = hoverActions.onEdit
                                      onEdit(source)
                                    }
                                  }}
                                  icon={
                                    <motion.span
                                      exit={{ opacity: 0, y: 10 }}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 0.7, y: 0 }}
                                      transition={{ delay: 0.2 }}
                                      whileHover={{
                                        scale: 1.2,
                                        opacity: 1
                                      }}
                                      className='anticon table-cell-hover-actions-icon'
                                    >
                                      <i
                                        className='ri-edit-line'
                                        style={{ fontSize: 16 }}
                                      />
                                    </motion.span>
                                  }
                                />
                              </Tooltip>
                            </Padding>
                          )}
                          {enableDeleteHoverAction && (
                            <Padding right={5}>
                              <Tooltip placement='top' title='Delete'>
                                <Button
                                  type='text'
                                  shape='circle'
                                  onClick={() =>
                                    showDeleteConfirm(
                                      hoverActions?.onDelete ?? (() => null)
                                    )
                                  }
                                  danger
                                  disabled={deleteHoverActionDisabledState}
                                  icon={
                                    <motion.span
                                      exit={{ opacity: 0, y: 10 }}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 0.7, y: 0 }}
                                      transition={{ delay: 0.3 }}
                                      whileHover={{
                                        scale: 1.2,
                                        opacity: 1
                                      }}
                                      className='anticon table-cell-hover-actions-icon table-cell-hover-actions-icon-delete'
                                    >
                                      <i
                                        className='ri-delete-bin-line'
                                        style={{
                                          fontSize: 16
                                        }}
                                      />
                                    </motion.span>
                                  }
                                />
                              </Tooltip>
                            </Padding>
                          )}
                        </Fragment>
                      )}
                      {revisedCellMenu}
                    </div>
                  </td>
                </motion.tr>

                {enableExpandedViewHoverAction && (
                  <Drawer
                    title={expandedViewTitle}
                    placement={expandedViewPlacement}
                    closable
                    onClose={() => {
                      onClose()
                      if (isFunction(onExpandedViewClose)) {
                        onExpandedViewClose()
                      }
                    }}
                    visible={drawerVisible}
                    key='Table-View-Drawer'
                    width={_expandedViewWidth}
                    footer={expandedViewFooter}
                  >
                    {expandedView && expandedView(source)}
                  </Drawer>
                )}
              </Fragment>
            )
          }}
        </TableBodyContext.Consumer>
      )}
    </ReactTableContext.Consumer>
  )
}

export default TableCell
