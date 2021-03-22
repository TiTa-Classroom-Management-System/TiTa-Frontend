import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Input } from 'reactstrap';

import "./joinClassModal.css";

const JoinClassModal = ({ toggle, className, modal}) => {
//   const {
//     buttonLabel,
//     className
//   } = props;

  //const [modal, setModal] = useState(false);

  //const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className} >
        <ModalHeader toggle={toggle} close = {<i onClick = {toggle} class="fas fa-times-circle joinClassCloseModal"></i>}>Join A Classroom</ModalHeader>
        <ModalBody>
            <form>
                <Input placeholder="Enter Classroom Code" name="c_code"/>
                {/* You are about to join ----- classroom */}
                <hr/>
                <Input placeholder="Enter Your Group Number" name="g_num"/>
                {/* Give a list of group numbers to select from  */}
            </form>  
        </ModalBody>
        <ModalFooter id = "joinClassModalFooter">
                <Button id = "JoinClassButton">Join Class</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default JoinClassModal;