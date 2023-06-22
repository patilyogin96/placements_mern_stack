export const studentsReducer = (state, action) => {
  console.log("State", state);
  switch (action.type) {
    case "studentList": {
      return {
        ...state,
        data: action.payload,
      };
    }

    default:
      return state;
  }
};
