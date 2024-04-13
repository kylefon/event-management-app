import React, { useState } from "react";

export default function EditCustomer({ data }) {
    const [customer_name, setcustomername] = useState(data.customer_name);
    const [event_date, seteventdate] = useState(data.event_date);
    const [phone, setphone] = useState(data.phone);

    const [displayStyle, setDisplayStyle] = useState("none");

    const openModal = () => {
        setDisplayStyle("block");
    };

    const closeModal = () => {
        setDisplayStyle("none");
    };


// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const updateData = async (e) => {
        e.preventDefault();
        try {
            const body = {customer_name, event_date, phone};
            const response = await fetch(`http://localhost:5000/customers/${data.customer_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

        window.location = "/";            
        } catch (error) {
            console.error(error.message);
        }
    }


    return (
        <>
            <button id="myBtn" onClick={openModal}>Edit</button>
            <div id="myModal" class="modal" style={ {display : displayStyle} }>
                <div class="modal-content">
                <div class="modal-header">
                    <span class="close" onClick={closeModal} >&times;</span>
                    <h2>Modal Header</h2>
                </div>
                <div class="modal-body">
                    {/* <input type="text" placeholder="Name" value={ customer_name } onChange={e => setCustomer_name(e.target.value)}/>
                    <input type="date" placeholder="Event Date" value = { event_date } onChange={e => setdate(e.target.value)}/>
                    <input type="text" placeholder="Contact" value = { phone } onChange={e => setphone(e.target.value)}/> */}
                    <input type="text" placeholder="Name" value={ customer_name } onChange={e => setcustomername(e.target.value)}/>
                    <input type="date" placeholder="Event Date" value = { formatDate(event_date) } onChange={e => seteventdate(e.target.value)}/>
                    <input type="text" placeholder="Contact" value = { phone } onChange={e => setphone(e.target.value)}/> 
                </div>
                <div class="modal-footer">
                    <button onClick={(data) => { updateData(data); closeModal(); } }>Done</button>
                </div>
                </div>
            </div>
        </>
    )
}