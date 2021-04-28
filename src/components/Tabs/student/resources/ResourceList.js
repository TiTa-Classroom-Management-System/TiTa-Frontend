import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import { useParams } from "react-router";
import { Collapse, CardBody, Card, CardHeader} from 'reactstrap';

import "./Resources.css";

const ResourceList = () =>
{
    const { user } = useSelector((state) => ({ ...state }));
    const params=useParams();

    const [resources, setResources]=useState([]);
    const [toggleQuestion, setToggequestion] = useState();

    const loadResources=(user)=>
    {
        axios(
            {
                method: "GET",
                url: `${process.env.REACT_APP_API}/students/resource/${user.email}/${params.id}`
            }
        )
        .then((res) =>
        {
            setResources(res.data);
        })
        .catch((err) =>
        {
            console.log(err);
        })
    }

    useEffect(()=>
    {
        loadResources(user);
    },[])

    const parseDates = (date) =>
    {
        const this_date = date.split("T")[0];
        const this_time = date.split("T")[1];
        return `${this_date.split("-")[2]}-${this_date.split("-")[1]}-${this_date.split("-")[0]} ${this_time.slice(0, 5)}`;
    }

    return(
        <div className="ResourceList_list">
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
                     <p className="text-center">Sorry, you haven't received any Resources for this class yet.</p>
                 </>
             )}
            <hr/>
        </div>
    )
}

export default ResourceList;
