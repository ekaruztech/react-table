import { Space, Typography } from "antd";
import React from "react";
import { Steps } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

export default () => {
  return (
    <Space direction={"vertical"}>
      <Typography.Title level={3}>Steps</Typography.Title>
      <Space size={20} direction={"vertical"}>
        <Steps current={1}>
          <Step title="Finished" description="This is a description." />
          <Step
            title="In Progress"
            subTitle="Left 00:00:08"
            description="This is a description."
          />
          <Step title="Waiting" description="This is a description." />
        </Steps>
        <Steps>
          <Step status="finish" title="Login" icon={<UserOutlined />} />
          <Step
            status="finish"
            title="Verification"
            icon={<SolutionOutlined />}
          />
          <Step status="process" title="Pay" icon={<LoadingOutlined />} />
          <Step status="wait" title="Done" icon={<SmileOutlined />} />
        </Steps>
      </Space>
    </Space>
  );
};
