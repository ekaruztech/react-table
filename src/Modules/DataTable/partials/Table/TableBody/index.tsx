import { find } from "lodash";
import TableCell from "../TableCell";
import React from "react";
import { TableColumnProps } from "../../../types";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

type TableBodyProps = {
  columns: TableColumnProps;
  columnKeys: string[];
  dataSource: Array<{}>;
  checkState: any;
  onCheckedChange: Function;
};
export default (props: TableBodyProps) => {
  const {
    columns,
    columnKeys,
    dataSource,
    checkState,
    onCheckedChange,
  } = props;
  return (
    <tbody className={"___table-body"}>
      {dataSource.map((source: any) => {
        const checked =
          find(checkState?.checkedList, ["key", source?.key]) !== undefined;
        return (
          <TableCell
            columns={columns.selected}
            checked={checked}
            onCheckedChange={onCheckedChange}
            checkState={checkState}
            columnKeys={columnKeys}
            extraColumnsLength={1}
            source={source}
            key={`table_cell_${source?.key}`}
            TableExpandedView={() => <p>{text}</p>}
          />
        );
      })}
    </tbody>
  );
};
