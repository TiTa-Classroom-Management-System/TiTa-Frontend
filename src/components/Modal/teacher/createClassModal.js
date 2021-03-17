import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { InputGroup, Input } from 'reactstrap';

import "./createClassModal.css";

const ClassModal = ({ toggle, className, modal, values, setValues, handleSubmit, handleChange, branches }) => {

    return (
        <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
        <form onSubmit = {handleSubmit}>
            <ModalHeader toggle={toggle} close = {<i onClick = {toggle} class="fas fa-times-circle createClass__close-modal"></i>}>Create a new Classroom</ModalHeader>
            <ModalBody>
                <InputGroup>
                    <Input 
                        placeholder = "Branch Year" 
                        id = "createClass__branch-year" 
                        value = {values.branchYear} 
                        name = "branchYear" 
                        onChange = {handleChange} />
                        <select name = "branchName" className = "createClass__drop-down" onChange = {handleChange}>
                            <option>Select Branch Name</option>
                            {branches.map((b) => (
                                <option key = {b[1]} value = {b[1]}>{b[0]}</option>
                            ))}
                        </select>
                </InputGroup>
                <hr />
                <InputGroup>
                    <Input 
                        placeholder = "Subject Name" 
                        value = {values.subjectName} 
                        name = "subjectName" 
                        onChange = {handleChange} />
                    <Input 
                        placeholder = "Subject Code" 
                        value = {values.subjectCode} 
                        name = "subjectCode" 
                        onChange = {handleChange} />
                </InputGroup>
                <hr />
                <InputGroup>
                    <Input 
                        placeholder = "Number of Sub-Groups" 
                        value = {values.subGroups} 
                        name = "subGroups" 
                        onChange = {handleChange} />
                </InputGroup>
            </ModalBody>
            <ModalFooter id = "createClass__modal-footer">
                <Button color="primary" id = "createClass__create">Submit</Button>
            </ModalFooter>
            </form>

            {/* Add Loading here */}

        </Modal>
        </div>
    );
}

export default ClassModal;