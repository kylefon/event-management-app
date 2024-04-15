import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function InputOrder() {
    const { id } = useParams();
    const [order_name, setordername] = useState("");
    const [quantity, setquantity] = useState("");
    const [customerData, setcustomerdata] = useState([]);

    const getCustomerInfo = async (customerID) => {
        try {
            //get info
            const response = await fetch(`http://localhost:5000/customers/${customerID}`);
            //parse info
            const jsonData = await response.json()    
            console.log(jsonData)
            setcustomerdata(jsonData); 
        } catch (error) {
            console.log(error.message);
        }
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { order_name, quantity, fk_customer_id: id };
            const response = await fetch("http://localhost:5000/orders", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(body)
            })        

            window.location = `/order/${id}`;

        } catch (error) {
            console.error(error.message);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        getCustomerInfo(id); 
    }, [id]);

    return (
        <>
            <div>
                {customerData.map(data =>(
                    <>
                        <h1>{data.customer_name}</h1>
                        <p>{formatDate(data.event_date)}</p>
                    </>
                ))}
            </div>
            <div id="InputOrderContainer">
                <form onSubmit={onSubmitForm}>
                    <input type="text" placeholder="Order" value={ order_name } onChange={e => setordername(e.target.value)}/>
                    <input type="number" placeholder="Quantity" value = { quantity } onChange={e => setquantity(e.target.value)}/>
                    <button className="btn btn-success">Add</button>
                </form>
            </div>
        </>
    );
}