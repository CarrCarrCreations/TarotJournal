import React from "react";
import Form from "react-bootstrap/Form";
import styles from "./Input.module.css";

const Input = props => {
  return (
    <div>
      <Form.Group controlId={props.controlId} className={styles.Group}>
        <Form.Label className={styles.Label}>{props.label}</Form.Label>
        <Form.Control
          className={styles.Control}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.changed}
        />
      </Form.Group>
    </div>
  );
};

export default Input;
