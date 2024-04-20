import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditCustomer from "./editCustomer";
import { Button } from "./ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";

export default function ListCustomers() {

    const [customerData, setCustomerData] = useState([]);
    const [eventDate, setEventDate] = useState("");
    const navigate = useNavigate();

    const deleteCustomer = async (id) => {
        try {
            await fetch(`http://localhost:5000/customers/${id}`, {
                method: "DELETE"
            });
            setCustomerData(customerData.filter(data => data.customer_id !== id));
        } catch (error) {
            console.log(error.message);
        }
    }

    const getCustomerInfo = async () => {
        try {
            const response = await fetch("http://localhost:5000/customers");
            const jsonData = await response.json();
            console.log(jsonData);
            setCustomerData(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
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

    const handleSaveDate = () => {
        navigate(`/receipt/${formatDate(eventDate)}`);
    }

    return (
        <div className="flex justify-items-center flex-col space-y-4 w-3/4">
            <div>
                <Table className="text-center">
                    <TableHeader>
                        <TableRow className="border-t">
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
                                <TableCell><Button variant="outline" onClick={() => orderPath(data.customer_id)}>Orders</Button></TableCell>
                                <TableCell><EditCustomer data={data} /></TableCell>
                                <TableCell><Button variant="destructive" onClick={() => deleteCustomer(data.customer_id)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Get Receipt</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Input Date</DialogTitle>
                        <DialogDescription>
                            Get all orders based on the date.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">Date</Label>
                            <Input type="date" id="date" className="col-span-3" placeholder="Event Date" value={eventDate} onChange={e => setEventDate(e.target.value)} />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={handleSaveDate}>Save</Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </div>
    )
};
