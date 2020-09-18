import { Button, Dropdown, Menu, Tooltip } from 'antd'
import { motion } from 'framer-motion'
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { TableColumnControls, ColumnMenuItems } from '../../../../../types'
import './_styles.scss'
import { isEmpty, isFunction } from 'lodash'

type CellMenuProps = {
  showDrawer:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined
  controls: TableColumnControls
  columnMenuItems: ColumnMenuItems | undefined
  source: any
}

export default (props: CellMenuProps) => {
  const { showDrawer, controls, columnMenuItems, source } = props
  const menu = (
    <Menu
      style={{
        border: 0,
        background: 'var(--background-secondary)'
      }}
    >
      <Menu className='CellMenu__menu'>
        <Menu.Item key='expand'>
          <motion.div
            initial={{ color: 'var(--text-color)', cursor: 'pointer' }}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.85 }}
            onClick={showDrawer}
          >
            <Tooltip title='Expand column'>
              <span className='anticon'>
                <i
                  className='ri-fullscreen-line'
                  style={{ fontSize: 16, cursor: 'pointer' }}
                />
              </span>
            </Tooltip>
          </motion.div>
        </Menu.Item>
        <Menu.Item key='filter'>
          <motion.div
            initial={{ color: 'var(--text-color)', cursor: 'pointer' }}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.85 }}
            onClick={() =>
              controls?.edit && isFunction(controls?.edit)
                ? controls.edit(source)
                : null
            }
          >
            <Tooltip title='Edit'>
              <span className='anticon'>
                <i
                  className='ri-edit-line'
                  style={{ fontSize: 16, cursor: 'pointer' }}
                />
              </span>
            </Tooltip>
          </motion.div>
        </Menu.Item>
        <Menu.Item key='edit'>
          <motion.div
            initial={{ color: 'var(--text-color)', cursor: 'pointer' }}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.85 }}
            onClick={() =>
              controls?.duplicate && isFunction(controls?.duplicate)
                ? controls.duplicate(source)
                : null
            }
          >
            <Tooltip title='Duplicate'>
              <span className='anticon'>
                <i
                  className='ri-file-copy-line'
                  style={{ fontSize: 16, cursor: 'pointer' }}
                />
              </span>
            </Tooltip>
          </motion.div>
        </Menu.Item>
        <Menu.Item key='delete'>
          <motion.div
            initial={{ color: 'var(--text-color)', cursor: 'pointer' }}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.85 }}
            onClick={() =>
              controls?.delete && isFunction(controls?.delete)
                ? controls.delete(source?.key || null)
                : null
            }
          >
            <Tooltip title='Delete'>
              <span className='anticon'>
                <i
                  className='ri-delete-bin-line'
                  style={{ fontSize: 16, cursor: 'pointer', color: '#ed5e68' }}
                />
              </span>
            </Tooltip>
          </motion.div>
        </Menu.Item>
      </Menu>
      {!isEmpty(columnMenuItems) && (
        <Menu
          style={{
            border: 0,
            background: 'var(--background-secondary)'
          }}
          onSelect={({ key }) => {
            const item = (columnMenuItems || [])[Number(key)]
            if (item?.onClick && isFunction(item?.onClick)) {
              item.onClick(item)
            }
          }}
        >
          <Menu.Divider />

          {(columnMenuItems || []).map(({ title, icon }, index) => {
            return (
              <Menu.Item key={index} icon={icon}>
                {title}
              </Menu.Item>
            )
          })}
        </Menu>
      )}
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Tooltip title='Actions'>
        <motion.div whileHover={{ scale: 1.2 }}>
          <Button
            shape='circle'
            type='text'
            icon={
              <span className='anticon'>
                <i className='ri-more-line' style={{ fontSize: 17 }} />
              </span>
            }
          />
        </motion.div>
      </Tooltip>
    </Dropdown>
  )
}
