import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Input } from 'reactstrap';

import "./joinClassModal.css";

const JoinClassModal = ({ toggle,code,setCode,classroom,setClassroom,handleChange,handleCodeSubmit,handleJoin,className, modal,setGrp}) => {
//   const {
//     buttonLabel,
//     className
//   } = props;

  //const [modal, setModal] = useState(false);

  //const toggle = () => setModal(!modal); 

  // const card = [];
  // _.times(parseInt(classroom.split('+')[3]), () => {
  //   card.push(<span className="busterCards">♦</span>);
  // });

  const handleSelect = (e) =>
  {
    console.log(e.target.value);
    setGrp(e.target.value);
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className} >
      <form onSubmit={!classroom ? handleCodeSubmit : handleJoin}>
        <ModalHeader toggle={toggle} close = {<i onClick = {toggle} class="fas fa-times-circle joinClassCloseModal"></i>}>Join A Classroom</ModalHeader>
        <ModalBody>
            
                
                {/* You are about to join ----- classroom */}
                {!classroom ? <Input placeholder="Enter Classroom Code" name="c_code" value={code} onChange={handleChange} /> : 
                <>
                  <h4>You are about to join:</h4>
                  <h3>Course Name:{classroom.split('+')[0]}</h3>
                  <h3>Course Code:{classroom.split('+')[1]}</h3>
                  <h3>Branch Name:{classroom.split('+')[2]}</h3>
                  <h3>Branch Year:{classroom.split('+')[3]}</h3>
                  <select name = "goup_num" className = "group_num__drop-down" onChange = {handleChange} onSelect = {handleSelect}>
                      <option>Select Group Number</option>
                      {([...Array(parseInt(classroom.split('+')[4])+1).keys()].slice(1)).map((o) => (
                        <option key = {o} value={o}>{`Group ${o}`}</option>
                      ))}
                  </select>
                </>
                }
                {classroom && <hr/>}
                
                {/* Give a list of group numbers to select from  */}
            
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