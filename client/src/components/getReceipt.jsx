import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell  } from "./ui/table";
import { Button } from "./ui/button";

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
            <div className="flex flex-col items-center w-full space-y-8 mt-16">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">No Orders</h1>
                <Button className="w-3/4" onClick={orderPath}>Back</Button>
            </div>
        )
    }

    const groupedOrders = groupOrdersByCustomer();

    return (
        <div className="flex flex-col space-y-4 mt-8 text-center w-full items-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 border-b">Events for {date}</h1>
            <div className="w-3/4 justify-item space-y-6">
                {Object.entries(groupedOrders).map(([customerName, orders]) => (
                    <div key={customerName}>
                        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{customerName}</h2>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">Address: {orders[0].address_name}</p>
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-t">
                                        <TableHead className="text-center">Order</TableHead>
                                        <TableHead className="text-center">Quantity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map(order => (
                                        <tr key={order.event_id}>
                                            <TableCell>{order.order_name}</TableCell>
                                            <TableCell>{order.quantity}</TableCell>
                                        </tr>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                ))}
                <Button onClick={orderPath} className="w-3/4">Back</Button>
            </div>
        </div>
    )
}
