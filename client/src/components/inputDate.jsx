import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InputDate() {

    const [event_date, setdate] = useState("")
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getDatePath = () => {
        navigate(`/receipt/${formatDate(event_date)}`)
    }

    const orderPath = () => {
        navigate(`/`);
    }    

    return (
        <>
            <h1>Input Date</h1>
            <input type="date" placeholder="Event Date"  value={ event_date } onChange={e => setdate(e.target.value)}/>
            <button onClick={getDatePath}>Get Receipt</button>
            <button onClick={orderPath}>Back</button>
        </>
    )
}