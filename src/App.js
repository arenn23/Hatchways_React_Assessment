import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import Student from "../src/Components/Student";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  //Creating 4 state variables to track API data, filtered name data, tag name data, and overall filtered data.
  const [hatchwayData, setHatchwayData] = useState([]);
  const [filteredNameData, setFilteredNameData] = useState([]);
  const [filteredTagData, setFilteredTagData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  //API call
  async function retrieveData() {
    const { data } = await axios.get(
      "https://www.hatchways.io/api/assessment/students"
    );
    return data;
  }

  //Takes data from API call and updates state.
  async function createStudents() {
    let data = await retrieveData();
    let studentData = data.students;
    let newStudents = [];
    studentData.map((student) => {
      let addTag = student;
      addTag.tags = [];
      newStudents.push(addTag);
    });

    setHatchwayData(newStudents);
    setFilteredNameData(newStudents);
    setFilteredTagData(newStudents);
    setFilteredData(newStudents);
  }

  //Called when component does mount. Starts API call and updates state.
  useEffect(() => {
    createStudents();
  }, []);

  //Fires when someone filters by name.
  function handleChangeName(event) {
    let newNameFilter = [];
    hatchwayData.map((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      if (fullName.includes(event.target.value)) {
        newNameFilter.push(student);
      }
    });
    let contentFilter = [];
    filteredTagData.map((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      if (fullName.includes(event.target.value)) {
        contentFilter.push(student);
      }
    });
    setFilteredData(contentFilter);
    setFilteredNameData(newNameFilter);
  }

  //Fires when someone searches by tag
  function handleChangeTag(event) {
    if (event.target.value) {
      let newTagFilter = [];
      let newContentFilter = [];
      hatchwayData.map((student) => {
        let tagged = false;
        student.tags.map((tag) => {
          if (tag.includes(event.target.value)) {
            tagged = true;
          }
        });
        if (tagged) {
          newTagFilter.push(student);
        }
      });
      filteredData.map((student) => {
        let tagged = false;
        student.tags.map((tag) => {
          if (tag.includes(event.target.value)) {
            tagged = true;
          }
        });
        if (tagged) {
          newContentFilter.push(student);
        }
      });
      setFilteredData(newContentFilter);
      setFilteredTagData(newTagFilter);
    } else {
      setFilteredData(filteredNameData);
      setFilteredTagData(hatchwayData);
    }
  }

  //Add a tag to a students object.
  function updateTag(tag, index) {
    const tagForStudent = [...hatchwayData];
    tagForStudent[index].tags.push(tag);
    setHatchwayData(tagForStudent);
  }

  //Ensures data has loaded before rendering.
  if (hatchwayData === undefined || filteredData === undefined) {
    return <h1>Data is loading</h1>;
  } else {
    return (
      <div
        style={{
          alignItems: "center",
          height: "500px",
          overflowY: "scroll",
          marginTop: "75px",
        }}
      >
        <Form style={{ width: "500px", margin: "auto" }}>
          <Form.Group>
            <Form.Control
              type="text"
              onChange={handleChangeName}
              placeholder="Search by Name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              onChange={handleChangeTag}
              placeholder="Search by Tag"
            />
          </Form.Group>
        </Form>
        {/* Utilizing JavaScript map function to iterate through an array of object to 
      display them.  */}

        {filteredData.map((student, index) => (
          <Student
            key={index}
            index={index}
            student={student}
            updateTag={updateTag}
          />
        ))}
      </div>
    );
  }
}

export default App;
