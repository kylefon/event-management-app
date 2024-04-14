import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function InputOrder() {
    const { id } = useParams();
    const [order_name, setordername] = useState("");
    const [quantity, setquantity] = useState("");
    const navigate = useNavigate();

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

    const orderPath = () => {
        navigate(`/`);
    }



    return (
        <>
            <form onSubmit={onSubmitForm}>
                <input type="text" placeholder="Order" value={ order_name } onChange={e => setordername(e.target.value)}/>
                <input type="number" placeholder="Quantity" value = { quantity } onChange={e => setquantity(e.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>
            <button onClick={orderPath}>Back</button>
        </>
    );
}