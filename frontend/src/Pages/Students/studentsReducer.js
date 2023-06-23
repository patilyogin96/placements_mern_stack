export const studentsReducer = (state, action) => {
  console.log("State", state);
  switch (action.type) {
    case "studentList": {
      return {
        ...state,
        data: action.payload,
      };
    }
    case "field": {
      let formState = state.createStudent;
      formState[action.fieldName] = action.payload;

      return {
        ...state,
      };
    }

    case "closeDrawer": {
      state.createStudent = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        college: "",
      };

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
