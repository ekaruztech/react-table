import React, { useReducer, useState } from "react";
import { useDimension } from "../../hooks";
import { Align, Margin } from "../UtilityComponents";
import { Button, Modal, Popover, Tabs, Tooltip } from "antd";
import {QuestionCircleOutlined, SortAscendingOutlined, PlusOutlined, FilterOutlined} from '@ant-design/icons'
import { initDataManagementState, dataManagementReducer } from "./reducer";
import Search from './Search';
import Filter from './Filter';
import Sort from './Sort';
import {TableColumnProps, TableFilterAction, TableFilterState} from "../../types/types";
import {motion} from 'framer-motion';

const { TabPane } = Tabs;

type DataManagementProps = {
  visible: boolean;
  handleCancel:  ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  columns: TableColumnProps;
  dataSource: any;
}

type ModalFooterProps = {
    activeTab: string;
    dispatch: React.Dispatch<TableFilterAction>;
    state: TableFilterState
}

export default (props: DataManagementProps) => {
  const { visible, handleCancel, columns, dataSource } = props;
  const [activeTab, setActiveTab] = useState("filter");

  const [state, dispatch] = useReducer<React.Reducer<TableFilterState, TableFilterAction>>(
    dataManagementReducer,
    // @ts-ignore
    columns.selected,
    initDataManagementState
  );
  console.log(state);
  const dimension = useDimension();

  const ModalFooter = (props: ModalFooterProps) => {
    const { activeTab, dispatch, state } = props;
    if (activeTab === "search") {
      return (
        <Align style={{ width: "100%" }} alignCenter justifyBetween>
          <Popover
            style={{ width: 240 }}
            title={
              <strong style={{ color: "var(--text-color)" }}>
                Using the search
              </strong>
            }
            content={
              <p
                style={{
                  width: 240,
                  fontSize: 13,
                  color: "var(--text-color)",
                }}
              >
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </p>
            }
            trigger="click"
          >
            <Tooltip title={"Help"}>
              <Button type={"link"}>
                <QuestionCircleOutlined style={{ fontSize: 20 }} />
              </Button>
            </Tooltip>
          </Popover>
          <Button>Clear search</Button>
        </Align>
      );
    }
    if (activeTab === "filter") {
      const addFilter = () => {
        dispatch({
          type: "ADD_FILTER",
          payload: {
            filterProps: {
              property: null,
              type: null,
              value: null,
            },
          },
        });
      };
      const applyFilter = () => {
        console.log(state?.filters);
      };
      return (
        <Align style={{ width: "100%" }} alignCenter justifyBetween>
          <Align alignCenter>
            <Popover
              style={{ width: 240 }}
              title={
                <strong style={{ color: "var(--text-color)" }}>
                  Using the filter
                </strong>
              }
              content={
                <p
                  style={{
                    width: 240,
                    fontSize: 13,
                    color: "var(--text-color)",
                  }}
                >
                  We supply a series of design principles, practical patterns
                  and high quality design resources (Sketch and Axure), to help
                  people create their product prototypes beautifully and
                  efficiently.
                </p>
              }
              trigger="click"
            >
              <Tooltip title={"Help"}>
                <Button type={"link"}>
                  <QuestionCircleOutlined style={{ fontSize: 20 }} />
                </Button>
              </Tooltip>
            </Popover>
            <Margin left={20}>
              <Button
                type={"primary"}
                icon={<PlusOutlined />}
                onClick={addFilter}
              >
                Add Filter
              </Button>
            </Margin>
          </Align>
          <Align>
            {" "}
            <Button>Clear filter</Button>
            <Margin left={20}>
              <Button
                icon={<FilterOutlined />}
                onClick={applyFilter}
                type={"primary"}
              >
                Apply filter
              </Button>
            </Margin>
          </Align>
        </Align>
      );
    }
    if (activeTab === "sort") {
      return (
        <Align style={{ width: "100%" }} alignCenter justifyBetween>
          <Align alignCenter>
            <Popover
              style={{ width: 240 }}
              title={
                <strong style={{ color: "var(--text-color)" }}>
                  Using the sort
                </strong>
              }
              content={
                <p
                  style={{
                    width: 240,
                    fontSize: 13,
                    color: "var(--text-color)",
                  }}
                >
                  We supply a series of design principles, practical patterns
                  and high quality design resources (Sketch and Axure), to help
                  people create their product prototypes beautifully and
                  efficiently.
                </p>
              }
              trigger="click"
            >
              <Tooltip title={"Help"}>
                <Button type={"link"}>
                  <QuestionCircleOutlined style={{ fontSize: 20 }} />
                </Button>
              </Tooltip>
            </Popover>
            <Margin left={20}>
              <Button type={"primary"} icon={<PlusOutlined />}>
                Add sort
              </Button>
            </Margin>
          </Align>
          <Align>
            {" "}
            <Button>Clear sort</Button>
            <Margin left={20}>
              <Button icon={<SortAscendingOutlined />} type={"primary"}>
                Apply sort
              </Button>
            </Margin>
          </Align>
        </Align>
      );
    }
    return null;
  };

  return (
    <Modal
      visible={visible}
      title={"Data Management"}
      onCancel={handleCancel}
      centered
      width={"75%"}
      bodyStyle={{ height: dimension.height * 0.65, padding: 0 }}
      footer={[
        // Todo: move inline-styles to css file.
        <ModalFooter activeTab={activeTab} dispatch={dispatch} state={state} />,
      ]}
    >
      <Tabs
        defaultActiveKey="filter"
        centered
        tabBarStyle={{ height: 50 }}
        tabBarGutter={40}
        onChange={(key) => setActiveTab(key)}
      >
        <TabPane tab="Search" key="search">
          <motion.div layout>
            <Search
              columns={columns}
            />
          </motion.div>
        </TabPane>
        <TabPane tab="Filter" key="filter">
          <Filter
            columns={columns}
            dataSource={dataSource}
            dispatch={dispatch}
            state={state}
          />
        </TabPane>
        <TabPane tab="Sort" key="sort">
            <Sort />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
