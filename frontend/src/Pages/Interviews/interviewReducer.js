export const interviewReducer = (state, action) => {
  switch (action.type) {
    case "interviewList": {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};
