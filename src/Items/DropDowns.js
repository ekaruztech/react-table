import React from "react";

import { Menu, Dropdown, Button, Space, Typography } from "antd";

const { Title } = Typography;
const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

export default () => (
  <Space size={16} direction={"vertical"}>
    <Title level={3}>Dropdown</Title>
    <Space>
      <Dropdown overlay={menu} placement="bottomLeft" arrow>
        <Button>bottomLeft</Button>
      </Dropdown>
      <Dropdown overlay={menu} placement="bottomCenter" arrow>
        <Button>bottomCenter</Button>
      </Dropdown>
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Button>bottomRight</Button>
      </Dropdown>
      <br />
      <Dropdown overlay={menu} placement="topLeft" arrow>
        <Button>topLeft</Button>
      </Dropdown>
      <Dropdown overlay={menu} placement="topCenter" arrow>
        <Button>topCenter</Button>
      </Dropdown>
      <Dropdown overlay={menu} placement="topRight" arrow>
        <Button>topRight</Button>
      </Dropdown>
    </Space>
  </Space>
);
