export const interviewReducer = (state, action) => {
  switch (action.type) {
    case "interviewList": {
      return {
        ...state,
        data: action.payload,
      };
    }

    case "closeDrawer": {
      return {
        ...state,

        [action.fieldName]: action.payload,
      };
    }
    case "openDrawer": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    default:
      return state;
  }
};
