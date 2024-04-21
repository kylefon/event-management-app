import React, { useState } from "react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";


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
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Order Details</DialogTitle>                    
                <DialogDescription>
                    Make changes to the order. Click save when you're done. 
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input type="text" id="name" className="col-span-3" placeholder="Order" value={ order_name } onChange={e => setordername(e.target.value)}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">Quantity</Label>
                        <Input type="number" id="quantity" className="col-span-3" placeholder="Quantity" value = { quantity } onChange={e => setquantity(e.target.value)}/> 
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={(orderData) => { updateData(orderData, id) } }>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}