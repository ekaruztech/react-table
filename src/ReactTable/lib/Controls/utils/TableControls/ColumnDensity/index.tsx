import React, { useState } from 'react'
import { Radio, Tooltip } from 'antd'

// type ColumnDensityProps = {};
export default () => {
  const [value, setValue] = useState('default')
  return (
    <div style={{ marginRight: 20 }}>
      <Radio.Group
        value={value}
        onChange={(e) => setValue(e.target.value)}
        optionType='button'
        buttonStyle='solid'
      >
        <Radio.Button value='small'>
          <Tooltip title='Dense'>
            <span className='anticon'>
              <i className='ri-align-justify' />
            </span>
          </Tooltip>
        </Radio.Button>
        <Radio.Button value='default'>
          <Tooltip title='Default'>
            <span className='anticon'>
              <i className='ri-menu-line' />
            </span>
          </Tooltip>
        </Radio.Button>
      </Radio.Group>
    </div>
  )
}
