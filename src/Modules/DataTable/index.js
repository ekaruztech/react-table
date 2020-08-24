import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import {
  FilterOutlined,
  ReloadOutlined,
  PlusOutlined,
  TableOutlined,
  DownloadOutlined,
  CloseCircleFilled,
  SettingOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  AlignCenterOutlined,
  AlignLeftOutlined,
} from "@ant-design/icons";
import moment from "moment";
import {
  Menu,
  Select,
  Button,
  Modal,
  Tooltip,
  Input,
  DatePicker,
  Divider,
  Dropdown,
  InputNumber,
  Radio,
  Tabs,
  Checkbox,
} from "antd";
import TableHead from "./partials/TableHead";
import TableBody from "./partials/TableBody";
import TableFooter from "./partials/TableFooter";
import ColumnFilter from "./partials/ColumnFilter";
import { capitalize, clamp, last, filter, isEmpty, map, find } from "lodash";
import PerfectScrollbar from "react-perfect-scrollbar";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator

// a little function to help us with reordering the result

const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const propTypes = {
  isFetchingResource: PropTypes.bool,
  isAddingResource: PropTypes.bool,
  resources: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  isFetchingResource: false,
  isAddingResource: false,
  resources: [],
};

export const useDimension = () => {
  const [dimension, setDimension] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    const handleDimensionChange = () => {
      setDimension({ height: window.innerHeight, width: window.innerWidth });
    };
    window.addEventListener("resize", handleDimensionChange);

    return () => window.removeEventListener("resize", handleDimensionChange);
  }, []);

  return dimension;
};
const PagesContentMenu = ({ itemsLength, setPageLength }) => (
  <Select
    defaultValue="all"
    style={{ width: 150 }}
    onChange={(e) => console.log(e)}
  >
    <Option value="all">Showing All</Option>
    <Option value="15">15 per page</Option>
    <Option value="30">30 per page</Option>
    <Option value="45">45 per page</Option>
    <Option value="60">60 per page</Option>
  </Select>
);
const PageRenderOrder = ({
  setPageSortOrder = (value) => console.log(value),
  pageSortOrder = "descending",
}) => {
  const [items, setItems] = useState([
    { label: `15 per page`, value: 15 },
    {
      label: "30 per page",
      value: 30,
    },
    { label: "50 per page", value: 50 },
    { label: "100 per page", value: 100 },
  ]);
  const [inputValue, setInputValue] = useState("");
  const handleCustomize = () => {
    setItems((prev) => [
      ...prev,
      { label: `${inputValue} per page`, value: parseInt(inputValue, 10) },
    ]);
    setInputValue("");
  };
  return (
    <>
      <Button
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          zIndex: 2,
        }}
        type={"primary"}
      >
        Showing
      </Button>
      <Select
        style={{
          width: 200,
          marginLeft: -3,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        placeholder="Customize data listing"
        defaultValue={"15 per page"}
        options={items}
        dropdownRender={(menu) => (
          <div>
            <div className={"vmw-data-sort-order-header"}>
              <p>Number of data</p>
            </div>
            {menu}
            <Divider style={{ margin: "4px 0" }} />
            <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
              <InputNumber
                min={10}
                max={500}
                defaultValue={15}
                step={5}
                style={{ flex: "auto" }}
                // value={}
                placeholder={"Data per page"}
                value={inputValue}
                onChange={(value) => setInputValue(`${value}`)}
              />
            </div>
            <Divider style={{ margin: "4px 0" }} />
            <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
              <Button
                type={"primary"}
                block
                icon={<PlusOutlined />}
                onClick={handleCustomize}
              >
                Customize
              </Button>
            </div>
          </div>
        )}
      ></Select>
    </>
  );
};

