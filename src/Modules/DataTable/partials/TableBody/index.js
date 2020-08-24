import { DatePicker, Input, Button, Tooltip } from 'antd';
import { find } from 'lodash';
import TableCell from '../TableCell';
import React from 'react';
import {DeleteOutlined} from '@ant-design/icons';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
export default ({
  columns,
  columnKeys,
  dataSource,
  checkState,
  onCheckedChange,
  onExpandColumnClick,
  maxColumns,
  minColumns,
}) => {
  return (
    <tbody className={'vmw-table-body'}>
      {dataSource.map(source => {
        const checked =
          find(checkState?.checkedList, ['key', source?.key]) !== undefined;
        return (
          <TableCell
            columns={columns.selected}
            checked={checked}
            onCheckedChange={onCheckedChange}
            onExpandColumnClick={onExpandColumnClick}
            checkState={checkState}
            columnKeys={columnKeys}
            extraColumnsLength={1}
            source={source}
            key={`table_cell_${source?.key}`}
            maxColumns={maxColumns}
            minColumns={minColumns}
            TableExpandedView={() => <p>{text}</p>}
          />
        );
      })}
    </tbody>
  );
};
