import { Button, Dropdown, Menu, Tooltip } from 'antd'
import { motion } from 'framer-motion'
import React from 'react'

import './_styles.scss'
import { isFunction } from 'lodash'

interface ICellMenu {
  showDrawer?:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined
  source?: any
  onDelete: (source: any) => void
  onDuplicate: (source: any) => void
  onEdit: (source: any) => void
  children: ({ source }: { source: any }) => React.ReactElement
}

class CellMenu extends React.Component<ICellMenu> {
  protected static readonly __DO_NOT_MODIFY_REACT_TABLE_COMPONENT_TYPE =
    'REACT_-_TABLE_-_CELL_-_MENU'

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    const {
      showDrawer,
      source,
      children,
      onDelete,
      onDuplicate,
      onEdit
    } = this.props
    const menu = (
      <Menu
        style={{
          border: 0,
          background: 'var(--background-primary)'
        }}
      >
        <Menu className='CellMenu__menu'>
          <Menu.Item key='expand'>
            <motion.div
              initial={{
                color: 'var(--text-color)',
                cursor: 'pointer',
                opacity: 0.5
              }}
              whileHover={{ scale: 1.25, opacity: 1 }}
              whileTap={{ scale: 0.85 }}
              onClick={showDrawer}
            >
              <Tooltip title='Expand column'>
                <span className='anticon' style={{background: 'transparent'}}>
                  <i
                    className='ri-fullscreen-line'
                    style={{ fontSize: 16, cursor: 'pointer' }}
                  />
                </span>
              </Tooltip>
            </motion.div>
          </Menu.Item>
          <Menu.Item key='edit'>
            <motion.div
              initial={{
                color: 'var(--text-color)',
                cursor: 'pointer',
                opacity: 0.5
              }}
              whileHover={{ scale: 1.25, opacity: 1 }}
              whileTap={{ scale: 0.85 }}
              onClick={() =>
                onEdit && isFunction(onEdit) ? onEdit(source) : null
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
          <Menu.Item key='duplicate'>
            <motion.div
              initial={{
                color: 'var(--text-color)',
                cursor: 'pointer',
                opacity: 0.5
              }}
              whileHover={{ scale: 1.25, opacity: 1 }}
              whileTap={{ scale: 0.85 }}
              onClick={() =>
                onDuplicate && isFunction(onDuplicate)
                  ? onDuplicate(source)
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
                onDelete && isFunction(onDelete)
                  ? onDelete(source?.key || null)
                  : null
              }
            >
              <Tooltip title='Delete'>
                <span className='anticon'>
                  <i
                    className='ri-delete-bin-line'
                    style={{
                      fontSize: 16,
                      cursor: 'pointer',
                      color: 'red'
                    }}
                  />
                </span>
              </Tooltip>
            </motion.div>
          </Menu.Item>
        </Menu>

        {children ? children({ source }) : null}
      </Menu>
    )

    return (
      <Dropdown overlay={menu} trigger={['click']} arrow>
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
}

export { CellMenu as default, ICellMenu as CellMenuProps }
