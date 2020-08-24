import { Button, Checkbox, Popover, Tooltip } from 'antd';
import ColumnFilter from '../ColumnFilter';
import {PlusOutlined} from '@ant-design/icons'
import React from 'react';
import {motion} from "framer-motion";

export default ({
  columns,
  columnKeys,
  checkState,
  onCheckAllChange,
  setColumns,
  maxColumns,
  minColumns,
  defaultColumns,
}) => {
  return (
    <thead className={'vmw-table-header'}>
      <tr className={'vmw-table-columns'}>
        <th
          className={'vmw-table-column'}
          style={{
            width: '64px',
          }}
        >
          <div className={'vmw-table-header-checkbox-container'}>
            <Checkbox
              indeterminate={checkState.indeterminate}
              onChange={onCheckAllChange}
              checked={checkState.checkAll}
            />
          </div>
        </th>
        {columns.selected.map((value, index) => {
          return (
            <motion.th
                layout
              className={'vmw-table-column'}
              key={value?.key}
              style={{
                width: `calc(100% / ${columnKeys.length + 2}) - 120px`,
              }}
            >
              <div className={'vmw-table-column-container'}>
                <div className={'vmw-table-column-title'}>{value?.title}</div>
              </div>
            </motion.th>
          );
        })}
        <th
          className={'vmw-table-column selectable-columns'}
          style={{
            width: 64,
          }}
        >
          <div className={'vmw-table-selectable-columns-child-container'}>
            <Popover
              placement="bottomRight"
              content={() => (
                <ColumnFilter
                  columns={columns}
                  setColumns={setColumns}
                  maxColumns={maxColumns}
                  minColumns={minColumns}
                  defaultColumns={defaultColumns}
                />
              )}
              trigger="click"
              style={{ borderRadius: 10 }}
            >
              <Tooltip title={'Customize columns'} placement={'left'}>
                <Button
                  type="dashed"
                  shape="circle"
                  icon={<PlusOutlined />}
                />
              </Tooltip>
            </Popover>
          </div>
        </th>
      </tr>
    </thead>
  );
};
