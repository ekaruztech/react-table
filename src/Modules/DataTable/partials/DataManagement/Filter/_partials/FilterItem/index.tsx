import React, { useEffect, useMemo, useState } from "react";
import { Align, Margin } from "../../../../UtilityComponents";
import { Button, Select, Tag, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { toPercentage } from "../../../../../hooks";
import {
  ColumnProps,
  TableColumnProps,
  TableFilterAction,
  TableFilterProps,
} from "../../../../../types";
import RenderFilterType from "../RenderFilterType";

const { Option } = Select;
type FilterItemProps = {
  columns: TableColumnProps;
  filterData: any;
  logicType: string;
  isLastIndex: boolean;
  isMoreThanOne: boolean;
  isFirstIndex: boolean;
  dataSource: any;
  dispatch: React.Dispatch<TableFilterAction>;
  dimension: { height: number; width: number };
};
export default (props: FilterItemProps) => {
  const {
    columns,
    filterData,
    logicType,
    isLastIndex,
    isMoreThanOne,
    isFirstIndex,
    dataSource,
    dispatch,
    dimension,
  } = props;

  const validColumns = useMemo(
    () => columns.selected.filter((o: ColumnProps) => o.type !== "action"),
    [columns.selected]
  );
  const stringFilters = [
    { label: "Equals", value: "equals" },
    { label: "Does not equal", value: "does not equal" },
    { label: "Begins with", value: "begins with" },
    { label: "Ends with", value: "ends with" },
    { label: "Contains", value: "contains" },
    { label: "Does not contains", value: "does not contains" },
  ];
  const numberFilters = [
    { label: "Equals to", value: "equals" },
    { label: "Greater than", value: "greater than" },
    { label: "Less than", value: "less than" },
    { label: "In between", value: "in between" },
  ];
  const dateFilters = [
    { label: "more than", value: "more than" },
    { label: "less than", value: "less than" },
    { label: "on", value: "on" },
    { label: "between", value: "between" },
  ];
  const booleanFilters = [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ];
  const listFilters = [
    { label: "Equals", value: "equals" },
    { label: "Does not equal", value: "does not equal" },
  ];

    /**
     * Evaluates the column types and displays its filter
     * @param type
     */
  const evalType = (type: string): {value: string, label: string}[] => {
    if (type === "number") return numberFilters;
    if (type === "boolean") return booleanFilters;
    if (type === "date" || type === "datetime") return dateFilters;
    if (type === "list") return listFilters;
    return stringFilters;
  };
  const [property, setProperty] = useState<TableFilterProps>(filterData);
  const [filterType, setFilterType] = useState<string | null>(
    evalType(property?.type)?.[0]?.value ?? "equals"
  );
  const [autoCompleteProps, setAutoCompleteProps] = useState<string | null>(
    null
  );
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    Array<{ value: string }> | undefined
  >([]);

  const type: string = property?.type || "text";

    /**
     * Tokenizes a text field value for autocompletion
     * Tokenization replaces space with underscore and adds a new line to the beginning of each word, starting from the second.
     * @param acc
     * @param current
     * @param index
     */
  const handleAutoCompleteResource = (acc: string, current: any, index: number): string => {
    const currentValue = current[property?.key ?? ""] ?? "";
    const tokenize = currentValue.trim().split(" ").join("_");
    return index === 0 ? acc.concat(tokenize) : acc.concat(`\n${tokenize}`);
  };

  useEffect(() => {
    if (type === "text" && property?.autoComplete) {
      setAutoCompleteProps(dataSource.reduce(handleAutoCompleteResource, ""));
    }
  }, [property]);

    /**
     * Matches user input with tokenized resource for autocompletion
     * Converts all matched results to [{value: result}] format
     * @param value
     */
  const handleAutoComplete = (value: string): void => {
    const regex = new RegExp(
      `(^|\\s)${value}+(?:\\w)*(\\s|$)|(^|\\s)\\w+(?:\\w)*(?:_)${value}+(?:\\w)*(\\s|$)`,
      "gim"
    );
    const options = autoCompleteProps?.match(regex);
    if (options) {
      setAutoCompleteOptions(
        (options || []).map((o) => ({ value: o.split("_").join(" ").trim() }))
      );
    }
  };

    /**
     * Removes a filter item
     * @param filterIndex
     */
  const handleFilterRemoval = (filterIndex: number): void => {
    dispatch({ type: "REMOVE_FILTER", payload: { filterIndex } });
  };

    /**
     * Handles the selection of different property(column) for a given filter.
     * @param value
     */
  const handlePropertyChange = (value: string): void => {
    const key = value;
    const newProperty = columns.all.find((o) => o.key === key);
    setProperty((prevState) => ({
      ...prevState,
      ...newProperty,
      filterProps: { property: null, type: null, value: null },
    }));
  };

    /**
     * Stores the filter value whenever it changes
     * @param value
     * @param valueType
     * @param rangePosition
     */
  const handleFilterValueChange = (
    value: number | string | Date | undefined,
    valueType: string | undefined = "fixed",
    rangePosition: string | undefined
  ): null => {
    if (valueType === "range" && rangePosition) {
      const filterProps = {
        property: property?.key,
        type: filterType,
        value: {
          ...filterData.filterProps.value,
          [rangePosition]: value,
        },
      };
      dispatch({
        type: "UPDATE_FILTER",
        payload: { ...filterData, filterProps },
      });
      return null;
    }
    const filterProps = {
      property: property?.key,
      type: filterType,
      value,
    };
    dispatch({
      type: "UPDATE_FILTER",
      payload: { ...filterData, filterProps },
    });
    return null;
  };
  const PrefixStatement = () => {
    const prefix = () => {
      if (
        type === "number" ||
        type === "boolean" ||
        type === "date" ||
        type === "datetime"
      )
        return "is";
      return null;
    };
    return type !== "text" && type !== "list" ? (
      <Margin right={20}>
        <Tag style={{ height: 32, lineHeight: "32px" }} color={"processing"}>
          {prefix()}
        </Tag>
      </Margin>
    ) : null;
  };
  const SuffixStatement = () => {
    const suffix = () => {
      if (
        (type === "number" || type === "date" || type === "datetime") &&
        (filterType ?? "").includes("between")
      )
        return "and";
      return null;
    };
    return (type === "number" || type === "date" || type === "datetime") &&
      (filterType ?? "").includes("between") ? (
      <Margin horizontal={20}>
        <Tag style={{ height: 32, lineHeight: "32px" }} color={"processing"}>
          {suffix()}
        </Tag>
      </Margin>
    ) : null;
  };

  return (
    <Align justifyCenter style={{ width: "100%" }} type={"column"}>
      {isFirstIndex && (
        <Align
          justifyCenter
          alignCenter
          type={"column"}
          style={{ width: "fit-content" }}
        >
          <Tag color={"processing"}>FIND DATA WHERE</Tag>
          <div
            style={{
              height: 20,
              width: 5,
              borderLeft: "1.5px solid var(--border)",
            }}
          />
        </Align>
      )}
      <Margin style={{ width: "100%" }}>
        <Align
          alignCenter
          style={{ width: "100%" }}
          // id={"filter__field__container"}
        >
          <Margin right={20}>
            <Select
              showSearch
              style={{
                width: toPercentage(
                  dimension.width,
                  type === "boolean" ? 0.45 : 0.3
                ),
              }}
              placeholder="Select a property"
              onChange={handlePropertyChange}
              value={property?.key}
              filterOption
            >
              {(validColumns || [])?.map?.((value, index) => {
                return (
                  <Option value={value.key} key={index}>
                    {value.title}
                  </Option>
                );
              })}
            </Select>
          </Margin>
          <Margin right={20}>
            <Align alignCenter>
              <PrefixStatement />
              <Select
                style={{
                  width: toPercentage(
                    dimension.width,
                    type === "boolean" ? 0.41 : 0.2
                  ),
                }}
                onChange={(value) => setFilterType(value)}
                value={filterType ?? ""}
              >
                {(evalType(property?.type ?? "text") || stringFilters).map(
                  ({ value, label }, index) => {
                    return (
                      <Option value={value} key={index}>
                        {label}
                      </Option>
                    );
                  }
                )}
              </Select>
            </Align>
          </Margin>
          {type !== "boolean" && (
            <Align
              alignCenter
              style={{ width: toPercentage(dimension.width, 0.5) }}
            >
              <RenderFilterType
                autoCompleteOptions={autoCompleteOptions}
                suffix={SuffixStatement}
                property={property}
                filterType={filterType}
                dimension={dimension}
                type={type}
                handleAutoComplete={handleAutoComplete}
                handleFilterValueChange={handleFilterValueChange}
                currentData={filterData}
              />
            </Align>
          )}

          <Tooltip title={"Remove"}>
            <Button
              type={"link"}
              danger
              onClick={() => handleFilterRemoval(filterData.filterIndex)}
            >
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Align>
      </Margin>
      {!isLastIndex && isMoreThanOne && (
        <Align
          justifyCenter
          alignCenter
          type={"column"}
          style={{ width: "fit-content" }}
        >
          <div
            style={{
              height: 20,
              width: 5,
              borderLeft: "1.5px solid var(--border)",
            }}
          />
          <Tag color={"processing"}>{(logicType ?? "")?.toUpperCase()}</Tag>
          <div
            style={{
              height: 20,
              width: 5,
              borderLeft: "1.5px solid var(--border)",
            }}
          />
        </Align>
      )}
    </Align>
  );
};
