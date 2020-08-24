import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import arrayMove from 'array-move';
import { Button, Checkbox } from 'antd';
import './_style.scss';
import { filter, find, isEmpty } from 'lodash';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDimension } from '../../index';


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  // Removes the value from the start index
  const [removed] = result.splice(startIndex, 1);
  // Inserts at the end index.
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 5;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: '8px',
  margin: `10px 0`,

  // change background colour if dragging
  background: isDragging
    ? "var(--draggable-background-1)"
    : "var(--draggable-background-2)",
  border: isDragging ? "1px solid var(--border)" : 0,
  borderRadius: 4,
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  width: "100%",
});

class Sortable extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = (value, finder) => {
    this.props.setColumns((prev) => {
      if (finder) {
        return {
          selected: prev.selected.filter((f) => f?.key !== value?.key),
          unselected: prev.unselected.concat(value),
          all: prev.selected
            .filter((f) => f?.key !== value?.key)
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

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.props.columns.all,
      result.source.index,
      result.destination.index,
    );
    this.props.setColumns((prev) => {
      const selected = items.filter(
        (value) => !isEmpty(find(prev.selected, (o) => o.key === value.key))
      );
      const all = selected.concat(
        items.filter((value) =>
          isEmpty(find(prev.selected, (o) => o.key === value.key))
        )
      );
      return {
        ...prev,
        all,
        selected,
        // selected: map(intersection(map(prev.selected, o => o.title), map(items, o => o.title)), o => find(items, value => value?.title === o))
      };
    });

  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  ...getListStyle(snapshot.isDraggingOver),
                  height: 350,
                  overflowY: "scroll",
                }}
              >
                {this.props.columns.all.map((value, index) => {
                  const finder = this.props.columns.selected.find(
                    (v) => v?.key === value?.key
                  );
                  const dragDisabled =
                    (this.props.columns.selected.length >=
                      this.props.maxColumns &&
                      !finder) ||
                    (value?.finder !== undefined &&
                      this.props.columns.selected.length <=
                      this.props.minColumns);
                  return (
                    <Draggable
                      key={`column-item-${index}`}
                      draggableId={`column-item-${index}`}
                      index={index}
                      isDragDisabled={dragDisabled}
                    >
                      {(provided, snapshot) => (
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
                                (this.props.columns.selected.length >=
                                  this.props.maxColumns &&
                                  !finder) ||
                                (finder !== undefined &&
                                  this.props.columns.selected.length <=
                                  this.props.minColumns)
                              }
                              checked={finder !== undefined || false}
                              onChange={() => this.onChange(value, finder)}
                            >
                              {value?.title}
                            </Checkbox>
                            <span
                              style={{ display: "flex", alignItems: "center" }}
                            >
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
  }
}

export default ({
  setColumns,
  columns,
  maxColumns,
  minColumns,
  defaultColumns,
}) => {

  const dimension = useDimension();

  return (
    <div className={'vmw-table-column-filter'}>
      <div className={'vmw-table-column-filter-header'}>
        <span className={'vmw-table-column-filter-header-text'}>
          Customize Column
        </span>
      </div>
      <PerfectScrollbar>
        <Sortable
          dimension={dimension}
          setColumns={setColumns}
          columns={columns}
          maxColumns={maxColumns}
          minColumns={minColumns}
        />
      </PerfectScrollbar>
      <div className={'vmw-table-column-filter-footer'}>
        <Button
          type={'primary'}
          onClick={() => null}
          style={{
            marginRight: 10,
          }}
        >
          Save as preset
        </Button>
        <Button
          type={'dashed'}
          onClick={() => {
            setColumns(prev => ({
              selected: defaultColumns?.slice?.(0, maxColumns),
              unselected:
                defaultColumns?.length > maxColumns
                  ? defaultColumns?.slice?.(0, defaultColumns.length)
                  : [],
              all: defaultColumns,
            }));
          }}
        >
          Clear all
        </Button>
      </div>
    </div>
  );
};
