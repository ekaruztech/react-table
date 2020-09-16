import React from "react";
import { Checkbox } from "antd";
import { reorder } from "../../_utils";
// @ts-ignore
import { isEmpty, find, last } from "lodash";
// @ts-ignore
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { TableColumnProps, ColumnProps } from "../../../../../../types";

type Sortable = {
  setColumns: React.Dispatch<React.SetStateAction<TableColumnProps>>;
  columns: TableColumnProps;
  maxColumns: number;
  minColumns: number;
};
export default (props: Sortable) => {
  const { setColumns, columns, maxColumns, minColumns } = props;

  const onChange = (
    value: ColumnProps,
    isSelected: ColumnProps | undefined
  ) => {
    setColumns((prev: TableColumnProps) => {
      // Value is already existing in the selected array.
      if (isSelected) {
        return {
          selected: prev.selected.filter((o) => o?.key !== value?.key),
          unselected: prev.unselected.concat(value),
          all: prev.selected
            .filter((o) => o?.key !== value?.key)
            .concat(prev.unselected.concat(value)),
        };
      } else {
        return {
          selected: prev.selected.concat(value),
          unselected: prev.unselected.filter((f) => f?.key !== value?.key),
          all: prev.selected.concat(
            value,
            prev.unselected.filter((f) => f?.key !== value?.key)
          ),
        };
      }
    });
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // Reorder item
    const items = reorder(
      columns.all,
      result.source.index,
      result.destination.index
    );
    setColumns((prev: TableColumnProps) => {
      const selected = items.filter(
        (value: ColumnProps) =>
          !isEmpty(find(prev.selected, (o: ColumnProps) => o.key === value.key))
      );
      const all = selected.concat(
        items.filter((value: ColumnProps) =>
          isEmpty(find(prev.selected, (o: ColumnProps) => o.key === value.key))
        )
      );
      return {
        ...prev,
        all,
        selected,
      };
    });
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: "8px",
    margin: `10px 0`,

    // change background colour if dragging
    background: isDragging
      ? "var(--draggable-background-1)"
      : "var(--draggable-background-2)",
    border: isDragging ? "1px solid var(--border)" : 0,
    borderRadius: 4,
    // styles we need to apply on 'draggable(s)'
    ...draggableStyle,
  });

  const getListStyle = () => ({
    width: "100%",
  });

  // See react-beautiful-dnd for more usage documentation.

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: any, snapshot: any) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              ...getListStyle(),
              height: 350,
              overflowY: "scroll",
            }}
          >
            {columns.all.map((value: ColumnProps, index: number) => {
              const isSelected = columns.selected.find(
                (o: ColumnProps) => o?.key === value?.key
              );
              const dragDisabled =
                (columns.selected.length >= maxColumns && !isSelected) ||
                (isSelected !== undefined &&
                  columns.selected.length <= minColumns);
              return (
                <Draggable
                  key={`column-item-${index}`}
                  draggableId={`column-item-${index}`}
                  index={index}
                  isDragDisabled={dragDisabled}
                >
                  {(provided: any, snapshot: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        ),
                        pointerEvents: dragDisabled ? "none" : "all",
                        opacity: dragDisabled ? 0.5 : 2,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Checkbox
                          disabled={
                            (columns.selected.length >= maxColumns &&
                              !isSelected) ||
                            (isSelected !== undefined &&
                              columns.selected.length <= minColumns)
                          }
                          checked={isSelected !== undefined || false}
                          onChange={() => onChange(value, isSelected)}
                        >
                          {value?.title}
                        </Checkbox>
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path
                              fill={
                                snapshot.isDragging
                                  ? "var(--accent)"
                                  : "var(--accent35)"
                              }
                              d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
