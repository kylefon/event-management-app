import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function EditCustomer({ data }) {
    const [customer_name, setcustomername] = useState(data.customer_name);
    const [event_date, seteventdate] = useState(data.event_date);
    const [address_name, setaddressname] = useState(data.address_name);

    const [displayStyle, setDisplayStyle] = useState("none");

    // reset input field after pressing close button
    const closeButton = () => {
        setcustomername(data.customer_name);
        seteventdate(data.event_date);
        setaddressname(data.address_name);
        setDisplayStyle("none");
    }

    // formats date to yyyy-mm-dd
    const formatDate = (dateString) => {
        const date = new Date(dateString);        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const dateWithoutTimezone = (date) => {
        const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
        const withoutTimezone = new Date(date.valueOf() - tzoffset)
          .toISOString()
          .slice(0, -1);
        return withoutTimezone;
      };

    const updateData = async (e) => {
        e.preventDefault();
        try {
            const body = {customer_name, event_date: dateWithoutTimezone(new Date(event_date)), address_name};
            const response = await fetch(`http://localhost:5000/customers/${data.customer_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

        window.location = "/";     
        setDisplayStyle("none");
       
        } catch (error) {
            console.error(error.message);
        }
    }


    return (
        // <div className="modalContainer">
        //     <Button id="myBtn" onClick={() => setDisplayStyle("block")}>Edit</Button>
        //     <div id="myModal" className="modal" style={ {display : displayStyle} }>
        //         <div className="modal-content">
        //         <div className="modal-header">
        //             <span className="close" onClick={closeButton} >&times;</span>
        //             <h2>Edit Customer Details</h2>
        //         </div>
        //         <div className="modal-body">
        //             <Input type="text" placeholder="Name" value={ customer_name } onChange={e => setcustomername(e.target.value)}/>
        //             <Input type="text" placeholder="Address" value = { address_name } onChange={e => setaddressname(e.target.value)}/> 
        //             <Input type="date" placeholder="Event Date" value = { formatDate(event_date) } onChange={e => seteventdate(e.target.value)}/>
        //         </div>
        //         <div className="modal-footer">
        //             {/* <button onClick={(data) => updateData(data)}>Done</button> */}
        //             <Button onClick={(data) => updateData(data)}>Done</Button>
        //         </div>
        //         </div>
        //     </div>
        // </div>

        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Customer Details</DialogTitle>                    
                <DialogDescription>
                    Make changes to the customer's details. Click save when you're done. 
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="c_name" className="text-right">Name</Label>
                        <Input type="text" id="c_name" className="col-span-3" placeholder="Name" value={ customer_name } onChange={e => setcustomername(e.target.value)}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">Address</Label>
                        <Input type="text" id="address" className="col-span-3" placeholder="Address" value = { address_name } onChange={e => setaddressname(e.target.value)}/> 
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">Date</Label>
                        <Input type="date" id="date" className="col-span-3" placeholder="Event Date" value = { formatDate(event_date) } onChange={e => seteventdate(e.target.value)}/>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={(data) => updateData(data)}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}