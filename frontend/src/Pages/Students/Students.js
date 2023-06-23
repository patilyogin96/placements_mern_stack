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
};

const Students = () => {
  const [state, dispatch] = useReducer(studentsReducer, initialState);
  const [openDrw, setOpenDrw] = useState(false);
  const { data } = state;
  console.log("State", state);

  const handleBtnClick = () => {
    setOpenDrw(true);
  };
  const getAllStudents = () => {
    api_token
      .get(`api/v1/student/`)
      .then((response) => {
        console.log("StudentResponse", response);
        dispatch({
          type: "studentList",
          payload: response?.data,
        });
      })
      .catch((err) => {});
  };

  // useEffect to fetch students from api through api
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
              <CustomButton
                text={"Add Student"}
                color="primary"
                onClick={handleBtnClick}
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
            open={openDrw}
            onClose={() => setOpenDrw((prev) => !prev)}
            drawerWidth={"30%"}
            title={"Add Student"}
          >
            <CustomInput
              label={"First Name"}
              size="small"
              maxLength={5}
              style={{ width: "100%" }}
            />
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
