import React from "react";
import { Modal, Button, Space, Typography, message } from "antd";
import ambient from '../sound/Alerts/notification_ambient.wav';
import highIntensity from '../sound/Alerts/notification_high-intensity.wav';
import errorSound from '../sound/Secondary/alert_error-01.wav';

const key = "updatable";

const openMessage = () => {
  message.loading({ content: "Loading...", key });
  setTimeout(() => {
    message.success({ content: "Loaded!", key, duration: 2 });
  }, 1000);
};
const Messagesuccess = () => {
  message.success("This is a success message");
  const audio = new Audio(highIntensity);
  audio.play();
};

const Messageerror = () => {
  message.error("This is an error message");
  const audio = new Audio(errorSound);
  audio.play();
};

const Messagewarning = () => {
  message.warning("This is a warning message");
};
function info() {
  Modal.info({
    title: "This is a notification message",
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
}

function success() {
  Modal.success({
    content: "some messages...some messages...",
  });
}

function error() {
  Modal.error({
    title: "This is an error message",
    content: "some messages...some messages...",
  });
}

function warning() {
  Modal.warning({
    title: "This is a warning message",
    content: "some messages...some messages...",
  });
}

class App extends React.Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Modal with customized footer
        </Button>
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    );
  }
}

export default () => (
  <Space direction={"vertical"} size={32}>
    <Typography.Title level={3}>Modal</Typography.Title>
    <Space>
      <App />
      <Button onClick={info}>Info</Button>
      <Button onClick={success}>Success</Button>
      <Button onClick={error}>Error</Button>
      <Button onClick={warning}>Warning</Button>
    </Space>
    <Space direction={"vertical"} size={32}>
      <Typography.Title level={3}>Message</Typography.Title>
      <Space>
        <Button type="primary" onClick={openMessage}>
          Open the message box
        </Button>
        <Button onClick={Messagesuccess}>Success</Button>
        <Button onClick={Messageerror}>Error</Button>
        <Button onClick={Messagewarning}>Warning</Button>
      </Space>
    </Space>
  </Space>
);
