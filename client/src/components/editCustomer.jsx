import React, { useState } from "react";

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
        <>
            <button id="myBtn" onClick={() => setDisplayStyle("block")}>Edit</button>
            <div id="myModal" class="modal" style={ {display : displayStyle} }>
                <div class="modal-content">
                <div class="modal-header">
                    <span class="close" onClick={closeButton} >&times;</span>
                    <h2>Edit Customer Details</h2>
                </div>
                <div class="modal-body">
                    <input type="text" placeholder="Name" value={ customer_name } onChange={e => setcustomername(e.target.value)}/>
                    <input type="text" placeholder="Address" value = { address_name } onChange={e => setaddressname(e.target.value)}/> 
                    <input type="date" placeholder="Event Date" value = { formatDate(event_date) } onChange={e => seteventdate(e.target.value)}/>
                </div>
                <div class="modal-footer">
                    <button onClick={(data) => updateData(data)}>Done</button>
                </div>
                </div>
            </div>
        </>
    )
}