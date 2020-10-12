/* eslint-disable no-unused-vars */
import React, { useRef, useState, Fragment } from 'react'
import { Checkbox, Drawer, Button, Tooltip } from 'antd'
import { motion } from 'framer-motion'
import presentationHOC from './utils/presentationHOC'
import Presentation from './utils/Presentation'
import { ReactTableContext } from '../../../ReactTableContext'
import { TableBodyContext } from '../TableBody/utils/TableBodyContext'
import Padding from '../../../../../Padding'
import { find, isBoolean, first, last } from 'lodash'
import './styles.scss'

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
  const showDrawer = () => {
    setDrawerVisible(true)
  }
  const onClose = () => {
    setDrawerVisible(false)
  }

  // @ts-ignore

  return (
    <ReactTableContext.Consumer>
      {({ onSelectedItemChange, selectedTableItems, columnKeys, columns }) => (
        <TableBodyContext.Consumer>
          {({
            expandedView = null,
            allowCellSelect,
            cellMenu,
            hoverActions,
            enableHoverActions
          }) => {
            const cellSelected =
              find(selectedTableItems?.itemList, ['key', source?.key]) !==
              undefined
            const cellMenuCallback = (child: React.ReactElement<any>) => {
              if (React.isValidElement(child)) {
                // Adds showDrawer as a property for cellmenu to enable showing of drawer.
                return React.cloneElement(child as React.ReactElement<any>, {
                  showDrawer,
                  source
                })
              }
              return null
            }
            const revisedCellMenu = React.Children.map(
              cellMenu,
              cellMenuCallback
            )
            const enableExpandedViewHoverAction =
              (Array.isArray(enableHoverActions) &&
                first(enableHoverActions)) ||
              (isBoolean(enableHoverActions) && enableHoverActions)

            const enableEditHoverAction =
              (Array.isArray(enableHoverActions) &&
                enableHoverActions.length === 2 &&
                last(enableHoverActions)) ||
              (isBoolean(enableHoverActions) && enableHoverActions)

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
                  key={source?.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: 'spring',
                    delay: (index || 1) * 0.03,
                    stiffness: 100,
                    damping: 13
                  }}
                >
                  {allowCellSelect && (
                    <td className='ReactTable___table-body-cell table-body-cell-fixed-left'>
                      <div className='ReactTable___table-body-cell-checkbox-container'>
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

                  {columnKeys.map((value, cellIndex) => {
                    const retrieved = columns.all.find((c) => c?.key === value)
                    // const retrievedIsAnObject = isObject(retrieved);
                    const presentationType = retrieved?.presentationType
                    const presentationColor = retrieved?.presentationColor
                    /** Value is mapped to the key of the column */
                    const data = source[value]

                    return presentationHOC({
                      extraColumnsLength,
                      columnKeys,
                      key: `presentation__${
                        source?.key || index
                      }__of__column_${cellIndex}`,
                      cellIndex
                    })(
                      <Presentation
                        data={data}
                        presentationColor={presentationColor}
                        presentationType={presentationType}
                        actionCallback={retrieved?.actionCallback}
                        actionPresentationType={
                          retrieved?.actionPresentationType
                        }
                        columnType={retrieved?.type}
                        bold={retrieved?.bold}
                        actionTitle={retrieved?.actionTitle}
                        source={source}
                        dateFormat={retrieved?.dateFormat}
                        currency={retrieved?.currency}
                      />
                    )
                  })}

                  <td className='ReactTable___table-body-cell table-body-cell-fixed-right'>
                    <div className='ReactTable___table-utility'>
                      {showHoverActions && (
                        <Fragment>
                          {enableExpandedViewHoverAction && (
                            <Padding right={10}>
                              <Tooltip placement='top' title='Quick view'>
                                <Button
                                  type='text'
                                  shape='circle'
                                  onClick={showDrawer}
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
                            <Padding right={10}>
                              <Tooltip placement='top' title={'Edit'}>
                                <Button
                                  type='text'
                                  shape='circle'
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
                                      transition={{ delay: 0.1 }}
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
                        </Fragment>
                      )}
                      {revisedCellMenu}
                    </div>
                  </td>
                </motion.tr>

                {enableExpandedViewHoverAction && (
                  <Drawer
                    title={'Expanded View'}
                    placement='left'
                    closable
                    onClose={onClose}
                    visible={drawerVisible}
                    key='Table-View-Drawer'
                    width='45%'
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
