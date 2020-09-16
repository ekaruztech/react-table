import React, {useEffect, useMemo, useState} from "react";
import "./styles.scss";
import { SettingOutlined } from "@ant-design/icons";
import moment from "moment";
import { Button, Tooltip } from "antd";
import TableHead from "./partials/TableHead";
import TableBody from "./partials/TableBody";
import TableFooter from "./partials/TableFooter";

import { clamp } from "lodash";
import DataManagement from "./partials/DataManagement";
import TableControls from "./partials/TableControls";
import {ColumnProps} from "./types/types";


interface DataTableProps {
  columns: ColumnProps[],
  dataSource: Array<any>,
  minColumns?: number,
  maxColumns?: number
}
const DataTable = (props: DataTableProps) => {
  const {
    columns: defaultColumns,
    dataSource,
    minColumns: defaultMinCol,
    maxColumns: defaultMaxCol,
  } = props;
  const minColumns = clamp(defaultMinCol || 3, 3, 6);
  const maxColumns = clamp(defaultMaxCol || 3, minColumns, 6);

  const [columns, setColumns] = useState({
    all: defaultColumns || [],
    selected: defaultColumns?.slice?.(0, maxColumns) || [],
    unselected:
      defaultColumns?.length > maxColumns
        ? defaultColumns?.slice?.(maxColumns, defaultColumns.length)
        : [],
  });
  const [filterColumn, setFilterColumn] = useState({ visible: false });
  const [checkState, setCheckedState] = useState({
    checkedList: [],
    indeterminate: true,
    checkAll: false,
  });
  const [tablePages, setCurrentPage] = useState({
    all: dataSource.length,
    currentPage: 2,
  });
  const onCheckedChange = (checkedList: any) => {
    setCheckedState({
      checkedList,
      indeterminate:
        checkedList.length > 0 && checkedList.length !== dataSource.length,
      checkAll: checkedList.length === dataSource.length,
    });
  };
  //TODO: Find an optional way to get the total width of the table to enable responsiveness on screens.
  const onCheckAllChange = (e: any) => {

    setCheckedState({
      // @ts-ignore
      checkedList: e.target.checked ? dataSource : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };
  const handleFilterColumnCancel = () => {
    setFilterColumn((prev) => ({ ...prev, visible: false }));
  };
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const wrapper = document.querySelector(".___table-wrapper");
  //     const fixed = document.querySelector(".___table-fixed");
  //     const spaceFromTop = wrapper?.getBoundingClientRect?.()?.top;
  //     console.log({ spaceFromTop });
  //     if (spaceFromTop <= 120 && fixed) {
  //       fixed.style.display = "table";
  //       fixed.style.top = "215px";
  //       fixed.style.position = "fixed";
  //     } else {
  //       if (fixed) {
  //         fixed.style.display = "none";
  //       }
  //     }
  //   };
  //   const App = document.querySelector(".App");
  //   if (App) {
  //     App.addEventListener("scroll", handleScroll);
  //   }
  //   return () => {
  //     if (App) {
  //       App.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, []);
  //
  // useEffect(() => {
  //   const handleOnload = () => {
  //     const fixedTable = document.querySelector(".___table-fixed");
  //     const container = document.querySelector(".___table-container");
  //     if (fixedTable) {
  //       fixedTable.style.width = `${
  //         container?.offsetWidth ? `${container?.offsetWidth}px` : "100%"
  //       }`;
  //       fixedTable.style.display = `none`;
  //     }
  //   };
  //   window.addEventListener("DOMContentLoaded", handleOnload);
  //   return () => window.removeEventListener("DOMContentLoaded", handleOnload);
  // }, []);

  const columnKeys = useMemo(() => columns.selected.map((value) => value?.key), [columns.selected]);

  return (
    <div className={"___table-container"}>
      <div className={"___table-sort"}>
        <div className={"___table-sort-inner-left"}>
          <div className={"___table-filter-radio-sort"}>
            <Tooltip title={"Manage data"}>
              <Button
                icon={<SettingOutlined style={{ fontSize: 17 }} />}
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

        <div className={"___table-sort-inner-right"}>
          <TableControls.ColumnDensity />
          <TableControls.RenderOrder />
        </div>
      </div>
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
    </div>
  );
};

DataTable.defaultProps = {
  dataSource: [
    {
      key: "1",
      name: "Mike Boris",
      age: 32,
      address: "10 Downing Street",
      hobby: "hunting",

      food_type: "Vegan",
      id: "#9iopp785der0011",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "2",
      name: "John Smith",
      age: 62,
      address: "30 Downing Avenue",
      hobby: "hunting",

      food_type: "Meaty",
      id: "#990uiopcfe11",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "3",
      name: "Elia Jones",
      age: 22,
      address: "40 Floor Street",
      hobby: "baking",
      food_type: "Vegan",
      id: "#99vvgty88031",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "5",
      name: "Nathan Philips",
      age: 30,
      address: "4 14th Avenue",
      hobby: "Biking",
      food_type: "Vegan",
      id: "#9x70tyu31",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "6",
      name: "John McCally",
      age: 27,
      address: "45 Boston Avenue",
      hobby: "Gymnastics",
      food_type: "Vegan",
      id: "#99bg831",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "9",
      name: "Masi klones",
      age: 42,
      address: "1 Main Street",
      hobby: "teaching",
      food_type: "Vegan",
      id: "#90bgg431",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "8",
      name: "Joseph Xi Lee",
      age: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#999nhh31",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "10",
      name: "Mikel Leeland",
      age: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#99@6770111",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "11",
      name: "Hanna Klose",
      age: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "12",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "13",
      name: "Hanna Um",
      age: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#4599r931",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "14",
      name: "Josh Butland",
      age: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#9s99vbb31",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "15",
      name: "Gideon Morning",
      age: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#9vb993f1",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "16",
      name: "James Levi",
      age: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#99f931",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "17",
      name: "Priah Singh",
      age: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#9d99g31",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "18",
      name: "Johanna Lee",
      age: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#99d931",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "19",
      name: "Emerald Lalong",
      age: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#99h931",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "20",
      name: "Lulu Oyetola",
      age: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan ",
      id: "#99v931",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "21",
      name: "Matthew Lee",
      age: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#9993100",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
    {
      key: "22",
      name: "Gretchen Spears",
      age: 6,
      address: "40 Houstin Street",
      hobby: "Running",

      food_type: "Vegan",
      id: "#9vbb99u31",
      id2: "World",
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28),
      ]).format("lll"),
      id5: "World",
      id6: "Hello",
      id10: "Finally",
    },
  ],
  columns: [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      type: "text",
      autoComplete: true,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      type: "date",
      presentationType: "date",
      presentationColor: "magenta",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      type: "number",
    },
    {
      title: "Hobby",
      dataIndex: "hobby",
      key: "hobby",
      type: "list",
      presentationType: "tag",
      multiple: true,
      listMenu: [
        { label: "Swimming", value: "swimming" },
        { label: "Skipping", value: "skipping" },
        { label: "Skiing", value: "skiing" },
        { label: "Gaming", value: "gaming" },
        { label: "Movies", value: "movies" },
      ],
    },
    {
      title: "Food type",
      dataIndex: "food_type",
      key: "food_type",
      type: "boolean",
    },
    {
      title: "ID-1",
      dataIndex: "id",
      key: "id",
      type: "text",
      autoComplete: true,
    },

    {
      title: "ID-2",
      dataIndex: "id",
      key: "id2",
      type: "text",
    },
    {
      title: "ID-5",
      dataIndex: "id",
      key: "id5",
      type: "text",
    },
    {
      title: "ID-6",
      dataIndex: "id",
      key: "id6",
      type: "text",
    },
    {
      title: "ID-10",
      dataIndex: "id",
      key: "id10",
      type: "text",
    },
  ],
  maxColumns: 8,
  minColumns: 4,
};

export default DataTable;
