import { Button, Tooltip } from 'antd'
import { Align, Padding } from '../../../../../TableUtility'
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { TableColumnControls } from '../../../../types'
import { isEmpty, isFunction } from 'lodash'
import { motion } from 'framer-motion'

type MultipleSelectProps = {
  multipleSelectList: any
  controls: TableColumnControls
}
export default (props: MultipleSelectProps) => {
  const { multipleSelectList, controls } = props
  return !isEmpty(multipleSelectList) ? (
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
          borderTop: '1px solid var(--border-color-split)',
          background: 'var(--background-primary)',
          height: 60
        }}
        alignCenter
      >
        <Padding horizontal={20} vertical={10} style={{ height: '100%' }}>
          <Align alignCenter style={{ height: '100%' }}>
            <Button type='link'>
              <Align alignCenter>
                <span>{multipleSelectList?.length || 0} selected</span>
              </Align>
            </Button>
            <Padding horizontal={10} style={{ height: '100%' }}>
              <div
                style={{
                  height: '100%',
                  borderLeft: '1px solid var(--border-color-split)'
                }}
              />
            </Padding>

            <Tooltip title='Delete selected'>
              <Button
                danger
                type='text'
                onClick={() =>
                  controls?.deleteMultiple &&
                  isFunction(controls?.deleteMultiple)
                    ? controls.deleteMultiple(multipleSelectList)
                    : null
                }
                icon={
                  <span className='anticon'>
                    <i className='ri-delete-bin-line' />
                  </span>
                }
              >
                Delete
              </Button>
            </Tooltip>
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
                  controls?.pin && isFunction(controls?.pin)
                    ? controls.pin(multipleSelectList)
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
          </Align>
        </Padding>
      </Align>
    </motion.div>
  ) : null
}