const TableDensity = () => {
  const [value, setValue] = useState("default");
  return (
    <div style={{ marginRight: 20 }}>
      <Radio.Group
        value={value}
        onChange={(e) => setValue(e.target.value)}
        optionType="button"
        buttonStyle="solid"
      >
        <Radio.Button value="small">
          <AlignCenterOutlined />
        </Radio.Button>
        <Radio.Button value="default">
          <AlignLeftOutlined />
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

const FilterColumn = ({
  visible,
  handleOk,
  handleCancel,
  columns,
  setColumns,

  maxColumns,
  minColumns,
  defaultColumns,
}) => {
  const filters = [
    { label: "Equals to", value: "equals to" },
    { label: "Begins with", value: "begins with" },
    { label: "Contains", value: "contains" },
    { label: "In between", value: "in between" },
    { label: "Not equals to", value: "not equals to" },
    { label: "Greater than", value: "greater than" },
    { label: "Less than", value: "Less than" },
  ];
  const [numOfFilters, setNumOfFilters] = useState([{ key: 1 }]);
  const dimension = useDimension();

  return (
    <Modal
      visible={visible}
      title={"Data Settings"}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      width={"75%"}
      bodyStyle={{ height: dimension.height * 0.65, padding: 0 }}
      footer={[
        <div
          key={"filter-columns-footer"}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            style={{ marginRight: 10 }}
          >
            Apply filter
          </Button>
          <Button type={"dashed"} key="back" onClick={handleCancel}>
            Cancel
          </Button>
        </div>,
      ]}
    >
      <Tabs
        defaultActiveKey="1"
        centered
        tabBarStyle={{ height: 50 }}
        tabBarGutter={40}
      >
        <TabPane tab="Reorder Columns" key="1">
          {/*<App*/}
          {/*  dimension={dimension}*/}
          {/*  setColumns={setColumns}*/}
          {/*  columns={columns}*/}
          {/*  maxColumns={maxColumns}*/}
          {/*  minColumns={minColumns}*/}
          {/*/>*/}
        </TabPane>
        <TabPane tab="Filter Data" key="2"></TabPane>
        <TabPane tab="Sort data" key="3"></TabPane>
      </Tabs>
    </Modal>
  );
};
const ExportDropDown = () => {
  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        icon={
          <ReloadOutlined
            style={{ color: "var(--accent)", paddingRight: 10 }}
          />
        }
      >
        Refresh
      </Menu.Item>
      <Menu.Item
        key="1"
        icon={
          <FileTextOutlined
            style={{ color: "var(--accent)", paddingRight: 10 }}
          />
        }
      >
        Export as CSV
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={
          <FileExcelOutlined
            style={{ color: "var(--accent)", paddingRight: 10 }}
          />
        }
      >
        Export as Excel
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={
          <FilePdfOutlined
            style={{ color: "var(--accent)", paddingRight: 10 }}
          />
        }
      >
        Export as PDF
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Tooltip title={"Export data"}>
        <Button
          icon={<DownloadOutlined style={{ fontSize: 17 }} />}
          style={{ width: 160 }}
        >
          Export data
        </Button>
      </Tooltip>
    </Dropdown>
  );
};
const RoutePoint = (props) => {
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
  const onCheckedChange = (checkedList) => {
    setCheckedState({
      checkedList,
      indeterminate:
        checkedList.length > 0 && checkedList.length !== dataSource.length,
      checkAll: checkedList.length === dataSource.length,
    });
  };
  //TODO: Find an optional way to get the total width of the table to enable responsiveness on screens.
  const onCheckAllChange = (e) => {
    setCheckedState({
      checkedList: e.target.checked ? dataSource : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = document.querySelector(".vmw-table-wrapper");
      const fixed = document.querySelector(".vmw-table-fixed");
      const spaceFromTop = wrapper?.getBoundingClientRect?.()?.top;
      console.log({ spaceFromTop });
      if (spaceFromTop <= 120 && fixed) {
        fixed.style.display = "table";
        fixed.style.top = "215px";
        fixed.style.position = "fixed";
      } else {
        if (fixed) {
          fixed.style.display = "none";
        }
      }
    };
    const App = document.querySelector(".App");
    if (App) {
      App.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (App) {
        App.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleOnload = () => {
      const fixedTable = document.querySelector(".vmw-table-fixed");
      const container = document.querySelector(".vmw-table-container");
      if (fixedTable) {
        fixedTable.style.width = `${
          container?.offsetWidth ? `${container?.offsetWidth}px` : "100%"
        }`;
        fixedTable.style.display = `none`;
      }
    };
    window.addEventListener("DOMContentLoaded", handleOnload);
    return () => window.removeEventListener("DOMContentLoaded", handleOnload);
  }, []);
  const onExpandColumnClick = (ref) => {
    const nextSibling = ref?.current?.nextElementSibling;
    nextSibling.classList.toggle("vmw-table-collapsible-active");
    nextSibling.classList.toggle("vmw-table-collapsible-inactive");
    const div = nextSibling.querySelector(".vmw-table-collapsible-inner");
    div.classList.toggle("vmw-table-collapsible-active");
    div.classList.toggle("vmw-table-collapsible-inactive");
  };
  const handleFilterColumnClick = () => {
    console.log("clickkkk");
  };

  const handleFilterColumnCancel = () => {
    setFilterColumn((prev) => ({ ...prev, visible: false }));
  };

  const columnKeys = columns.selected.map((value) => value?.key);

  return (
    <div className={"vmw-table-container"}>
      <div className={"vmw-table-sort"}>
        <div className={"vmw-table-sort-inner-left"}>
          <div className={"vmw-table-filter-radio-sort"}>
            <Tooltip title={"Customize data"}>
              <Button
                icon={<SettingOutlined style={{ fontSize: 17 }} />}
                onClick={() => {
                  setFilterColumn((prev) => ({ ...prev, visible: true }));
                }}
                type={"primary"}
              >
                Data settings
              </Button>
            </Tooltip>
            <FilterColumn
              visible={filterColumn.visible}
              handleCancel={handleFilterColumnCancel}
              handleOk={handleFilterColumnClick}
              setColumns={setColumns}
              columns={columns}
              maxColumns={maxColumns}
              minColumns={minColumns}
              defaultColumns={defaultColumns}
            />
          </div>

          <div className={"vmw-table-filter-btn-container"}>
            <ExportDropDown />
          </div>
        </div>

        <div className={"vmw-table-sort-inner-right"}>
          <TableDensity />
          <PageRenderOrder itemsLength={dataSource?.length} />
        </div>
      </div>
      <div className={"vmw-table-wrapper"}>
        <table className={"vmw-table"}>
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
            onCheckAllChange={onCheckAllChange}
            onExpandColumnClick={onExpandColumnClick}
            checkState={checkState}
            onCheckedChange={onCheckedChange}
            dataSource={dataSource}
            minColumns={minColumns}
            maxColumns={maxColumns}
          />
        </table>
        {/*<table className={'vmw-table-fixed'}>*/}
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

RoutePoint.propTypes = propTypes;
RoutePoint.defaultProps = {
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
      name: "Hanna Lee",
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
      name: "Hanna Lee",
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
      name: "Hanna Lee",
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
      name: "Hanna Lee",
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
      name: "Hanna Lee",
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
      name: "Hanna Lee",
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
      name: "Hanna Lee",
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
      name: "Hanna Lee",
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
      name: "Hanna Lee",
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
      name: "Hanna Lee",
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
      name: "Hanna Lee",
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
      name: "Hanna Lee",
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
      name: "Hanna Lee",
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
      type: "text",
    },
    {
      title: "Hobby",
      dataIndex: "hobby",
      key: "hobby",
      type: "text",
      presentationType: "tag",
    },
    {
      title: "Food type",
      dataIndex: "food_type",
      key: "food_type",
      type: "text",
    },
    {
      title: "ID-1",
      dataIndex: "id",
      key: "id",
      type: "text",
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

const dispatchProps = {};

const stateProps = (state) => ({});

export default RoutePoint;
