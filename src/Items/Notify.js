import React from "react";

import { Button, notification, Divider, Space, Typography } from "antd";
import {
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
} from "@ant-design/icons";

const openNotification = (placement) => {
  notification.info({
    message: `Notification ${placement}`,
    description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    placement,
  });
};

export default () => (
  <Space direction={"vertical"} size={16}>
    <Typography.Title level={3}>Notification</Typography.Title>
    <div>
      <Space>
        <Button type="primary" onClick={() => openNotification("topLeft")}>
          <RadiusUpleftOutlined />
          topLeft
        </Button>
        <Button type="primary" onClick={() => openNotification("topRight")}>
          <RadiusUprightOutlined />
          topRight
        </Button>
      </Space>
      <Divider />
      <Space>
        <Button type="primary" onClick={() => openNotification("bottomLeft")}>
          <RadiusBottomleftOutlined />
          bottomLeft
        </Button>
        <Button type="primary" onClick={() => openNotification("bottomRight")}>
          <RadiusBottomrightOutlined />
          bottomRight
        </Button>
      </Space>
    </div>
  </Space>
);
