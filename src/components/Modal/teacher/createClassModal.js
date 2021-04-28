import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { InputGroup, Input } from 'reactstrap';

import "./createClassModal.css";

const ClassModal = ({ code,setCode,toggle, className, modal, values, setValues, handleSubmit, handleChange, branches }) => {

    const [clipboard, setClipboard] = useState(`Copy to Clipboard.`);
    const [cbicon, setCbicon] = useState(`fas fa-clipboard`);
    const copy = () => 
    {
        const ele = document.getElementById("createClassModal__created-classroom-code").innerHTML;
        navigator.clipboard.writeText(ele)
        .then(() =>
        {
            setClipboard(`Copied to Clipboard.`);
            setCbicon(`fas fa-clipboard-check`);
        })
        .catch((err) =>
        {
            console.log(`Couldn't copy.`);
        });
    }

    return (
        <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
        {!code && <form  className="FillDetail" onSubmit = {handleSubmit} >
            <ModalHeader toggle={toggle} close = {<i onClick = {toggle} class="fas fa-times-circle createClass__close-modal"></i>}>Create a new Classroom</ModalHeader>
            <ModalBody>
                <InputGroup>
                    <Input 
                        placeholder = "Branch Year" 
                        id = "createClass__branch-year" 
                        value = {values.branchYear} 
                        name = "branchYear" 
                        onChange = {handleChange} 
                        required
                        />
                        <select name = "branchName" className = "createClass__drop-down" onChange = {handleChange} required>
                            <option value="">Select Branch Name</option>
                            {branches.map((b) => (
                                <option key = {b} value = {b}>{b}</option>
                            ))}
                        </select>
                </InputGroup>
                <hr />
                <InputGroup>
                    <Input 
                        placeholder = "Subject Name" 
                        value = {values.subjectName} 
                        name = "subjectName" 
                        onChange = {handleChange} 
                        required
                        />
                    <Input 
                        placeholder = "Subject Code" 
                        value = {values.subjectCode} 
                        name = "subjectCode" 
                        onChange = {handleChange} 
                        required
                        />
                </InputGroup>
                <hr />
                <InputGroup>
                    <Input 
                        placeholder = "Number of Sub-Groups" 
                        value = {values.subGroups} 
                        name = "subGroups" 
                        onChange = {handleChange} 
                        type= "number"
                        min= "0"
                        step="1"
                        required
                        />
                </InputGroup>
            </ModalBody>
            <ModalFooter id = "createClass__modal-footer">
                <Button color="primary" id = "createClass__create">Submit</Button>
            </ModalFooter>
            </form>
        }
        {
            code && 
            <>
            <ModalHeader toggle={toggle} close = {<i onClick ={toggle} class="fas fa-times-circle createClass__close-modal"></i>}>Classroom Created</ModalHeader>
            <ModalBody>
                <hr />
                <h3>Classroom code: <strong id = "createClassModal__created-classroom-code">{code}</strong></h3>
                <Button id = "copyToClipboard" onClick={copy}>{clipboard} <i class = {cbicon}></i></Button>
                <hr />
            </ModalBody>
            <ModalFooter id = "createClass__modal-footer">
                <Link to={`/teachers/classrooms/${code}`}>Go to Created Classroom</Link>
            </ModalFooter>
            </>
        }
            {/* Add Loading here */}
            

        </Modal>
        </div>
    );
}

export default ClassModal;