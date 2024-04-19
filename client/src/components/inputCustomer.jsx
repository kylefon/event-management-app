import React, { useState } from "react";

export default function InputCustomer() {

    const [customer_name, setCustomer_name] = useState("");
    const [event_date, setdate] = useState("")
    const [address_name, setaddressname] = useState("")

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {customer_name, event_date, address_name};
            const response = await fetch("http://localhost:5000/customers", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
            
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <h1>Cater Order</h1>
            <div id="InputCustomerContainer">
                <form onSubmit={onSubmitForm}>
                    <input type="text" placeholder="Name" value={ customer_name } onChange={e => setCustomer_name(e.target.value)}/>
                    <input type="text" placeholder="Address" value = { address_name } onChange={e => setaddressname(e.target.value)}/>
                    <input type="date" placeholder="Event Date" value = { event_date } onChange={e => setdate(e.target.value)}/>
                    <button className="btn btn-success">Add</button>
                </form>
            </div>
        </>
    );
};