import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import InputCustomer from './components/inputCustomer'
import ListCustomers from './components/listCustomer'
import InputOrder from './components/inputOrder'
// import ListOrder from './components/listOrder'

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
                <Route exact path='/order' element={<InputOrder />}></Route> 
            </Routes>
        </BrowserRouter>
            
    )
};
export default App
