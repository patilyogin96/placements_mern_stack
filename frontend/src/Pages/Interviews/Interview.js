import React, { useEffect } from "react";
import styles from "./index.module.css";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { useReducer } from "react";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
import { interviewReducer } from "./interviewReducer";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { Typography } from "@mui/material";
import { api_token } from "../../Utils/Networks";

const initialState = {
  data: [],
  openDrawer: false,
};
const Interview = () => {
  const [state, dispatch] = useReducer(interviewReducer, initialState);
  const { data, openDrawer } = state;

  const getAllInterviews = () => {
    api_token
      .get(`api/v1/interview/`)
      .then((response) => {
        if (response.status == 200) {
          let modifiedData = [];
          response?.data?.data.map((e, i) => {
            let modifiedObject = {
              interview_name: e?.title,
              interview_date: e?.interview_date,
              company_name: e?.company?.company_name,
            };

            modifiedData.push(modifiedObject);
          });

          dispatch({
            type: "interviewList",
            payload: modifiedData,
          });
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllInterviews();
  }, []);
  return (
    <>
      <div className={styles.container}>
        {/* header */}
        <div className={styles.headerBox}>
          <Typography variant="h5">All Interviews</Typography>
          <div>
            <div>
              {/* button to open add student drawer */}
              <CustomButton
                text={"Create Interview"}
                color="primary"
                // onClick={() =>
                //   dispatch({
                //     type: "openDrawer",
                //     fieldName: "openDrawer",
                //     payload: true,
                //   })
                // }
              />
            </div>
            <div>
              {/* button to open add student drawer */}
              {/* <CustomButton
                text={"Assign Interview"}
                color="primary"
                onClick={() =>
                  dispatch({
                    type: "openDrawer",
                    fieldName: "openDrawer",
                    payload: true,
                  })
                }
              /> */}
            </div>
          </div>
        </div>
        {/* search and other filters */}
        <div className={styles.filterBox}></div>
        {/* tables */}
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
            drawerWidth={30}
            title={"Add Student"}
          >
            "Add INterview"
          </CustomDrawer>
        </div>
      </div>
    </>
  );
};

export default Interview;

const columns = [
  { id: "interview_name", label: "Interview Name" },
  { id: "company_name", label: "Company" },
  { id: "interview_date", label: "Date" },

  // Add more columns as needed
];
