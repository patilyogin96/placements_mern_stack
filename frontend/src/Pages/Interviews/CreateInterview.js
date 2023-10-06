import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import CustomDate from "../../Components/CustomDate/CustomDate";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { convertDate } from "../../Utils/helper";
import { api_token } from "../../Utils/Networks";
import useFetch from "../../Utils/Hooks";

const CreateInterview = ({ handleCloseDrawer, getAllInterviews }) => {
  // const { data, isLoading, error } = useFetch("api/v1/company/");

  const [interviewData, setInterviewData] = useState({
    title: "",
    company: "",
    interview_date: null,
  });
  const [companyListing, setCompanyListing] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInterviewData({
      ...interviewData,
      [name]: value,
    });
  };
  console.log("INterviewData", interviewData);

  const handleCreateInterview = () => {
    interviewData.interview_date = convertDate(interviewData.interview_date);
    console.log("Intgggg", interviewData);

    api_token
      .post(`api/v1/interview/create-interview`, interviewData)
      .then((response) => {
        getAllInterviews("", handleCloseDrawer);
        // handleCloseDrawer();
      })
      .catch((err) => {
        alert("Error");
      });
  };

  const getCompanyList = () => {
    // const { data, isLoading, error } = useFetch("api/v1/company/");
    api_token
      .get(`api/v1/company/`)
      .then((response) => {
        console.log("!!!", response);
        const { data } = response?.data;

        let modifiedData = data.map((c) => {
          return { _id: c?._id, title: c?.company_name };
        });

        setCompanyListing(modifiedData);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getCompanyList();
  }, []);

  return (
    <>
      <div className={styles.formContainer}>
        <div>
          <CustomInput
            name="title"
            label={"Interview Name"}
            size="small"
            maxLength={20}
            style={{ width: "100%" }}
            value={interviewData?.title}
            onChange={handleChange}
            // onChange={(e) =>
            //   dispatch({
            //     type: "field",
            //     fieldName: "first_name",
            //     payload: e.target.value,
            //   })
            // }
          />
        </div>
        <div>
          <CustomSelect
            title={"Company"}
            selectList={companyListing}
            name="company"
            value={interviewData?.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <CustomDate
            name="interview_date"
            // value={interviewData?.interview_date}
            handleChange={(newVal) => {
              setInterviewData({
                ...interviewData,
                interview_date: newVal,
              });
            }}
          />
        </div>
        <div className={styles.drwBtnFlex}>
          <CustomButton
            text={"Create Interview"}
            onClick={handleCreateInterview}
            type={"submit"}
          />
          <CustomButton onClick={handleCloseDrawer} text={"Cancel"} />
        </div>
      </div>
    </>
  );
};

export default CreateInterview;
