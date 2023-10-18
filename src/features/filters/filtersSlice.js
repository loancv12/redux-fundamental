export const StatusFilters = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

const initialState = {
  status: StatusFilters.All,
  colors: [],
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case "filters/statusFilterChanged": {
      return {
        // Again, one less level of nesting to copy
        ...state,
        status: action.payload,
      };
    }
    case "filters/colorFilterChanged": {
      let newColors = [];
      const { color: colorChange, changeType } = action.payload;
      if (changeType === "addColor") {
        newColors = [...state.colors, colorChange];
      } else if (changeType === "removed") {
        newColors = state.colors.filter((color) => color !== colorChange);
      }
      return {
        // Again, one less level of nesting to copy
        ...state,
        colors: newColors,
      };
    }
    default:
      return state;
  }
}

export const colorFilterChanged = (color, changeType) => {
  return {
    type: "filters/colorFilterChanged",
    payload: {
      color,
      changeType,
    },
  };
};
