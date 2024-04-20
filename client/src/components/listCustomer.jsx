import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import EditCustomer from "./editCustomer";
import { Button } from "./ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell  } from "./ui/table";


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

    const getDatePath = () => {
        navigate(`/receipt`)
    }


    return (
        <div className="flex justify-items-center flex-col space-y-4 w-3/4">
            <div>
                <Table className="text-center">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Event Name</TableHead> 
                            <TableHead className="text-center">Date</TableHead>
                            <TableHead className="text-center">Address</TableHead>
                            <TableHead className="text-center">Order</TableHead>
                            <TableHead className="text-center">Edit</TableHead>
                            <TableHead className="text-center">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customerData.map(data => (
                            <TableRow key={data.customer_id}>
                                <TableCell>{data.customer_name}</TableCell>
                                <TableCell>{formatDate(data.event_date)}</TableCell>
                                <TableCell>{data.address_name}</TableCell>
                                <TableCell><Button onClick={() => orderPath(data.customer_id)}>Orders</Button></TableCell>
                                <TableCell><EditCustomer data={data}/></TableCell>
                                <TableCell><Button onClick={() => deleteCustomer(data.customer_id)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Button onClick={getDatePath}>Get Receipt</Button>
        </div>
    )
};