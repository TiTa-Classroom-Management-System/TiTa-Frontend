import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Input } from 'reactstrap';

import "./joinClassModal.css";

const JoinClassModal = ({ toggle,code,setCode,classroom,setClassroom,handleChange,handleCodeSubmit,handleJoin,handleSelect,className, modal,setGrp}) => {
 

  return (
    <div className = "joinClassModal">
      <Modal isOpen={modal} toggle={toggle} className={className} >
      <form onSubmit={!classroom ? handleCodeSubmit : handleJoin}>
        <ModalHeader toggle={toggle} close = {<i onClick = {toggle} class="fas fa-times-circle joinClassCloseModal"></i>}>Join A Classroom</ModalHeader>
        <ModalBody className = "joinClassModal__modal-body">
                {!classroom ? <Input placeholder="Enter Classroom Code" name="c_code" value={code} onChange={handleChange} required minLength={8} maxLength={8}/> : 
                <>
                  <h4>You are about to join:</h4>
                  <div className = "joinClassModal__modal-body-course-info">
                    <h5>Course Name:<span className = "joinClassModal__value">{classroom.split('+')[0]}</span></h5>
                    <h5>Course Code:<span className = "joinClassModal__value">{classroom.split('+')[1]}</span></h5>
                    <h5>Branch Name:<span className = "joinClassModal__value">{classroom.split('+')[2]}</span></h5>
                    <h5>Branch Year:<span className = "joinClassModal__value">{classroom.split('+')[3]}</span></h5>
                  </div>
                  <hr/>
                  <div className = "joinClassModal__modal-body-select-group">
                    <select name = "group_num" className = "group_num__drop-down" onChange = {handleSelect} required>
                        <option value="">Select Group Number</option>
                        {([...Array(parseInt(classroom.split('+')[4])+1).keys()].slice(1)).map((o) => (
                          <option key = {o} value={o}>{`Group ${o}`}</option>
                        ))}
                    </select>
                  </div>
                </>
                }
            
        </ModalBody>
        <ModalFooter id = "joinClassModalFooter">
                {classroom ? <Button id = "JoinClassButton" >Join Class</Button> : <Button id = "JoinClassButton" >Get Classroom</Button>}
        </ModalFooter>
        </form>  
      </Modal>
    </div>
  );
}
export default JoinClassModal;