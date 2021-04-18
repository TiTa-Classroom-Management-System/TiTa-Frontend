import axios from "axios";
import React, { useState } from "react";
import { connect, useStore } from "react-redux";
import { useParams } from "react-router";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";

import "./Assignments.css";

const AssignmentUpload = () =>
{
    const [assmodal, setAssmodal] = useState(false);
    const [assignment, setAssignment] = useState(null);

    const params = useParams();
    const today = new Date();

    const toggleAssModal = () =>
    {
        setAssmodal(!assmodal);
        setAssignment(null);
    }

    const assSelect = (e) =>
    {
        let file = e.target.files;
        if(file)
        {
            setAssignment(file);
        }
    }

    const handleAssSubmit = async () =>
    {
        // await axios(
        //     {
        //         method: "POST",
        //         url: `${process.env.REACT_APP_API}/students/assignment/upload`,
        //         data: {
        //             assignment_file: assignment,
        //             subclass_id: params.id,
        //             submitted_at: `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`,   
                    
        //         }
        //     }
        // )
        // .then((res) =>
        // {
        //     console.log(res);
        // })
        // .catch((err) =>
        // {
        //     console.log(err);
        // })
    }

    return (
        <div>
            <button id = "Assignments__upload-ass" onClick={toggleAssModal}>Upload</button>
            <Modal isOpen={assmodal} toggle={toggleAssModal}>
                <ModalHeader toggle={toggleAssModal}>Upload Assignment</ModalHeader>
                <ModalBody>
                    <div class = "Assignment__file-upload">
                        <label for = "file-upload" id = "Assignments__file-upload">Choose File to Upload</label>
                        <input hidden id = "file-upload" type = "file" accept = "application/pdf, .csv, application/msword, .odt, text/plain" onChange = {assSelect} />
                    </div>
                    {assignment && assignment.length > 0 && (
                        <p>File added: {assignment[0].name}</p>
                    )}
                    <hr />
                </ModalBody>
                <ModalFooter>
                    <Button className = "Assignments__submit" onClick={handleAssSubmit}>Upload</Button>{' '}
                    <Button className = "Assignments__submit" onClick={toggleAssModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AssignmentUpload;