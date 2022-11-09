import { Link } from "react-router-dom";
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

const CustomerHeader = () => {
    return (
        
        <nav className="navbar bg-grey bg-secondary">
            <div className="container-fluid">
                <b>
                <a className="navbar-brand" href="/">
                    Rev's American Grill
                </a>
                </b>
                <div class="d-flex justify-content-between">
                    <Link role="button" to="/" class="btn bg-dark btn-outline-light me-3">Home</Link>
                    <Link role="button" to="/employeelogin" class="btn bg-dark btn-outline-light me-3">Employee Login</Link>
                    <Link role="button" to="/checkout" class="btn btn-danger">Checkout</Link>
                </div>
            </div>
        </nav>
    )
}

export default CustomerHeader;