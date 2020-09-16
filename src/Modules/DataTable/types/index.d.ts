interface ColumnProps {
  title: string;
  dataIndex: string;
  key: string;
  type: string;
  autoComplete?: boolean;
  multiple?: boolean;
  presentationType?: string;
  presentationColor?: string;
  listMenu?: Array<{ label: string; value: string | number }>;
  actionCallback?: CallableFunction;
}
interface TableColumnProps {
  all: Array<ColumnProps>;
  selected: Array<ColumnProps>;
  unselected: Array<ColumnProps>;
}

interface FilterProps {
  filterIndex: number;
  filterProps: {
    property: null | string;
    type: null | string;
    value: null | string | boolean | number | Date;
  };
}

type TableFilterProps = ColumnProps & FilterProps;

interface TableFilterState {
  filters: Array<FilterProps>;
  sorts: [];
  search: {
    where: string;
    what: string;
  };
}

type TableFilterAction =
  | {
      type: "ADD_FILTER";
      payload: {
        filterProps: {
          property: null | string;
          type: null | string;
          value: null | string | boolean | number | Date;
        };
      };
    } // typescript union types allow for leading |'s to have nicer layout
  | { type: "REMOVE_FILTER"; payload: { filterIndex: number } }
  | { type: "UPDATE_FILTER"; payload: FilterProps }
  | { type: "ADD_OR_UPDATE_SEARCH"; payload: any };

export type {
  ColumnProps,
  TableColumnProps,
  TableFilterProps,
  TableFilterState,
  FilterProps,
  TableFilterAction,
};
