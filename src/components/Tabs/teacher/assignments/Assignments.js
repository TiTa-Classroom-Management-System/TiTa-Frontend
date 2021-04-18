import axios from "axios";
import React, { useState } from "react";
import { connect, useStore } from "react-redux";
import { useParams } from "react-router";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

import AssignmentList from "./AssignmentList";

import "./Assignments.css";

const Assignments = () => {
  const [assmodal, setAssmodal] = useState(false);
  const [assignment, setAssignment] = useState(null);
  const [assname, setAssname] = useState("");
  const [grps, setGrps] = useState([]);
  const [deadline, setDeadline] = useState(null);
  const [deadlinetime, setDeadlinetime] = useState(null);

  const classrooms = useStore().getState().classrooms;
  const params = useParams();

  const num_grps = classrooms.find((c) => c.classroom_id === params.id)
    .num_groups;
  const today = new Date();

  const toggleAssModal = () => {
    setAssmodal(!assmodal);
    setGrps([]);
    setAssignment(null);
  };

  const assSelect = (e) => {
    let file = e.target.files;
    if (file) {
      setAssignment(file);
    }
  };

  const handleCheck = (e) => {
    if (!grps.includes(e.target.value)) {
      setGrps([...grps, e.target.value]);
    }
  };

  const handleDateChange = (e) => {
    setDeadline(e.target.value);
  };
  const handleTimeChange = (e) => {
    setDeadlinetime(e.target.value);
    console.log(e.target.value);
  };

  const handleAssSubmit = async () => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/assignment/create`,
      data: {
        assignment_name: assname,
        assignment_file: assignment,
        assignment_groups: grps,
        classroom_id: params.id,
        creation_date: `${today.getDate()}-${
          today.getMonth() + 1
        }-${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`,
        submission_date: `${deadline.split("-")[0]}-${deadline.split("-")[1]}-${
          deadline.split("-")[2]
        } ${deadlinetime.split(":")[0]}:${deadlinetime.split(":")[1]}:00`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>
        <strong>Assignments</strong>
      </h2>
      <p>Create and view assignments.</p>

      <button id="Assignments__create-ass" onClick={toggleAssModal}>
        Create New Assignment
      </button>
      <Modal isOpen={assmodal} toggle={toggleAssModal}>
        <ModalHeader toggle={toggleAssModal}>Create Assignment</ModalHeader>
        <ModalBody>
          <div class="Assignment__file-upload">
            <label for="file-upload" id="Assignments__file-upload">
              Choose File to Upload
            </label>
            <input
              hidden
              id="file-upload"
              type="file"
              accept="application/pdf, .csv, application/msword, .odt, text/plain"
              onChange={assSelect}
            />
          </div>
          {assignment && assignment.length > 0 && (
            <p>File added: {assignment[0].name}</p>
          )}
          <hr />

          <Input
            placeholder="Name of the assignment"
            onChange={(e) => setAssname(e.target.value)}
          ></Input>
          <hr />

          <label for="Assignments__submit-date">
            Choose Submission Deadline
          </label>
          <div class="Assignments__submit-date-time row">
            <input
              class="col-lg-5"
              id="Assignments__submit-date"
              type="date"
              onChange={handleDateChange}
            />
            <input
              class="col-lg-5"
              id="Assignments__submit-time"
              type="time"
              onChange={handleTimeChange}
            />
          </div>
          <hr />

          {/* Add Group Numbers from State */}
          <h6>Choose Groups:</h6>
          <div className="row p-2">
            {Array.from(Array(num_grps).keys()).map((v) => (
              <>
                <button
                  className="Assignments__choose-group col-2 m-1"
                  value={v}
                  onClick={handleCheck}
                >
                  Group {v}
                </button>
              </>
            ))}
          </div>
          <p className="row m-2">
            Groups added:{" "}
            {grps.map((g) => (
              <li className="col-2">{g}</li>
            ))}
          </p>
          <button
            className="Assignments__choose-group clear-grp"
            onClick={() => setGrps([])}
          >
            Clear selection
          </button>
        </ModalBody>
        <ModalFooter>
          <Button className="Assignments__submit" onClick={handleAssSubmit}>
            Create and Upload
          </Button>{" "}
          <Button className="Assignments__submit" onClick={toggleAssModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <hr />
      <AssignmentList />
    </div>
  );
};

export default Assignments;
