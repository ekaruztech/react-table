import React, { useState } from 'react'
import { Button, Divider, InputNumber, Select } from 'antd'
import { isFunction } from 'lodash'
import './_styles.scss'

interface IRenderOrder {
  renderOrder: number
  setRenderOrder: (renderOrder: number) => void
}
const RenderOrder: React.FC<IRenderOrder> = (props) => {
  const { renderOrder, setRenderOrder } = props

  const [items, setItems] = useState([
    { label: `15 per page`, value: 15 },
    {
      label: '30 per page',
      value: 30
    },
    { label: '50 per page', value: 50 },
    { label: '100 per page', value: 100 }
  ])
  const [inputValue, setInputValue] = useState<number | undefined>(undefined)
  const handleCustomize = () => {
    const findExisting = items.find((o) => o.value === inputValue)
    if (!findExisting && inputValue) {
      setItems((prev) => [
        ...prev,
        { label: `${inputValue} per page`, value: inputValue }
      ])
    }
    setInputValue(0)
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
        options={items}
        value={renderOrder}
        onChange={(value) =>
          isFunction(setRenderOrder) ? setRenderOrder(value) : null
        }
        dropdownRender={(menu) => (
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
        )}
      />
    </div>
  )
}

export default RenderOrder
