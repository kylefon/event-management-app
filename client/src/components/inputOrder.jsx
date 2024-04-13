import React, { useState } from "react";

export default function InputOrder() {
    const [order_name, setordername] = useState("")
    const [quantity, setquantity] = useState("")

    onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { order_name, quantity};
            const response = await fetch("http://localhost:5000/orders", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(body)
            })        

            console.log(response);
            setordername("");
            setquantity("");
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <>
            <form onSubmit={onSubmitForm}>
                <input type="text" placeholder="Order" value={ order_name } onChange={e => setordername(e.target.value)}/>
                <input type="number" placeholder="Quantity" value = { quantity } onChange={e => setquantity(e.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>
        </>
    );
}