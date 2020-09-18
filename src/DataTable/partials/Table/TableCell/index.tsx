/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import { Checkbox, Drawer } from 'antd'
import { motion } from 'framer-motion'
import CellMenu from './_partials/CellMenu'
import {
  ColumnProps,
  TableColumnControls,
  ColumnMenuItems
} from '../../../types'
import presentationHOC from './_partials/presentationHOC'
import Presentation from './_partials/Presentation'

type TableCellProps = {
  checked: boolean
  /** DataSource item. */
  source: any
  onCheckedChange: Function
  checkState: any
  columnKeys: string[]
  extraColumnsLength: number
  /** columns.selected */
  columns: ColumnProps[]
  index?: number
  controls: TableColumnControls
  columnMenuItems: ColumnMenuItems | undefined
}

// TODO: Update TableCells to allow for more presentation types.
export default (props: TableCellProps) => {
  const {
    checked,
    source,
    onCheckedChange,
    checkState,
    columnKeys,
    extraColumnsLength = 1,
    columns,
    index,
    controls,
    columnMenuItems
  } = props

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
    <React.Fragment>
      <motion.tr
        layout
        // @ts-ignore
        ref={trRef}
        className={`${
          checked ? '___table-rows-checked ' : '___table-rows'
        } site-collapse-custom-collapse`}
        key={source?.key}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        transition={{
          type: 'spring',
          delay: (index || 1) * 0.02,
          stiffness: 100,
          damping: 13
        }}
      >
        <td
          className='___table-row'
          style={{
            width: '64px'
          }}
        >
          <div className='___table-row-checkbox-container'>
            <Checkbox
              key={source?.key}
              onChange={(e) => {
                onCheckedChange(
                  !e.target?.checked
                    ? checkState?.checkedList.filter(
                        (value: any) => value?.key !== source?.key
                      )
                    : checkState?.checkedList.concat(source)
                )
              }}
              checked={checked}
            />
          </div>
        </td>

        {columnKeys.map((value, columnIndex) => {
          const retrieved = columns.find((c) => c?.key === value)
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
              actionPresentationType={retrieved?.actionPresentationType}
              columnType={retrieved?.type}
              bold={retrieved?.bold}
              actionTitle={retrieved?.actionTitle}
              source={source}
              dateFormat={retrieved?.dateFormat}
            />
          )
        })}
        <td
          style={{
            width: 64
          }}
          className='___table-row'
        >
          <div className='___table-utility'>
            <CellMenu
              showDrawer={showDrawer}
              controls={controls}
              columnMenuItems={columnMenuItems}
              source={source}
            />
          </div>
        </td>
      </motion.tr>

      <Drawer
        title={source[columnKeys[0]]}
        placement='left'
        closable
        onClose={onClose}
        visible={drawerVisible}
        key='Table-View-Drawer'
        width='40%'
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </React.Fragment>
  )
}
