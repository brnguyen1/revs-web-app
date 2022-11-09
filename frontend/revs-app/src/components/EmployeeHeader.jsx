import { Link } from "react-router-dom";
import React from 'react'

import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeHeader = () => {
    return (
        <nav class="navbar bg-grey bg-secondary">
            <div class="container-fluid">
                <b>
                <a class="navbar-brand" href="/">
                    Rev's American Grill - Employee Options
                </a>
                </b>
                <div class="d-flex justify-content-between">
                    {/* <Link role="button" to="/" class="btn btn-outline-secondary me-3">Home</Link> */}
                    <Link role="button" to="/ordermenu" class="btn bg-dark btn-outline-light me-3">Create Order</Link>
                    <Link role="button" to="/orders" class="btn bg-dark btn-outline-light me-3">View Orders</Link>
                    <Link role="button" to="/menuitems" class="btn bg-dark btn-outline-light me-3">View Menu Items</Link>
                    <Link role="button" to="/employeelogin" class="btn bg-dark btn-outline-light me-3">Logout</Link>
                    <Link role="button" to="/manager" class="btn  bg-dark btn-outline-light me-3">Manager Portal</Link>
                
                </div>
            </div>
        </nav>
    )
}

export default EmployeeHeader;