import React, {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";

import "./Resources.css";

const ResourceList = () =>
{
    const params=useParams();

    const [resources, setResources]=useState([]);

    const loadResources=()=>
    {
        console.log('aa')
    }

    useEffect(()=>
    {
        loadResources();
    },[])


    return(
        <div className="ResourceList_list">
            <div id="ResourceList__header" className="row">
                <div className="col-lg-6"><h5>Resource Name</h5></div>
                <div className="col-lg-6"><h5>Resource Link</h5></div>
            </div>

            {(resources && resources.length>0) ? (resources.map((r)=>(
                <div className="ResourceList_object row">
                    <div className="col-lg-6">{r.resource_name}</div>
                    <div className="col-lg-6"><a href={r.resource_link} target="_blank" rel="noreferrer"><button className="Resources__view-resource">View Resource</button></a></div>
                </div>
            ))):(
                <>
                    <hr/>
                    <p className="text-center">Sorry, you haven't created any Resources for this class yet.</p>
                </>
            )}
        </div>
    )
}

export default ResourceList;
