import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import DataManagement from "./DataManagement";
import TableControls from "./Controls";
import { TableColumnProps } from "../../types";

type HeaderProps = {
  columns: TableColumnProps,
  dataSource: Array<any>,
};
export default (props: HeaderProps) => {
  const {dataSource, columns} = props;
  const [filterColumn, setFilterColumn] = useState({ visible: false });
  const handleFilterColumnCancel = () => {
    setFilterColumn((prev) => ({ ...prev, visible: false }));
  };

  return <div className={"___table-container-header"}>
    <div className={"___table-container-header-inner-left"}>
      <div className={"___table-filter-radio-sort"}>
        <Tooltip title={"Manage data"}>
          <Button
            icon={<span className={'anticon'}><i className={'ri-database-2-line'} style={{ fontSize: 17 }} /></span>}
            onClick={() => {
              setFilterColumn((prev) => ({ ...prev, visible: true }));
            }}
            type={"primary"}
          >
            Data Management
          </Button>
        </Tooltip>
        <DataManagement
          visible={filterColumn.visible}
          handleCancel={handleFilterColumnCancel}
          columns={columns}
          dataSource={dataSource}
        />
      </div>

      <div className={"___table-filter-btn-container"}>
        <TableControls.ControlActions />
      </div>
    </div>

    <div className={"___table-container-header-inner-right"}>
      <TableControls.ColumnDensity />
      <TableControls.RenderOrder />
    </div>
  </div>
}