import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

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
        <div className="flex flex-col space-y-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">Event Management</h1>    
            <div id="InputCustomerContainer" className="flex flex-row items-center justify-center space-x-4">
                <form onSubmit={onSubmitForm} className="flex items-center justify-center space-x-2">
                    <Input type="text" placeholder="Name" value={customer_name} onChange={e => setCustomer_name(e.target.value)} />
                    <Input type="text" placeholder="Address" value={address_name} onChange={e => setaddressname(e.target.value)} />
                    <Input type="date" placeholder="Event Date" value={event_date} onChange={e => setdate(e.target.value)} />
                    <Button>Add</Button>
                </form>
            </div>
        </div>
    );
};