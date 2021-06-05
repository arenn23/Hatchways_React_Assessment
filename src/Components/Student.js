import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import "../Student.css";

function Student(props) {
  let [expand, setExpand] = useState(false);
  let [tag, setTag] = useState();
  let [update, setUpdate] = useState(0);

  function handleClick() {
    if (expand === false) {
      setExpand(true);
    } else {
      setExpand(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.updateTag(tag, props.index);
    setUpdate(update + 1);
    document.getElementById("tagForm").reset();
  }

  function handleChange(e) {
    setTag(e.target.value);
  }

  const reducer = (accumulator, currentValue) =>
    parseInt(accumulator, 10) + parseInt(currentValue, 10);

  return (
    <Card style={{ width: "500px" }}>
      <div className="card-img" style={{ flex: "0.33" }}>
        <img variant="left" src={props.student.pic} alt="student pic" />
      </div>
      <div style={{ flex: "1", marginLeft: "100px" }}>
        <h2>
          {props.student.firstName} {props.student.lastName}
        </h2>
        <p>Email: {props.student.email}</p>
        <p>Company: {props.student.company}</p>
        <p>Skill: {props.student.skill}</p>
        <p>
          Average:{" "}
          {props.student.grades.reduce(reducer) / props.student.grades.length}%
        </p>
        {props.student.tags && props.student.tags.length > 0 ? (
          <div className="tag-container">
            {props.student.tags.map((tag, index) => (
              <p key={index} className="tag">
                {tag}
              </p>
            ))}
          </div>
        ) : null}
        <Form id="tagForm" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              plaintext
              type="text"
              placeholder="Add Tag"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        <div style={{ display: !expand ? "none" : "block" }}>
          <p>Test 1: {props.student.grades[0]}</p>
          <p>Test 2: {props.student.grades[1]}</p>
          <p>Test 3: {props.student.grades[2]}</p>
          <p>Test 4: {props.student.grades[3]}</p>
          <p>Test 5: {props.student.grades[4]}</p>
          <p>Test 6: {props.student.grades[5]}</p>
          <p>Test 7: {props.student.grades[6]}</p>
          <p>Test 8: {props.student.grades[7]}</p>
        </div>
      </div>
      <div>
        <Icon
          style={{
            marginTop: "20px",
            marginRight: "20px",
            display: !expand ? "block" : "none",
          }}
          name="plus"
          size="large"
          onClick={handleClick}
        />
        <Icon
          style={{
            marginTop: "20px",
            marginRight: "20px",
            display: expand ? "block" : "none",
          }}
          name="minus"
          size="large"
          onClick={handleClick}
        />
      </div>
    </Card>
  );
}

export default Student;
