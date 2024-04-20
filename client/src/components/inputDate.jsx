import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

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
        <div className="flex flex-col space-y-4 mt-8 w-full items-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">Input Date</h1>
            <div className="w-3/4 space-y-4 justify-center">
                <div className="flex items-center justify-center">
                    <Input type="date" placeholder="Event Date"  value={ event_date } onChange={e => setdate(e.target.value)}/>
                    <Button onClick={getDatePath}>Get Receipt</Button>
                </div>
                <Button onClick={orderPath} className="w-full">Back</Button>
            </div>
        </div>
    )
}
