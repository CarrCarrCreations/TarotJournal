import React from "react";
import Form from "react-bootstrap/Form";
import styles from "./Textarea.module.css";

const textarea = props => {
  return (
    <div>
      <Form.Group controlId={props.controlId}>
        <Form.Label className={styles.Label}>{props.label}</Form.Label>
        <Form.Control
          className={styles.Control}
          as={props.as}
          rows={props.rows}
          onChange={props.changed}
        />
      </Form.Group>
    </div>
  );
};

export default textarea;
