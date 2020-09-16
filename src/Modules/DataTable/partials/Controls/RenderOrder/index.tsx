import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, InputNumber, Select } from "antd";
import './_styles.scss';

type RenderOrderProps = {};
export default (props: RenderOrderProps) => {
  const [items, setItems] = useState([
    { label: `15 per page`, value: 15 },
    {
      label: "30 per page",
      value: 30,
    },
    { label: "50 per page", value: 50 },
    { label: "100 per page", value: 100 },
  ]);
  const [inputValue, setInputValue] = useState(0);
  const handleCustomize = () => {
    const findExisting = items.find((o) => o.value === inputValue);
    if (!findExisting) {
      setItems((prev) => [
        ...prev,
        { label: `${inputValue} per page`, value: inputValue },
      ]);
    }
    setInputValue(0);
  };
  return (
    <div className={"RenderOrder"}>
      <Button
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          zIndex: 2,
        }}
        type={"primary"}
      >
        Showing
      </Button>
      <Select
        className={"RenderOrder__select"}
        placeholder="Customize data listing"
        defaultValue={"15 per page"}
        options={items}
        dropdownRender={(menu) => (
          <div>
            <div className={"vmw-data-sort-order-header"}>
              <p>Number of data</p>
            </div>
            {menu}
            <Divider style={{ margin: "4px 0" }} />
            <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
              <InputNumber
                min={10}
                max={500}
                defaultValue={15}
                step={5}
                style={{ flex: "auto" }}
                placeholder={"Data per page"}
                value={inputValue ?? 0}
                onChange={(value) => setInputValue(Number(value))}
              />
            </div>
            <Divider style={{ margin: "4px 0" }} />
            <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
              <Button
                type={"primary"}
                block
                icon={<PlusOutlined />}
                onClick={handleCustomize}
              >
                Customize
              </Button>
            </div>
          </div>
        )}
      />
    </div>
  );
};
