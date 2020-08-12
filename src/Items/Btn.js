import React from "react";

import { Button, Pagination, Radio, Space, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Title } = Typography;
export default class ButtonSize extends React.Component {
  state = {
    size: "large",
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <Space size={16} direction={"vertical"}>
        <Title level={3}>Buttons</Title>
        <Space>
          <Radio.Group value={size} onChange={this.handleSizeChange}>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
          <br />
          <br />
          <Button type="primary" size={size}>
            Primary
          </Button>
          <Button size={size}>Default</Button>
          <Button type="dashed" size={size}>
            Dashed
          </Button>
          <br />
          <Button type="link" size={size}>
            Link
          </Button>
          <br />
          <Button type="primary" icon={<DownloadOutlined />} size={size} />
          <Button
            type="primary"
            shape="circle"
            icon={<DownloadOutlined />}
            size={size}
          />
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size={size}
          />
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size={size}
          >
            Download
          </Button>
          <Button type="primary" icon={<DownloadOutlined />} size={size}>
            Download
          </Button>
        </Space>
        <Space direction={"vertical"}>
          <Title level={3}>Pagination</Title>
          <Pagination defaultCurrent={10} total={500} />
        </Space>
      </Space>
    );
  }
}
