import React, {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Collapse, CardBody, Card, CardHeader} from 'reactstrap';

import "./Resources.css";

const ResourceList = () =>
{
    const params=useParams();

    const [resources, setResources]=useState([]);
    const [toggleQuestion, setToggequestion] = useState();

    const loadResources=()=>
    {
        axios(
            {
                method: "GET",
                url: `${process.env.REACT_APP_API}/teachers/resource/${params.id}`
            }
        )
        .then((res) =>
        {
            setResources(res.data);
            console.log(res.data);
        })
        .catch((err) =>
        {
            console.log(err);
        })
    }

    useEffect(()=>
    {
        loadResources();
    },[])

    const parseDates = (date) =>
    {
        const this_date = date.split("T")[0];
        const this_time = date.split("T")[1];
        return `${this_date.split("-")[2]}-${this_date.split("-")[1]}-${this_date.split("-")[0]} ${this_time.slice(0, 5)}`;
    }


    return(
        <div className="ResourceList_list">
             {/* <div id="ResourceList__header" className="row">
                 <div className="col-lg-3"><h5>Resource Name</h5></div>
                 <div className="col-lg-3"><h5>Uploaded At</h5></div>
                 <div className="col-lg-3"><h5>Description</h5></div>
                 <div className="col-lg-3"><h5>Resource Link</h5></div>
             </div
             {(resources && resources.length>0) ? (resources.map((r)=>(
                 <div className="ResourceList_object row">
                     <div className="col-lg-3">{r.name}</div>
                     <div className="col-lg-3">{parseDates(r.uploaded_at)}</div>
                     <div className="col-lg-3">{r.description}</div>
                     <div className="col-lg-3"><a href={r.link} target="_blank" rel="noreferrer"><button className="Resources__view-resource">View Resource</button></a></div>
              
                 </div>
             ))):(
                 <>
                     <hr/>
                     <p className="text-center">Sorry, you haven't created any Resources for this class yet.</p>
                 </>
             )} */}
             {(resources && resources.length>0) ? (resources.map((r)=>(
                <Card className="Resources_Card">
                <CardHeader className="Resources_CardHeader" onClick={() => {r.id===toggleQuestion ? setToggequestion():setToggequestion(r.id)} }>
                    <div className="font-weight-bold Resources_Name">{r.name}</div>                        
                    <div className="Resources_Date">{parseDates(r.uploaded_at)}</div>
                </CardHeader>
                <Collapse  isOpen={toggleQuestion === r.id ? true : false}>
                    <CardBody>
                        <div className="Resources_Description">{r.description}</div>
                        <div class="Resources_Link"><a href={r.link} target="_blank" rel="noreferrer"><button className="Resources__view-resource">View Resource</button></a></div>  
                    </CardBody>
                </Collapse>
            </Card>
                 
             ))):(
                 <>
                     <hr/>
                     <p className="text-center">Sorry, you haven't created any Resources for this class yet.</p>
                 </>
             )}
            <hr/>
        </div>
        
    )
}

export default ResourceList;
