import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function GetReceipt() {
    const {date} = useParams();
    const [order_info, setOrderInfo] = useState([]);
    const navigate = useNavigate();

    const getOrderInfo = async () => {
        try {
            //get info
            const response = await fetch(`http://localhost:5000/receipts/${date}`);
            //parse info
            const jsonData = await response.json()    
            console.log(jsonData)

            setOrderInfo(jsonData); 
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getOrderInfo();
    }, []);

    const orderPath = () => {
        navigate(`/`);
    }

    // Function to group orders by customer name
    const groupOrdersByCustomer = () => {
        const groupedOrders = {};
        order_info.map(order => {
            if (!groupedOrders[order.customer_name]) {
                groupedOrders[order.customer_name] = [];
            }
            groupedOrders[order.customer_name].push(order);
        });
        console.log(groupedOrders)
        return groupedOrders;
    };

    if (!order_info || order_info.length === 0) {
        return (
            <div>
                <h1>No Orders</h1>
                <button onClick={orderPath}>Back</button>
            </div>
        )
    }

    const groupedOrders = groupOrdersByCustomer();

    return (
        <>
            <div>
                <h1>{date}</h1>
            </div>
            {Object.entries(groupedOrders).map(([customerName, orders]) => (
                <div key={customerName}>
                    <h2>{customerName}</h2>
                    <p>Event Address: {orders[0].address_name}</p>

                    <div id="tableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.event_id}>
                                        <td>{order.order_name}</td>
                                        <td>{order.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
            <button onClick={orderPath}>Back</button>
        </>
    )
}
