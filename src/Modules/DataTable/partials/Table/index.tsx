import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import { TableColumnProps, ColumnProps } from "../../types";

type TableProps = {
  columnKeys: string[];
  columns: TableColumnProps;
  setColumns: React.Dispatch<React.SetStateAction<TableColumnProps>>;
  maxColumns: number;
  minColumns: number;
  defaultColumns: Array<ColumnProps>;
  dataSource: Array<any>;
  checkState: {
    checkedList: Array<any>;
    indeterminate: boolean;
    checkAll: boolean;
  };
  onCheckAllChange: (e: any) => void;
  onCheckedChange: (checkedList: Array<any>) => void;
  tablePages: { all: number; currentPage: number };
  setCurrentPage: React.Dispatch<
    React.SetStateAction<{ all: number; currentPage: number }>
  >;
};
export default (props: TableProps) => {
  const {
    columnKeys,
    maxColumns,
    minColumns,
    checkState,
    columns,
    dataSource,
    defaultColumns,
    onCheckAllChange,
    setColumns,
    onCheckedChange,
    tablePages,
    setCurrentPage,
  } = props;
  return (
    <div className={"___table-wrapper"}>
      <table className={"___table"}>
        <TableHead
          columns={columns}
          columnKeys={columnKeys}
          onCheckAllChange={onCheckAllChange}
          setColumns={setColumns}
          checkState={checkState}
          maxColumns={maxColumns}
          minColumns={minColumns}
          defaultColumns={defaultColumns}
        />
        <TableBody
          columns={columns}
          columnKeys={columnKeys}
          checkState={checkState}
          onCheckedChange={onCheckedChange}
          dataSource={dataSource}
        />
      </table>
      {/*<table className={'___table-fixed'}>*/}
      {/*    <TableHead*/}
      {/*        columns={columns}*/}
      {/*        columnKeys={columnKeys}*/}
      {/*        onCheckAllChange={onCheckAllChange}*/}
      {/*        setColumns={setColumns}*/}
      {/*        checkState={checkState}*/}
      {/*        maxColumns={maxColumns}*/}
      {/*        minColumns={minColumns}*/}
      {/*        defaultColumns={defaultColumns}*/}
      {/*    />*/}
      {/*    <tbody/>*/}
      {/*</table>*/}
      <TableFooter
        currentPage={tablePages.currentPage}
        setCurrentPage={setCurrentPage}
        total={tablePages.all}
      />
    </div>
  );
};
