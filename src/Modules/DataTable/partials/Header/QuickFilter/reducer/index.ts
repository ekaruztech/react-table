import { filter } from "lodash";
import { QuickFilterState, QuickFilterAction } from "./reducer";
import { ColumnProps } from "../../../../types";

const initialState = {
  filters: [{ filterIndex: 0, property: "source", value: ["0", "2"] }],
};
const initQuickFilterState = (columns: ColumnProps[]) => {
  return {
    filters: columns.slice(0, 4).map((value, index) => {
      return {
        ...value,
        filterIndex: index,
        property: value?.key,
        value: null,
      };
    }),
  };
};
const quickFilterReducer = (
  state: QuickFilterState,
  action: QuickFilterAction
): QuickFilterState => {
  switch (action.type) {
    case "ADD_FILTER":
      const filterIndex = state.filters.length;
      return {
        ...state,
        filters: state.filters.concat({ ...action.payload, filterIndex }),
      };
    case "REMOVE_FILTER":
      return {
        ...state,
        filters: filter(
          state.filters,
          (o) => o.filterIndex !== action.payload?.filterIndex
        ),
      };
    case "UPDATE_FILTER": {
      const filters = state.filters;
      const filterIndex = action.payload?.filterIndex;
      filters[filterIndex] = action.payload;
      return { ...state, filters };
    }
    case "RESET":
      return { filters: [] };
    default:
      return state;
  }
};

export { quickFilterReducer, initialState, initQuickFilterState };
