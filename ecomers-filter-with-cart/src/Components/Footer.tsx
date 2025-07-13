import React from "react";
import styles from "./componenets.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <span>
        Copyright {new Date().getFullYear()} Suman Manna Corp. All rights
        reserved.
      </span>
    </div>
  );
}

export default Footer;
