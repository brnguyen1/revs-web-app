import { Link } from "react-router-dom";
import React from 'react'

import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeHeader = () => {
    return (
        <nav className="navbar bg-grey bg-secondary">
            <div className="container-fluid">
                <b>
                <a className="navbar-brand" href="/">
                    Rev's American Grill - Employee Options
                </a>
                </b>
                <div className="d-flex justify-content-between">
                    {/* <Link role="button" to="/" className="btn btn-outline-secondary me-3">Home</Link> */}
                    <Link role="button" to="/ordermenu" className="btn bg-dark btn-outline-light me-3">Create Order</Link>
                    <Link role="button" to="/orders" className="btn bg-dark btn-outline-light me-3">View Orders</Link>
                    <Link role="button" to="/" className="btn bg-dark btn-outline-light me-3">Logout</Link>
                    <Link role="button" to="/manager" className="btn  bg-dark btn-outline-light me-3">Manager Portal</Link>
                
                </div>
            </div>
        </nav>
    )
}

export default EmployeeHeader;