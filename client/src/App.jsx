import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import InputCustomer from './components/inputCustomer'
import ListCustomers from './components/listCustomer'
import InputOrder from './components/inputOrder'
import ListOrder from './components/listOrder'
import GetReceipt from './components/getReceipt'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={
                    <>
                        <InputCustomer />
                        <ListCustomers />
                    </>
                }>  
                </Route>
                <Route exact path='/order/:id' element={
                    <>
                        <InputOrder />
                        <ListOrder/>
                    </>
                }></Route> 
                <Route exact path='/receipt/:date' element={
                    <GetReceipt />
                }></Route>
            </Routes>
        </BrowserRouter>
            
    )
};
export default App
