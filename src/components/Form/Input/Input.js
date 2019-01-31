import React from "react";
import Form from "react-bootstrap/Form";

const Input = props => {
  return (
    <div>
      <Form.Group controlId={props.controlId}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
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
