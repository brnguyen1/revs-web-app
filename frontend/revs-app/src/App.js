import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Customer from './routes/Customer';
import Orders from './routes/Orders';
import EmployeeLogin from './routes/EmployeeLogin';
import TestEmployeePage from './routes/TestEmployee';
import OrderMenu from './routes/OrderMenu';
import Checkout from './routes/Checkout';
import Server from './routes/Server';
import MenuItems from './routes/MenuItems';
import Manager from './routes/Managerlogin';
import WST from './routes/WhatSalesTogether';
import SalesReport from './components/SalesReport';
import ER from './components/ExcessReport';
import RR from './components/RestockReport';
import React from 'react'
import Auth from './components/GoogleAuth'

// Act as router for project
function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Routes */}
        <Route exact path="/" element={<Customer />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Employee Routes */}
        <Route path="/server" element={<Server />} />
        <Route path="/employeelogin" element={<EmployeeLogin />} />
        <Route path="/testemployeepage" element={<TestEmployeePage />} />

        {/* Manager Routes */}
        <Route path="/ordermenu" element={<OrderMenu />} />
        <Route path="/menuitems" element={<MenuItems />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/WST" element={<WST />} />
        <Route path="/salesreport" element={<SalesReport />} />
        <Route path="/excessreport" element={<ER />} />
        <Route path="/restockreport" element={<RR />} />
      </Routes>
    </Router>
  );
}

export default App;
