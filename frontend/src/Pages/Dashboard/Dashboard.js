import React from "react";
import styles from "./index.module.css";
import LedgerCards from "../../Components/LedgerCards/LedgerCards";
import CustomSearchFilter from "../../Components/CustomSearchFilter/CustomSearchFilter";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import { useState } from "react";
import CustomButton from "../../Components/CustomButton/CustomButton";

const Dashboard = () => {
  const [companyListing, setCompanyListing] = useState([]);
  return (
    <>
      <div className={styles.container}>
        <div style={{ position: "absolute", top: "-50px", left: "15px" }}>
          <div className={styles.titleStyle}>Transaction ledger</div>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          {/* ledger cards */}
          <LedgerCards
            title="Total Interviews Scheduled"
            style={{ backgroundColor: "#cadbf2", color: "#4C90ED" }}
            // icon={receive}
            // content={ledgerAnalytics.total_receivable}
          />
          <LedgerCards
            title="Total Students Selected"
            // icon={pay}
            style={{ backgroundColor: "#F7E3B7", color: "#FFB000" }}
            // content={ledgerAnalytics.total_payable}
          />
          <LedgerCards
            title="Not Selected"
            // icon={transaction}
            style={{ backgroundColor: "#F2D7D6", color: "#EC827D" }}
            // content={ledgerAnalytics.last_transaction}
          />
        </div>

        {/* tabs */}
        {/* <div style={{ marginTop: "10px" }}>
          <CustomTab
            tabHead={tabHead}
            handleCallBack={handleTableView}
            viewLogin={viewType}
          ></CustomTab>
        </div> */}

        <div className={styles.filterContainer}>
          <div>
            <CustomSearchFilter />
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
            <CustomButton text={"Export"} />
          </div>
        </div>

        {/* table starts here */}

        <div className={styles.tableContainer}></div>
      </div>
    </>
  );
};

export default Dashboard;
