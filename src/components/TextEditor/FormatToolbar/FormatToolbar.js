import React from "react";
import styles from "./FormatToolbar.module.css";

const FormatToolbar = props => {
  return <div className={styles.formatToolbar}>{props.children}</div>;
};

export default FormatToolbar;
