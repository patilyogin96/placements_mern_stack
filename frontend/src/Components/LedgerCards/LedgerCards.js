import React from "react";
import styles from "./index.module.css";

const LedgerCards = ({ title, content, style, icon, ...props }) => {
  return (
    <div style={style} className={styles.cardMain}>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <img width="40px" src={icon} alt="icon" />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "22px" }}>
            <span> {content || "N.A"}</span>
          </div>
          <div style={{ color: "black" }}>{title}</div>
        </div>
      </div>
    </div>
  );
};

export default LedgerCards;
