CREATE DATABASE caterorder;

CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    event_date DATE, 
    phone VARCHAR(20)
);

CREATE TABLE event_order (
    event_id SERIAL PRIMARY KEY,
    order_name VARCHAR(100),
    quantity INT,
    fk_customer_id INT REFERENCES customer(customer_id)
);



