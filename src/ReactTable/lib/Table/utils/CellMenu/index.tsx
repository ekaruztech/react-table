import { Button, Dropdown, Menu, Tooltip } from 'antd'
import { motion } from 'framer-motion'
import React from 'react'

import './_styles.scss'
import { isFunction, isBoolean, first } from 'lodash'

interface ICellMenu {
  showDrawer?:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined
  source?: any
  onDelete?: (source: any) => void
  onDuplicate?: (source: any) => void
  onEdit?: (source: any) => void
  children: ({ source }: { source: any }) => React.ReactElement
  enabledMenu?:
    | [boolean, boolean, boolean, boolean]
    | [boolean, boolean, boolean]
    | [boolean, boolean]
    | [boolean]
    | boolean
    | ((
        source: any
      ) =>
        | [boolean, boolean, boolean, boolean]
        | [boolean, boolean, boolean]
        | [boolean, boolean]
        | [boolean]
        | boolean)
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
      onEdit,
      enabledMenu = true
    } = this.props

    const showExpandedView = (enabler: typeof enabledMenu) => {
      if (isFunction(enabler)) {
        const enablerRn = enabler(source)
        return (
          (Array.isArray(enablerRn) &&
            enablerRn.length > 0 &&
            first(enablerRn)) ||
          (isBoolean(enabler) && enabler)
        )
      }

      if (Array.isArray(enabler)) {
        return enabler.length > 0 && first(enabler)
      }

      return isBoolean(enabler) && enabler
    }

    const showEdit = (enabler: typeof enabledMenu) => {
      if (isFunction(enabler)) {
        const enablerRn = enabler(source)
        return (
          (Array.isArray(enablerRn) && enablerRn.length > 1 && enablerRn[1]) ||
          (isBoolean(enabler) && enabler)
        )
      }

      if (Array.isArray(enabler)) {
        return enabler.length > 1 && enabler[1]
      }

      return isBoolean(enabler) && enabler
    }

    const showDuplicate = (enabler: typeof enabledMenu) => {
      if (isFunction(enabler)) {
        const enablerRn = enabler(source)
        return (
          (Array.isArray(enablerRn) && enablerRn.length > 2 && enablerRn[2]) ||
          (isBoolean(enabler) && enabler)
        )
      }

      if (Array.isArray(enabler)) {
        return enabler.length > 2 && enabler[2]
      }

      return isBoolean(enabler) && enabler
    }

    const showDelete = (enabler: typeof enabledMenu) => {
      if (isFunction(enabler)) {
        const enablerRn = enabler(source)
        return (
          (Array.isArray(enablerRn) && enablerRn.length > 3 && enablerRn[3]) ||
          (isBoolean(enabler) && enabler)
        )
      }

      if (Array.isArray(enabler)) {
        return enabler.length > 3 && enabler[3]
      }

      return isBoolean(enabler) && enabler
    }

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
              whileHover={
                showExpandedView(enabledMenu)
                  ? {
                      scale: 1.25,
                      opacity: 1
                    }
                  : {}
              }
              whileTap={showExpandedView(enabledMenu) ? { scale: 0.85 } : {}}
            >
              <Tooltip title='Quick view'>
                <Button
                  shape='circle'
                  type='text'
                  disabled={!showExpandedView(enabledMenu)}
                  onClick={showDrawer}
                  icon={
                    <span
                      className='anticon'
                      style={{ background: 'transparent' }}
                    >
                      <i
                        className='ri-eye-2-line'
                        style={{ fontSize: 16, cursor: 'pointer' }}
                      />
                    </span>
                  }
                />
              </Tooltip>
            </motion.div>
          </Menu.Item>
          <Menu.Item key='edit' disabled={!showEdit(enabledMenu)}>
            <motion.div
              initial={{
                opacity: 0.5
              }}
              whileHover={
                showEdit(enabledMenu)
                  ? {
                      scale: 1.25,
                      opacity: 1
                    }
                  : {}
              }
              whileTap={showEdit(enabledMenu) ? { scale: 0.85 } : {}}
            >
              <Tooltip title='Edit'>
                <Button
                  shape='circle'
                  type='text'
                  disabled={!showEdit(enabledMenu)}
                  onClick={() =>
                    onEdit && isFunction(onEdit) ? onEdit(source) : null
                  }
                  icon={
                    <span className='anticon'>
                      <i
                        className='ri-edit-line'
                        style={{ fontSize: 16, cursor: 'pointer' }}
                      />
                    </span>
                  }
                />
              </Tooltip>
            </motion.div>
          </Menu.Item>
          <Menu.Item key='duplicate' disabled={!showDuplicate(enabledMenu)}>
            <motion.div
              initial={{
                color: 'var(--text-color)',
                cursor: 'pointer',
                opacity: 0.5
              }}
              whileHover={
                showDuplicate(enabledMenu)
                  ? {
                      scale: 1.25,
                      opacity: 1
                    }
                  : {}
              }
              whileTap={showDuplicate(enabledMenu) ? { scale: 0.85 } : {}}
            >
              <Tooltip title='Duplicate'>
                <Button
                  disabled={!showDuplicate(enabledMenu)}
                  onClick={() =>
                    onDuplicate && isFunction(onDuplicate)
                      ? onDuplicate(source)
                      : null
                  }
                  shape='circle'
                  type='text'
                  icon={
                    <span className='anticon'>
                      <i
                        className='ri-file-copy-line'
                        style={{ fontSize: 16, cursor: 'pointer' }}
                      />
                    </span>
                  }
                />
              </Tooltip>
            </motion.div>
          </Menu.Item>
          <Menu.Item key='delete' disabled={!showDelete(enabledMenu)}>
            <motion.div
              initial={{ cursor: 'pointer' }}
              whileHover={
                showDelete(enabledMenu)
                  ? {
                      scale: 1.25,
                      opacity: 1
                    }
                  : {}
              }
              whileTap={showDelete(enabledMenu) ? { scale: 0.85 } : {}}
            >
              <Tooltip title='Delete'>
                <Button
                  shape='circle'
                  type='text'
                  onClick={() =>
                    onDelete && isFunction(onDelete)
                      ? onDelete(source?.key || null)
                      : null
                  }
                  disabled={!showDelete(enabledMenu)}
                  icon={
                    <span className='anticon'>
                      <i
                        className='ri-delete-bin-line'
                        style={{
                          fontSize: 16,
                          cursor: 'pointer',
                          ...(showDelete(enabledMenu)
                            ? { color: '#ef3b4f' }
                            : {})
                        }}
                      />
                    </span>
                  }
                />
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
