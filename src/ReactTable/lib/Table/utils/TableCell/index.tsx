/* eslint-disable no-unused-vars */
import React, { useRef, useState, Fragment } from 'react'
import { Checkbox, Drawer } from 'antd'
import { motion } from 'framer-motion'
import presentationHOC from './utils/presentationHOC'
import Presentation from './utils/Presentation'
import { ReactTableContext } from '../../../ReactTableContext'
import { TableBodyContext } from '../TableBody/utils/TableBodyContext'
import { find } from 'lodash'

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
          {({ expandCell = null, allowCellSelect, cellMenu }) => {
            const cellSelected =
              find(selectedTableItems?.itemList, ['key', source?.key]) !==
              undefined
            const cb = (child: React.ReactElement<any>) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<any>, {
                  showDrawer,
                  source
                })
              }
              return null
            }
            const revisedCellMenu = React.Children.map(cellMenu, cb)
            return (
              <Fragment>
                <motion.tr
                  // layout
                  // @ts-ignore
                  ref={trRef}
                  className={`${
                    cellSelected
                      ? 'ReactTable___table-rows-checked '
                      : 'ReactTable___table-rows'
                  } site-collapse-custom-collapse`}
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
                    <td
                      className='ReactTable___table-row'
                      style={{
                        width: '64px'
                      }}
                    >
                      <div className='ReactTable___table-row-checkbox-container'>
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

                  {columnKeys.map((value, columnIndex) => {
                    const retrieved = columns.all.find((c) => c?.key === value)
                    // const retrievedIsAnObject = isObject(retrieved);
                    const presentationType = retrieved?.presentationType
                    const presentationColor = retrieved?.presentationColor
                    /** Value is mapped to the key of the column */
                    const data = source[value]

                    return presentationHOC({
                      extraColumnsLength,
                      columnKeys,
                      columnType: retrieved?.type,
                      key: `presentation__${
                        source?.key || index
                      }__of__column_${columnIndex}`
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
                  <td
                    style={{
                      width: 64
                    }}
                    className='ReactTable___table-row'
                  >
                    <div className='ReactTable___table-utility'>
                      {revisedCellMenu}
                    </div>
                  </td>
                </motion.tr>

                <Drawer
                  title={'Expanded View'}
                  placement='left'
                  closable
                  onClose={onClose}
                  visible={drawerVisible}
                  key='Table-View-Drawer'
                  width='40%'
                >
                  {expandCell}
                </Drawer>
              </Fragment>
            )
          }}
        </TableBodyContext.Consumer>
      )}
    </ReactTableContext.Consumer>
  )
}

export default TableCell
