import { toPercentage, useDimension } from "../../../../hooks";
import React, { useState } from "react";
import ScrollBar from "react-perfect-scrollbar";
import { Align, Padding } from "../../../UtilityComponents";
import { Radio, Tooltip } from "antd";
import {
  TableColumnProps,
  TableFilterState,
  TableFilterAction,
} from "../../../../types";
import FilterItem from "./_partials/FilterItem";

type FilterProps = {
  columns: TableColumnProps;
  dataSource: Array<any>;
  dispatch: React.Dispatch<TableFilterAction>;
  state: TableFilterState;
};
export default (props: FilterProps) => {
  const { columns, dataSource, dispatch, state } = props;
  const windowDimension = useDimension();

  const dimension = useDimension("element", "filter__field__container");
  const [logicType, setLogicType] = useState("or");
  const filterDataLength = state.filters.length;
  return (
    <ScrollBar>
      <Padding
        horizontal={20}
        style={{ height: toPercentage(windowDimension.height, 0.65, 80) }}
      >
        <Align alignCenter justifyCenter style={{ width: "100%" }}>
          <Padding bottom={20}>
            <Radio.Group
              onChange={(e) => setLogicType(e.target.value)}
              value={logicType}
              optionType="button"
              buttonStyle="solid"
            >
              <Tooltip
                title={
                  "Returns result if there's a match for any of the queries (read guide below)."
                }
              >
                <Radio value="or">Match any query</Radio>
              </Tooltip>
              <Tooltip
                title={
                  "Returns result if there's a match for all of the queries  (read guide below)."
                }
              >
                <Radio value="and">Match all queries</Radio>
              </Tooltip>
            </Radio.Group>
          </Padding>
        </Align>
        <Align
          style={{ width: "100%", paddingBottom: 20 }}
          type={"column"}
          alignCenter
          justifyCenter
          id={"filter__field__container"}
        >
          {(state?.filters ?? []).map((data, index: number) => {
            return (
              <FilterItem
                key={data?.filterIndex ?? index}
                columns={columns}
                filterData={data}
                logicType={logicType}
                isLastIndex={index === filterDataLength - 1}
                isMoreThanOne={filterDataLength > 1}
                isFirstIndex={index === 0}
                dataSource={dataSource}
                dispatch={dispatch}
                dimension={dimension}
              />
            );
          })}
        </Align>
      </Padding>
    </ScrollBar>
  );
};
