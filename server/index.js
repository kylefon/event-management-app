const express = require("express");
const app = express();
const cors = require('cors');
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create customer
app.post("/customers", async (req, res) => {
    try {
        const { customer_name, event_date, phone } = req.body;
        const newCustomer = await pool.query(
            "INSERT INTO customer (customer_name, event_date, phone) VALUES ($1, $2, $3) RETURNING *",
            [customer_name, event_date, phone]
        );

        res.json(newCustomer.rows[0]);
        
    } catch (error) {
        console.error(error.message);
    }
});

//create order 
app.post("/orders", async (req, res) => {
    try {
        const { order_name, quantity, fk_customer_id } = req.body;
        const newOrder = await pool.query(
            "INSERT INTO event_order (order_name, quantity,fk_customer_id) VALUES ($1, $2, $3) RETURNING *",
            [order_name, quantity, fk_customer_id]
        );

        res.json(newOrder.rows[0]);
        
    } catch (error) {
        console.error(error.message);
    }
});


//get all customers

app.get("/customers", async(req,res) => {
    try{
        const allcustomers = await pool.query("SELECT * FROM customer");
        res.json(allcustomers.rows);
    } catch (error) {
        console.error(error.message)
    }
});

//get orders

app.get("/orders/:customer_id", async(req,res) => {
    try{
        const {customer_id} = req.params;
        const allorders = await pool.query(
            "SELECT * FROM event_order WHERE fk_customer_id = $1", 
            [customer_id]
        );
        res.json(allorders.rows);
    } catch (error) {
        console.error(error.message)
    }
});

//update customer

app.put("/customers/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const { customer_name, event_date, phone } = req.body;
        const updatecustomer = await pool.query(
            'UPDATE customer SET customer_name = $1, event_date = $2, phone = $3 WHERE customer_id = $4',
            [customer_name, event_date, phone, id]
        );

        res.json("Customer updated"); 
    } catch (error) {
        console.error(error.message)
    }
});

//update orders

app.put("/orders/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const { order_name, event_date } = req.body;
        const updateorder = await pool.query(
            'UPDATE customer SET customer_name = $1, event_date = $2 WHERE event_id = $3',
            [order_name, event_date, id]
        );

        res.json("Order updated"); 
    } catch (error) {
        console.error(error.message)
    }
});

//delete customer

app.delete("/customers/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const deletecustomer = await pool.query(
            "DELETE FROM customer WHERE customer_id = $1", 
            [id]
        );
        res.json("Customer deleted");

    } catch (error) {
        console.error(error.message);
    }
});

//delete order

app.delete("/orders/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const deletecustomer = await pool.query(
            "DELETE FROM customer WHERE event_id = $1", 
            [id]
        );
        res.json("Order deleted");

    } catch (error) {
        console.error(error.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000")
});