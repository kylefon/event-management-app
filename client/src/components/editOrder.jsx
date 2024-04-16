import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditOrder({ orderData }) {
    const { id } = useParams();
    const [order_name, setordername] = useState(orderData.order_name);
    const [quantity, setquantity] = useState(orderData.quantity);

    const [displayStyle, setDisplayStyle] = useState("none");

    // reset input field after pressing close button
    const closeButton = () => {
        setordername(orderData.order_name);
        setquantity(orderData.quantity);
        setDisplayStyle("none");
    } 

    const updateData = async (e, updateID) => {
        e.preventDefault();
        try {
            const body = {order_name, quantity};
            const response = await fetch(`http://localhost:5000/orders/${orderData.event_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            window.location = `/order/${updateID}`;
            setDisplayStyle("none");

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <button id="myBtn" onClick={() => setDisplayStyle("block")}>Edit</button>
            <div id="myModal" class="modal" style={ {display : displayStyle}} >
                <div class="modal-content">
                <div class="modal-header">
                    <span class="close" onClick={() => { closeButton() }} >&times;</span>
                    <h2>Edit Order Details</h2>
                </div>
                <div class="modal-body">
                    <input type="text" placeholder="Order" value={ order_name } onChange={e => setordername(e.target.value)}/>
                    <input type="text" placeholder="Quantity" value = { quantity } onChange={e => setquantity(e.target.value)}/> 
                </div>
                <div class="modal-footer">
                    <button onClick={(orderData) => { updateData(orderData, id) } }>Done</button>
                </div>
                </div>
            </div>
        </>
    )
}