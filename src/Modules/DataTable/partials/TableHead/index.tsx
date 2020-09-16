import { Button, Checkbox, Popover, Tooltip } from "antd";
import TableControls from "../TableControls";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { motion } from "framer-motion";
import { TableColumnProps, ColumnProps } from "../../types/types";

type TableHeadProps = {
  columns: TableColumnProps;
  columnKeys: string[];
  checkState: any;
  onCheckAllChange: ((e: any) => void) | undefined;
  setColumns: React.Dispatch<React.SetStateAction<TableColumnProps>>;
  maxColumns: number;
  minColumns: number;
  defaultColumns: ColumnProps[];
};

export default (props: TableHeadProps) => {
  const {
    columns,
    columnKeys,
    checkState,
    onCheckAllChange,
    setColumns,
    maxColumns,
    minColumns,
    defaultColumns,
  } = props;

  return (
    <thead className={"___table-header"}>
      <tr className={"___table-columns"}>
        <th
          className={"___table-column"}
          style={{
            width: "64px",
          }}
        >
          <div className={"___table-header-checkbox-container"}>
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
              className={"___table-column"}
              key={value?.key}
              style={{
                width: `calc(100% / ${columnKeys.length + 2}) - 120px`,
              }}
            >
              <div className={"___table-column-container"}>
                <div className={"___table-column-title"}>{value?.title}</div>
              </div>
            </motion.th>
          );
        })}
        <th
          className={"___table-column selectable-columns"}
          style={{
            width: 64,
          }}
        >
          <div className={"___table-selectable-columns-child-container"}>
            <Popover
              placement="bottomRight"
              content={() => (
                <TableControls.ColumnReorder
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
              <Tooltip title={"Customize columns"} placement={"left"}>
                <Button type="dashed" shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </Popover>
          </div>
        </th>
      </tr>
    </thead>
  );
};
