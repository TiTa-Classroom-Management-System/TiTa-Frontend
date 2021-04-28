import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

import "./Assignments.css";
import TiTa_Load from "./TiTa_Load.gif";

const AssignmentUpload = ({ assign, loadAssignments }) =>
{
    const { user } = useSelector((state) => ({ ...state }));
    const [assmodal, setAssmodal] = useState(false);
    const [assignment, setAssignment] = useState(null);
    const [uploaded, setUpload] = useState(false);
    const [solution, setSolution] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const submitted_at = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

    const form=() => {
        let formData = new FormData();
        formData.append("file", assignment ? assignment[0] : "");
        formData.append("assignment_id", assign.assignment_id);
        formData.append("classroom_id", params.id);
        formData.append("submitted_at", submitted_at);
        formData.append("email", user.email);
        
        return formData;
    }

    
    const handleAssSubmit = async () =>
    {
        setLoading(true);
        await axios(
            {
                method: "POST",
                url: `${process.env.REACT_APP_API}/students/assignment/upload`,
                data: form(),
            }
        )
        .then((res) =>
        {
            setLoading(false);
            setUpload(!uploaded);
            setSolution(res.data.assignment_link);
            toggleAssModal();
        })
        .catch((err) =>
        {
            setLoading(false);
            console.log(err);
        })
        loadAssignments(user);
    }

    return (
        <>
            {!uploaded ? (
            <div className = "col-lg-3">
                <button id = "Assignments__upload-ass" onClick={toggleAssModal}>Upload</button>
                <Modal isOpen={assmodal} toggle={toggleAssModal}>
                    {!loading ? (
                        <form onSubmit={handleAssSubmit}>
                            <ModalHeader toggle={toggleAssModal}>Upload Assignment</ModalHeader>
                            <ModalBody>
                                <div class = "Assignment__file-upload">
                                    <label for = "file-upload" id = "Assignments__file-upload">Choose File to Upload</label>
                                    <input hidden id = "file-upload" type = "file" accept = "application/pdf, .csv, application/msword, .odt, text/plain" onChange = {assSelect} required/>
                                </div>
                                {assignment && assignment.length > 0 && (
                                    <p>File added: {assignment[0].name}</p>
                                )}
                                <hr />
                            </ModalBody>
                            <ModalFooter>
                                <Button className = "Assignments__submit" disabled={!assignment}>Upload</Button>{' '}
                                <Button className = "Assignments__submit" onClick={toggleAssModal}>Cancel</Button>
                            </ModalFooter>
                        </form>
                        ) : (
                            <ModalBody>
                                <div className = "Assignments__loading">
                                    <img className = "tita-load" src = {TiTa_Load} alt = "tita-logo" />
                                    <h5>Uploading Solution...</h5>
                                </div>
                            </ModalBody>
                        )}
                </Modal>
            </div>
            ) : 
            solution && (<><a href={solution} target="_blank" rel = "noreferrer"><button id = "Assignments__view-ass" ></button></a></>)
            }
        </>
    )
}

export default AssignmentUpload;