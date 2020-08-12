import React from "react";
import { Popover, Button, Space, Typography } from "antd";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const TabDemo = () => (
  <Tabs defaultActiveKey="1" centered>
    <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);

const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const buttonWidth = 70;

export default () => (
  <Space direction={"vertical"} size={16}>
    <Typography.Title level={3}>Popover</Typography.Title>
    <div className="demo">
      <div style={{ marginLeft: buttonWidth, whiteSpace: "nowrap" }}>
        <Popover
          placement="topLeft"
          title={text}
          content={content}
          trigger="click"
        >
          <Button>TL</Button>
        </Popover>
        <Popover placement="top" title={text} content={content} trigger="click">
          <Button>Top</Button>
        </Popover>
        <Popover
          placement="topRight"
          title={text}
          content={content}
          trigger="click"
        >
          <Button>TR</Button>
        </Popover>
      </div>
      <div style={{ width: buttonWidth, float: "left" }}>
        <Popover
          placement="leftTop"
          title={text}
          content={content}
          trigger="click"
        >
          <Button>LT</Button>
        </Popover>
       <br/>
        <Popover
          placement="left"
          title={text}
          content={content}
          trigger="click"
        >
          <Button>Left</Button>
        </Popover>
        <Popover
          placement="leftBottom"
          title={text}
          content={content}
          trigger="click"
        >
          <Button>LB</Button>
        </Popover>
      </div>
      <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
        <Popover
          placement="rightTop"
          title={text}
          content={content}
          trigger="click"
        >
          <Button>RT</Button>
        </Popover>
        <Popover
          placement="right"
          title={text}
          content={content}
          trigger="click"
        >
          <Button>Right</Button>
        </Popover>
        <Popover
          placement="rightBottom"
          title={text}
          content={content}
          trigger="click"
        >
          <Button>RB</Button>
        </Popover>
      </div>
      <div
        style={{ marginLeft: buttonWidth, clear: "both", whiteSpace: "nowrap" }}
      >
        <Popover
          placement="bottomLeft"
          title={text}
          content={content}
          trigger="click"
        >
          <Button>BL</Button>
        </Popover>
        <Popover
          placement="bottom"
          title={text}
          content={content}
          trigger="click"
        >
          <Button>Bottom</Button>
        </Popover>
        <Popover
          placement="bottomRight"
          title={text}
          content={content}
          trigger="click"
        >
          <Button>BR</Button>
        </Popover>
      </div>
    </div>

    <Space direction={"vertical"} size={16}>
      <Typography.Title level={3}>Popover</Typography.Title>
      <TabDemo />
    </Space>
  </Space>
);
