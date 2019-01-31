import React from "react";
import Form from "react-bootstrap/Form";

const textarea = props => {
  return (
    <div>
      <Form.Group controlId={props.controlId}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control as={props.as} rows={props.rows} />
      </Form.Group>
    </div>
  );
};

export default textarea;
