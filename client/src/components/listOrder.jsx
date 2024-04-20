import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditOrder from "./editOrder";
import { Button } from "./ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell  } from "./ui/table";


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
            <div className="flex justify-items-center flex-col space-y-4 w-3/4">
                <Table className="text-center">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Order</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-center">Edit</TableHead>
                            <TableHead className="text-center">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderData.map(data => (
                            <TableRow key={data.event_id}>
                                <TableCell>{data.order_name}</TableCell>
                                <TableCell>{data.quantity}</TableCell>
                                <TableCell><EditOrder orderData={data}/></TableCell>
                                <TableCell><Button onClick={() => deleteOrder(id, data.event_id)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Button onClick={orderPath} className="w-3/4">Back</Button>
        </>
    )
};