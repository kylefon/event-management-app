import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import EditCustomer from "./editCustomer";


export default function ListCustomers() {

    const [customerData, setcustomerdata] = useState([])
    const navigate = useNavigate();

    const deleteCustomer = async (id) => {
        try {
            const deleteCustomer = await fetch(`http://localhost:5000/customers/${id}`, {
                method: "DELETE"
            });

            setcustomerdata(customerData.filter(data => data.customer_id !== id));
        
        } catch (error) {
            console.log(error.message);    
        }
    }
    const getCustomerInfo = async () => {
        try {
            //get info
            const response = await fetch("http://localhost:5000/customers");
            //parse info
            const jsonData = await response.json()    
            console.log(jsonData)

            setcustomerdata(jsonData); 
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(()=>{
        getCustomerInfo();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const orderPath = (id) => {
        navigate(`/order/${id}`);
    }


    return (
        <div id="tableContainer">
            <table>
                <thead>
                    <td>Event Name</td>
                    <td>Date</td>
                    <td>Address</td>
                    <td>Order</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </thead>
                <tbody>
                    {customerData.map(data => (
                        <tr key={data.customer_id}>
                            <td>{data.customer_name}</td>
                            <td>{formatDate(data.event_date)}</td>
                            <td>{data.address_name}</td>
                            <td><button onClick={() => orderPath(data.customer_id)}>Orders</button></td>
                            <td><EditCustomer data={data}/></td>
                            <td><button onClick={() => deleteCustomer(data.customer_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};