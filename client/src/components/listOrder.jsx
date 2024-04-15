import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditOrder from "./editOrder";

export default function ListOrder() {
    const {id} = useParams();
    const [orderData, setorderdata] = useState([]);
    const navigate = useNavigate();

    const deleteOrder = async (customerID, deleteID) => {
        try {
            const deleteOrder = await fetch(`http://localhost:5000/orders/${customerID}/${deleteID}`, {
                method: "DELETE"
            });
    
            setorderdata(orderData.filter(data => data.event_id !== deleteID));
        
        } catch (error) {
            console.log(error.message);    
        }
    }
    
    const getOrderInfo = async (customerID) => {
        try {
            //get info
            const response = await fetch(`http://localhost:5000/orders/${customerID}`);
            //parse info
            const jsonData = await response.json()    
            console.log(jsonData)

            setorderdata(jsonData); 
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(()=>{
        getOrderInfo(id);
    }, [id]);

    const orderPath = () => {
        navigate(`/`);
    }

    return (
        <>
            <div id="tableContainer">
                <table>
                    <thead>
                        <td>Order</td>
                        <td>Quantity</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </thead>
                    <tbody>
                        {orderData.map(data => (
                            <tr key={data.event_id}>
                                <td>{data.order_name}</td>
                                <td>{data.quantity}</td>
                                <td><EditOrder orderData={data}/></td>
                                <td><button onClick={() => deleteOrder(id, data.event_id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={orderPath}>Back</button>
        </>
    )
};