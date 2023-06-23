import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { studentsReducer } from "./studentsReducer";
import { api_token } from "../../Utils/Networks";
import { useReducer } from "react";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
import CustomInput from "../../Components/CustomInput/CustomInput";

const initialState = {
  data: [],
  createStudent: {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    college: "",
    user_type: 2,
  },

  openDrawer: false,
};

const Students = () => {
  const [state, dispatch] = useReducer(studentsReducer, initialState);
  const { data, openDrawer, createStudent } = state;
  console.log("StateMain", state);

  const submitCreateStudentForm = (e) => {
    e.preventDefault();
    api_token
      .post(
        `http://localhost:8000/api/v1/student/create-student`,
        createStudent
      )
      .then((response) => {
        console.log("CReateStudent", response);
        if (response.status === 201) {
          dispatch({
            type: "closeDrawer",
            fieldName: "openDrawer",
            payload: false,
          });
        }
      })
      .catch((err) => {});
  };

  // fetch students from api through function
  const getAllStudents = () => {
    api_token
      .get(`api/v1/student/`)
      .then((response) => {
        console.log("StudentResponse", response);
        dispatch({
          type: "studentList",
          payload: response?.data?.data,
        });
      })
      .catch((err) => {});
  };

  const createStudentForm = () => {
    return (
      <>
        <form onSubmit={submitCreateStudentForm}>
          <div className={styles.formContainer}>
            <div>
              <CustomInput
                label={"First Name"}
                size="small"
                maxLength={5}
                style={{ width: "100%" }}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "first_name",
                    payload: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <CustomInput
                label={"Last Name"}
                size="small"
                maxLength={5}
                style={{ width: "100%" }}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "last_name",
                    payload: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <CustomInput
                label={"Email"}
                size="small"
                maxLength={5}
                style={{ width: "100%" }}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "email",
                    payload: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <CustomInput
                label={"Phone"}
                size="small"
                maxLength={5}
                style={{ width: "100%" }}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "phone",
                    payload: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <CustomInput
                label={"College"}
                size="small"
                maxLength={5}
                style={{ width: "100%" }}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "college",
                    payload: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.drwBtnFlex}>
              <CustomButton text={"Create Student"} type={"submit"} />
              <CustomButton text={"Cancel"} />
            </div>
          </div>
        </form>
      </>
    );
  };

  // useEffect
  useEffect(() => {
    getAllStudents();
  }, []);
  return (
    <>
      <div className={styles.container}>
        {/* header */}
        <div className={styles.headerBox}>
          <div>All Students</div>
          <div>
            <div>
              {/* button to open add student drawer */}
              <CustomButton
                text={"Add Student"}
                color="primary"
                onClick={() =>
                  dispatch({
                    type: "openDrawer",
                    fieldName: "openDrawer",
                    payload: true,
                  })
                }
              />
            </div>
          </div>
        </div>
        {/* search and other filters */}
        <div className={styles.filterBox}></div>
        {/* Table */}
        <div className={styles.tableBox}>
          <CustomTable data={data} columns={columns} />
        </div>

        {/* drawer component code */}
        <div>
          <CustomDrawer
            open={openDrawer}
            onClose={() =>
              dispatch({
                type: "closeDrawer",
                fieldName: "openDrawer",
                payload: false,
              })
            }
            drawerWidth={"30%"}
            title={"Add Student"}
          >
            {createStudentForm()}
          </CustomDrawer>
        </div>
      </div>
    </>
  );
};

export default Students;

const columns = [
  { id: "name", label: "Name" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "", label: "Placement Status" },
  // Add more columns as needed
];
