import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button } from "antd";
import "./_style.scss";
import Sortable from "./_partials/Sortable";
import { ColumnProps, TableColumnProps } from "../../../types/types";

type ColumnReorderProps = {
  setColumns: React.Dispatch<React.SetStateAction<TableColumnProps>>;
  columns: TableColumnProps;
  maxColumns: number;
  minColumns: number;
  defaultColumns: Array<ColumnProps>;
};
export default (props: ColumnReorderProps) => {
  const { setColumns, columns, maxColumns, minColumns, defaultColumns } = props;

  return (
    <div className={"___table-column-filter"}>
      <div className={"___table-column-filter-header"}>
        <span className={"___table-column-filter-header-text"}>
          Customize Column
        </span>
      </div>
      <PerfectScrollbar>
        <Sortable
          setColumns={setColumns}
          columns={columns}
          maxColumns={maxColumns}
          minColumns={minColumns}
        />
      </PerfectScrollbar>
      <div className={"___table-column-filter-footer"}>
        <Button
          type={"primary"}
          onClick={() => null}
          style={{
            marginRight: 10,
          }}
        >
          Save as preset
        </Button>
        <Button
          type={"dashed"}
          onClick={() => {
            setColumns((prev) => ({
              selected: defaultColumns?.slice?.(0, maxColumns),
              unselected:
                defaultColumns?.length > maxColumns
                  ? defaultColumns?.slice?.(0, defaultColumns.length)
                  : [],
              all: defaultColumns,
            }));
          }}
        >
          Clear all
        </Button>
      </div>
    </div>
  );
};
