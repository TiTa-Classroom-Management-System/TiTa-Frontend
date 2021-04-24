import axios from "axios";
import React, { useState } from "react";
import { useStore } from "react-redux";
import { useParams } from "react-router";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
} from "reactstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import ResourceList from "./ResourceList";
import "./Resources.css";

import logo from "../../../Navbar/logo.png";

const Resources=()=>{
    const [resmodal,setResmodal]=useState(false);
    const [resource,setResource]=useState(null);
    const [resname,setResname]=useState("");
    const [resdesc,setResDesc]=useState("");
    const [grps,setGrps]=useState([]);
    const [loading,setLoading]=useState(false);

    const classrooms=useStore().getState().classrooms;
    const params=useParams();

    const animatedComponents=makeAnimated();
    const num_grps=classrooms.find((c) => c.classroom_id === params.id).num_groups;
    const today=new Date();
    const options=[];
    Array.from(Array(num_grps).keys()).forEach((v) =>
    {
        options.push({ value: v + 1, label: `Group ${v + 1}` });
    }) 

    const toggleResModal = () => {
        setResmodal(!resmodal);
        setGrps([]);
    };

    const resSelect = (e) => {
        let file = e.target.files;
        if (file) {
          setResource(file);
        }
      };

    const createFormData = () =>
    {
        let formData = new FormData();
        formData.append("file", resource[0]);
        formData.append("resource_name", resname);
        formData.append("subGroups", grps);
        formData.append("description", resdesc)
        formData.append("classroom_id", params.id);
        formData.append("uploaded_at",`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`)
        return formData;
    }

    const handleResSubmit = () =>
    {
        setLoading(true);
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/resource/create`,
            data: createFormData()
        })
        .then((res) => {
            setLoading(false);
            setResource(null);
            console.log(res);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        });
    }

    return (
        <div>
            <h2>
                <strong>Resources</strong>
            </h2>
            <p>Create and view resources.</p>
    
            <button id="Resources__create-res" onClick={toggleResModal}>
                Create New Resource
            </button>
            <Modal isOpen={resmodal} toggle={toggleResModal}>
                {!loading ? (
                    <>
                        <ModalHeader toggle={toggleResModal}>Create Resource</ModalHeader>
                        <ModalBody>
                            <div class="Resource__file-upload">
                                <label for="file-upload" id="Resources__file-upload">
                                    Choose File to Upload
                                </label>
                                <input
                                    hidden
                                    id="file-upload"
                                    type="file"
                                    accept="application/pdf, .csv, application/msword, .odt, text/plain"
                                    onChange={resSelect}
                                />
                            </div>
                            {resource && resource.length > 0 && (
                                <p>File added: {resource[0].name}</p>
                            )}
                            <hr />    
                            <Input
                                placeholder="Name of the resource"
                                onChange={(e) => setResname(e.target.value)}
                            ></Input>
                            <hr />     
                            <Input type="textarea" name="desc" id="desc" placeholder="Enter Description" onChange={(e)=>setResDesc(e.target.value)}/>
                            <hr/>
                            {/* Add Group Numbers from State */}
                            <h6>Choose Groups:</h6>
                            <Select
                                isMulti
                                options = {options}
                                className = "basic-multi-select"
                                classNamePrefix = "select"
                                components = {animatedComponents}
                                onChange = {(selectedValues) =>
                                {
                                setGrps(selectedValues.map((value) => (value.value)));
                                }}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button className="Resources__submit" onClick={handleResSubmit}>
                                Create and Upload
                                </Button>{" "}
                            <Button className="Resources__submit" onClick={toggleResModal}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </>
                ) : (
                    <ModalBody>
                        <div className = "Resources__loading">
                            <img className = "logo-image2" src = {logo} alt = "tita-logo" />
                            <h5>Uploading resource...</h5>
                        </div>
                    </ModalBody>
                )}
            </Modal>
            <hr />
            <ResourceList/>
        </div>
      );
}

export default Resources;