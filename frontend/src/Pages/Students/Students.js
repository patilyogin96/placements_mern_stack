import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { studentsReducer } from "./studentsReducer";
import { api_token } from "../../Utils/Networks";
import { useReducer } from "react";
import CustomDrawer from "../../Components/CustomDrawer/CustomDrawer";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import CustomSearchFilter from "../../Components/CustomSearchFilter/CustomSearchFilter";

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
  selectListData: {
    interviewList: [],
    studentList: [],
    selectedInterviews: [],
    selectedStudents: [],
  },

  openDrawer: false,
  buttonSelection: null, //1 for add student , 2 for assign interview
};

const Students = () => {
  const [state, dispatch] = useReducer(studentsReducer, initialState);
  const { data, openDrawer, createStudent, buttonSelection, selectListData } =
    state;
  const { interviewList, studentList, selectedStudents, selectedInterviews } =
    selectListData;

  const [companyListing, setCompanyListing] = useState([]);
  console.log("StateMain", selectedStudents, selectedInterviews);
  const [filterData, setFilterData] = useState({
    q: "",
    company: "",
    status: "",
  });

  const handleAssignInterview = (e) => {
    e.preventDefault();

    let data = {
      student: selectedStudents[0],
      interview: selectedInterviews[0],
      company: "6481474d465ad71f947edc0b", //hardcoded
    };
    api_token
      .post(`api/v1/interview/assign-interview`, data)
      .then((response) => {
        console.log("AssignRespnse", response);
      })
      .catch((err) => {});
  };

  const submitCreateStudentForm = (e) => {
    e.preventDefault();
    api_token
      .post(
        `http://localhost:8000/api/v1/student/create-student`,
        createStudent
      )
      .then((response) => {
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

  const assignInterviewForm = () => {
    return (
      <>
        <form onSubmit={handleAssignInterview}>
          <div className={styles.formContainer}>
            {/* <div>
              <CustomSelect title="Select Company" />
            </div> */}
            <div>
              <CustomSelect
                title="Select Interview"
                selectList={interviewList}
                onChange={(e) =>
                  dispatch({
                    type: "selectFromListing",
                    fieldName: "interview",
                    payload: e.target.value,
                  })
                }
                listName={selectedInterviews}
              />
            </div>
            <div>
              <CustomSelect
                title="Select Student"
                selectList={studentList}
                onChange={(e) =>
                  dispatch({
                    type: "selectFromListing",
                    fieldName: "student",
                    payload: e.target.value,
                  })
                }
                listName={selectedStudents}
              />
            </div>

            <div>
              <CustomButton type="submit" text="Assign" />
            </div>
          </div>
        </form>
      </>
    );
  };

  // create student form
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

  // fetch students from api through function
  const getAllStudents = (query) => {
    api_token
      .get(`api/v1/student/`, { params: { ...query } })
      .then((response) => {
        let modifiedList = [];
        let modifiedListForTable = [];
        response?.data?.data?.map((e, i) => {
          let modifiedObj = {
            title: e?.first_name + " " + e?.last_name,
            _id: e?._id,
          };
          let modifiedTableObj = {
            name: e?.first_name + " " + e?.last_name,
            phone: e?.phone,
            email: e?.email,
            assigned_interview:
              e?.interview_details.length !== 0 ? "true" : "false",
            _id: e?._id,
            placement_status:
              e?.placement_status?.results == 0
                ? "Not Assigned"
                : place_status[e?.placement_status?.results - 1],
          };
          modifiedList.push(modifiedObj);
          modifiedListForTable.push(modifiedTableObj);
        });

        dispatch({
          type: "setSelectLists",
          fieldName: "student",
          payload: modifiedList,
        });

        dispatch({
          type: "studentList",
          payload: modifiedListForTable,
        });
      })
      .catch((err) => {});
  };

  const handleDownloadExel = () => {
    api_token
      .get(`api/v1/student/download-report`)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log("ResDDDD", url);
        window.open(url, "_blank");
      })
      .catch((err) => {});
  };

  // api function calls
  const getInterviewList = () => {
    api_token
      .get(`api/v1/interview/`)
      .then((response) => {
        dispatch({
          type: "setSelectLists",
          payload: response.data.data,
        });
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      let obj = filterData;

      getAllStudents(obj);
    }, 600);

    return () => clearTimeout(timeOut);
  }, [filterData?.q]);

  // useEffect
  useEffect(() => {
    getInterviewList();
  }, []);
  return (
    <>
      <div className={styles.container}>
        {/* header */}
        <div className={styles.headerBox}>
          <div>All Students</div>
          <div className={styles.drwBtnFlex}>
            <div>
              {/* button to open add student drawer */}
              <CustomButton
                text={"Add Student"}
                color="primary"
                onClick={() => {
                  dispatch({
                    type: "openDrawer",
                    fieldName: "openDrawer",
                    payload: true,
                  });
                  dispatch({
                    type: "buttonType",
                    fieldName: "buttonSelection",
                    payload: 1,
                  });
                }}
              />
            </div>
            <div>
              {/* button to open assign interview to student */}
              <CustomButton
                text={"Assign Interview"}
                color="primary"
                onClick={() => {
                  dispatch({
                    type: "openDrawer",
                    fieldName: "openDrawer",
                    payload: true,
                  });
                  dispatch({
                    type: "buttonType",
                    fieldName: "buttonSelection",
                    payload: 2,
                  });
                }}
              />
            </div>
          </div>
        </div>
        {/* search and other filters */}
        <div className={styles.filterContainer}>
          <div>
            <CustomSearchFilter
              value={filterData?.q}
              onChange={(v) =>
                setFilterData({
                  ...filterData,
                  q: v,
                })
              }
            />
          </div>

          <div>
            <CustomSelect
              title={"Company"}
              selectList={companyListing}
              name="company"
              // value={interviewData?.company}
              // onChange={handleChange}
            />
          </div>
          <div>
            <CustomSelect
              title={"Status"}
              selectList={companyListing}
              name="company"
              // value={interviewData?.company}
              // onChange={handleChange}
            />
          </div>
          <div>
            <CustomButton onClick={handleDownloadExel} text={"Export"} />
          </div>
        </div>
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
            title={buttonSelection === 1 ? "Add Student" : "Assign Interview"}
          >
            {buttonSelection === 1 && createStudentForm()}
            {buttonSelection === 2 && assignInterviewForm()}
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
  { id: "assigned_interview", label: "Interview Assigned" },
  { id: "placement_status", label: "Placement Status" },
  { id: "actions", label: "Actions" },
  // Add more columns as needed
];

const place_status = ["Placed", "Not Placed", "On Hold"];
