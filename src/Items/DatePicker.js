import React, { useState } from "react";
import { Space, Typography, DatePicker, Select, TimePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

function PickerWithType({ type, onChange }) {
  if (type === "time") return <TimePicker onChange={onChange} />;
  if (type === "date") return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
}

function SwitchablePicker() {
  const [type, setType] = useState("time");
  return (
    <Space>
      <Select value={type} onChange={setType}>
        <Option value="time">Time</Option>
        <Option value="date">Date</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
        <Option value="quarter">Quarter</Option>
        <Option value="year">Year</Option>
      </Select>
      <PickerWithType type={type} onChange={(value) => console.log(value)} />
    </Space>
  );
}
function onChange(date, dateString) {
  console.log(date, dateString);
}

export default () => (
  <Space direction="vertical" size={12}>
    <Typography.Title level={3}>DatePicker</Typography.Title>
    <Space direction="vertical" size={12}>
      <RangePicker />
      <RangePicker showTime />
      <RangePicker picker="week" />
      <RangePicker picker="month" />
      <RangePicker picker="year" />
      <RangePicker
        ranges={{
          "Last Year": [
            moment().subtract(1, 'year').startOf('year'),
            moment().subtract(1, "year").endOf("year"),
          ],
          "Last Month": [
            moment().subtract(1, "month").startOf("month"),
            moment().subtract(1, "month").endOf("month"),
          ],
          Today: [moment(), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
          "Next Month": [
            moment().add(1, "month").startOf("month"),
            moment().add(1, "month").endOf("month"),
          ],
          "Next Year": [
            moment().add(1, "year").startOf("year"),
            moment().add(1, "year").endOf("year"),
          ],
        }}
        onChange={onChange}
      />
    </Space>
    <Space direction="vertical" size={12}>
      <Typography.Title level={4}>Switchable Picker</Typography.Title>
      <SwitchablePicker />
    </Space>
    <Space direction="vertical">
      <DatePicker onChange={onChange} />
      <DatePicker onChange={onChange} picker="week" />
      <DatePicker onChange={onChange} picker="month" />
      <DatePicker onChange={onChange} picker="quarter" />
      <DatePicker onChange={onChange} picker="year" />
    </Space>
  </Space>
);
