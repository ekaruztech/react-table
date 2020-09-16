import React, {useState} from "react";
import {Radio} from "antd";
import {AlignCenterOutlined, AlignLeftOutlined} from "@ant-design/icons";

type ColumnDensityProps = {

}
export default () => {
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

