import React from 'react'
import { Button, Tooltip } from 'antd'
import Margin from '../../../../../../Margin'
import { isFunction } from 'lodash'

type TableRefreshProps = {
  onRefresh?: () => void
}
const TableRefresh: React.FC<TableRefreshProps> = (props) => {
  const { onRefresh } = props
  return onRefresh ? (
    <Margin right={20}>
      <Tooltip title='Refresh'>
        <Button
          type='primary'
          onClick={() => (isFunction(onRefresh) ? onRefresh() : null)}
          icon={
            <span
              style={{
                transformOrigin: 'center'
              }}
              className='anticon'
            >
              <i className='ri-refresh-line' />
            </span>
          }
        >
          Refresh
        </Button>
      </Tooltip>
    </Margin>
  ) : null
}

export default TableRefresh
