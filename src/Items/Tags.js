import React from 'react';

import { Tag, Divider, Space, Typography, Skeleton } from 'antd';

export default () => (
    <Space direction={'vertical'} size={16}>
        <Typography.Title level={3}>Tags</Typography.Title>
        <Divider orientation="left">Presets</Divider>
        <div>
            <Tag color="magenta">magenta</Tag>
            <Tag color="red">red</Tag>
            <Tag color="volcano">volcano</Tag>
            <Tag color="orange">orange</Tag>
            <Tag color="gold">gold</Tag>
            <Tag color="lime">lime</Tag>
            <Tag color="green">green</Tag>
            <Tag color="cyan">cyan</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="geekblue">geekblue</Tag>
            <Tag color="purple">purple</Tag>
        </div>
        <Divider orientation="left">Custom</Divider>
        <div>
            <Tag color="#f50">#f50</Tag>
            <Tag color="#2db7f5">#2db7f5</Tag>
            <Tag color="#87d068">#87d068</Tag>
            <Tag color="#108ee9">#108ee9</Tag>
        </div>
        <Typography.Title level={3}>Skeleton</Typography.Title>
        <Skeleton active />
    </Space>
);