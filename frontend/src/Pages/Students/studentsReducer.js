export const studentsReducer = (state, action) => {
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
      const resetCreateStudent = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        college: "",
      };

      return {
        ...state,
        createStudent: resetCreateStudent,
        [action.fieldName]: action.payload,
      };
    }
    case "openDrawer": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case "buttonType": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case "setSelectLists": {
      if (action?.fieldName === "student") {
        // let studentList = state.selectListData.studentList;
        // studentList = action.payload;
        state.selectListData.studentList = action.payload;
      } else {
        state.selectListData.interviewList = action.payload;
      }

      return {
        ...state,
      };
    }
    case "selectFromListing": {
      if (action?.fieldName === "student") {
        // let studentList = state.selectListData.studentList;
        // studentList = action.payload;
        state.selectListData.selectedStudents =
          typeof action.payload === "string"
            ? action.payload.split(",")
            : action.payload;
      } else {
        state.selectListData.selectedInterviews =
          typeof action.payload === "string"
            ? action.payload.split(",")
            : action.payload;
      }

      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
