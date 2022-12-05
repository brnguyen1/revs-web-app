import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Customer from './routes/Customer';
import Orders from './routes/Orders';
import Login from './routes/Login';
import OrderMenu from './routes/OrderMenu';
import Server from './routes/Server';
import MenuItems from './routes/MenuItems';
import Manager from './routes/ManagerDashboard';
import React from 'react'
import Inventory from './routes/Inventory';

// Act as router for project
function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Routes */}
        <Route exact path="/customerorder" element={<Customer />} />

        {/* Employee Routes */}
        <Route path="/ordermenu" element={<OrderMenu />} />
        <Route path="/" element={<Login />} />

        {/* Manager Routes */}
        <Route path="/manager" element={<Manager />} />
        
        {/* Data Tables */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/menuitems" element={<MenuItems />} />
        <Route path="/inventory" element={<Inventory/>} />
        <Route path="/employees" element={<Server />} />

      </Routes>
    </Router>
  );
}


export default App;
