import { Button, Tooltip, Popconfirm } from 'antd'
import Align from '../../../../../Align'
import Padding from '../../../../../Padding'
import React, { Fragment } from 'react'
// eslint-disable-next-line no-unused-vars
import { OnCellSelect } from '../../../../../types'
import { isEmpty, isFunction } from 'lodash'
import { motion } from 'framer-motion'
import { ReactTableContext } from '../../../ReactTableContext'

interface ICellSelectionHeader {
  onCellSelect?: (selectCount: number) => OnCellSelect
}
const CellSelectionHeader: React.FC<ICellSelectionHeader> = (props) => {
  const { onCellSelect } = props

  // TODO: moved inline styles to css file
  return (
    <ReactTableContext.Consumer>
      {({ selectedTableItems, onSelectedItemChange }) => {
        const controls = onCellSelect?.(selectedTableItems?.itemList?.length)
        return !isEmpty(selectedTableItems.itemList) ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              delay: 0.1,
              damping: 13
            }}
          >
            <Align
              style={{
                width: '100%',
                borderTop: '1px solid var(--border)',
                borderLeft: '1px solid var(--border)',
                borderRight: '1px solid var(--border)',
                background: 'var(--background-primary)',
                height: 60
              }}
              alignCenter
            >
              <Padding
                left={5}
                right={20}
                vertical={10}
                style={{ height: '100%' }}
              >
                <Align alignCenter style={{ height: '100%' }}>
                  <Button
                    type='text'
                    icon={
                      <span className={'anticon'}>
                        <i className={'ri-close-line'} />
                      </span>
                    }
                    onClick={() => onSelectedItemChange([])}
                  >
                    {selectedTableItems?.itemList?.length || 0} selected
                  </Button>

                  {controls?.onPin && isFunction(controls?.onPin) && (
                    <Fragment>
                      <Padding horizontal={10} style={{ height: '100%' }}>
                        <div
                          style={{
                            height: '100%',
                            borderLeft: '1px solid var(--border-color-split)'
                          }}
                        />
                      </Padding>
                      <Tooltip title='Pin selected'>
                        <Button
                          type='text'
                          onClick={() =>
                            controls?.onPin && isFunction(controls?.onPin)
                              ? controls.onPin(selectedTableItems?.itemList)
                              : null
                          }
                          icon={
                            <span className='anticon'>
                              <i className='ri-pushpin-line' />
                            </span>
                          }
                        >
                          Pin
                        </Button>
                      </Tooltip>
                    </Fragment>
                  )}

                  {controls?.onDelete && isFunction(controls?.onDelete) && (
                    <Fragment>
                      <Padding horizontal={10} style={{ height: '100%' }}>
                        <div
                          style={{
                            height: '100%',
                            borderLeft: '1px solid var(--border-color-split)'
                          }}
                        />
                      </Padding>
                      <Popconfirm
                        title='Are you sure you want to delete all selected data?'
                        onConfirm={() =>
                          controls?.onDelete && isFunction(controls?.onDelete)
                            ? controls.onDelete(selectedTableItems?.itemList)
                            : null
                        }
                        okText='Yes'
                        cancelText='No'
                      >
                        <Tooltip title='Delete selected'>
                          <Button
                            danger
                            type='text'
                            icon={
                              <span className='anticon'>
                                <i className='ri-delete-bin-line' />
                              </span>
                            }
                          >
                            Delete
                          </Button>
                        </Tooltip>
                      </Popconfirm>
                    </Fragment>
                  )}
                </Align>
              </Padding>
            </Align>
          </motion.div>
        ) : null
      }}
    </ReactTableContext.Consumer>
  )
}

export default CellSelectionHeader
