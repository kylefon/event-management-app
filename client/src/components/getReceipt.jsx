import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell  } from "./ui/table";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

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
        <Card className="w-3/4 m-8">
            <CardHeader>
                <CardTitle className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">All Orders</CardTitle>
                <CardDescription className="text-center">Events for {date}</CardDescription>
            </CardHeader>
            <CardContent>
                {Object.entries(groupedOrders).map(([customerName, orders]) => (
                    <div key={customerName}>
                        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight mt-4 text-center">{customerName}</h2>
                        <CardDescription className="text-center">Address: {orders[0].address_name}</CardDescription>
                        <div>
                            <Table className="border-b">
                                <TableHeader>
                                    <TableRow className="border-t">
                                        <TableHead className="text-center">Order</TableHead>
                                        <TableHead className="text-center">Quantity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map(order => (
                                        <tr key={order.event_id}>
                                            <TableCell className="text-center">{order.order_name}</TableCell>
                                            <TableCell className="text-center">{order.quantity}</TableCell>
                                        </tr>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <Button onClick={orderPath} className="w-full">Back</Button>
            </CardFooter>
        </Card>
    )
}
