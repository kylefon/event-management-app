import React, { useState } from "react";

export default function EditOrder({ orderData }) {
    const [order_name, setordername] = useState(orderData.order_name);
    const [quantity, setquantity] = useState(orderData.quantity);

    const [displayStyle, setDisplayStyle] = useState("none");

    // modal open and close functions 
    const openModal = () => {
        setDisplayStyle("block");
    };

    const closeModal = () => {
        setDisplayStyle("none");
    };

    // reset input field after pressing close button
    const closeButton = () => {
        setordername(orderData.order_name);
        setquantity(orderData.quantity);
    } 

    const updateData = async (e) => {
        e.preventDefault();
        try {
            const body = {order_name, quantity};
            const response = await fetch(`http://localhost:5000/orders/${customer_id}`, {
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
            <div id="myModal" class="modal" style={ {display : displayStyle} } onClick={closeModal}>
                <div class="modal-content">
                <div class="modal-header">
                    <span class="close" onClick={() => {closeModal(); closeButton(); }} >&times;</span>
                    <h2>Edit Order Details</h2>
                </div>
                <div class="modal-body">
                    <input type="text" placeholder="Order" value={ customer_name } onChange={e => setordername(e.target.value)}/>
                    <input type="text" placeholder="Quantity" value = { phone } onChange={e => setquantity(e.target.value)}/> 
                </div>
                <div class="modal-footer">
                    <button onClick={(orderData) => { updateData(orderData); closeModal(); } }>Done</button>
                </div>
                </div>
            </div>
        </>
    )
}