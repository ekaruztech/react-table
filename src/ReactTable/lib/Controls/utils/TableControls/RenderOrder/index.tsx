import React, { useState } from 'react'
import { Button, Divider, InputNumber, Select, Tooltip } from 'antd'
import { isFunction } from 'lodash'
import './_styles.scss'
import Align from '../../../../../../Align'
// eslint-disable-next-line no-unused-vars
import Model from '../../../../../../_utils/model'
import { motion } from 'framer-motion'

interface RenderOrderProps {
  onRenderOrderChange: (renderOrder: number) => void
  model: Model
}
type Item = { label: string; value: number; type: 'default' | 'custom' }
const RenderOrder: React.FC<RenderOrderProps> = (props) => {
  const { onRenderOrderChange, model } = props

  const [renderOrder, setRenderOrder] = useState(model.renderOrder.selected)

  const [items, setItems] = useState(model.renderOrder.items)

  const [inputValue, setInputValue] = useState<number | undefined>(undefined)

  const handleCustomize = () => {
    const findExisting = items.find((o: Item) => o.value === inputValue)
    if (!findExisting && inputValue) {
      // @ts-ignore
      setItems((prev: Item[]) => {
        const newData = [
          ...prev,
          {
            label: `${inputValue} per page`,
            value: inputValue,
            type: 'custom'
          }
        ].sort((a, b) => (b.value > a.value ? -1 : 1))

        // Persist data
        model.store('renderOrder', {
          items: newData
        })

        return newData
      })
    }
    setInputValue(0)
  }

  const onChange = (value: number) => {
    if (isFunction(onRenderOrderChange)) {
      onRenderOrderChange(value)
    }
    // Persist data
    model.store('renderOrder', { selected: value })
    setRenderOrder(value)
  }

  const removeCustomItem = (item: Item) => {
    setItems((prev: Item[]) => {
      const newData = prev.filter(
        (prevItem: Item) => prevItem.value !== item.value
      )
      // Persist data
      model.store('renderOrder', {
        items: newData
      })

      if (item.value === model.renderOrder.selected) {
        onChange(15)
      }
      return newData
    })
  }

  const RenderOption: React.FC<{
    item: Item
    type: 'default' | 'custom'
    removeCustomItem: (item: Item) => void
  }> = (props) => {
    const { item, type } = props
    const [hovered, setHovered] = useState(false)
    const onClose = (event: React.MouseEvent<HTMLSpanElement>) => {
      // Prevent event from bubbling up to parent
      event.stopPropagation()
      removeCustomItem(item)
    }
    return (
      <motion.span
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <Align alignCenter justifyBetween>
          <span>{item.label}</span>
          {type === 'custom' && hovered && (
            <Tooltip title='Remove'>
              <span className='anticon' onClick={onClose}>
                <i className='ri-close-line' />
              </span>
            </Tooltip>
          )}
        </Align>
      </motion.span>
    )
  }

  return (
    <div className='RenderOrder'>
      <Button
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          zIndex: 2
        }}
        type='primary'
      >
        Showing
      </Button>
      <Select
        className='RenderOrder__select'
        placeholder='Customize data listing'
        defaultValue={15}
        value={renderOrder}
        onChange={onChange}
        dropdownRender={(menu) => {
          return (
            <div>
              <div className='ReactTable___data-sort-order-header'>
                <p>Number of data</p>
              </div>
              {menu}

              <Divider style={{ margin: '4px 0' }} />
              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                <InputNumber
                  min={10}
                  max={500}
                  step={5}
                  style={{ flex: 'auto' }}
                  placeholder='Data per page'
                  value={inputValue}
                  onChange={(value) => setInputValue(Number(value))}
                />
              </div>
              <Divider style={{ margin: '4px 0' }} />
              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                <Button
                  type='primary'
                  block
                  icon={
                    <span className='anticon'>
                      <i className='ri-add-line' style={{ fontSize: 16 }} />
                    </span>
                  }
                  onClick={handleCustomize}
                >
                  Customize
                </Button>
              </div>
            </div>
          )
        }}
      >
        {items.map((item: Item) => {
          const type = item.type
          return (
            <Select.Option
              value={item.value}
              key={`render-items-${item.label}`}
            >
              <RenderOption
                type={type}
                item={item}
                removeCustomItem={removeCustomItem}
              />
            </Select.Option>
          )
        })}
      </Select>
    </div>
  )
}

export default RenderOrder
