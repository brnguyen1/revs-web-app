import { Link } from "react-router-dom";
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./logo.png";

const CustomerHeader = () => {
    return (
        
        <nav className="navbar bg-grey bg-secondary">
            <div className="container-fluid">
                <b>
                <a className="navbar-brand" href="/">
                    <img src={Logo} height = "55px" width = "115px"/>
                </a>
                </b>
                <div className="d-flex justify-content-between">
                    <Link role="button" to="/" className="btn bg-dark btn-outline-light me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Employee Login</Link>
                    <Link role="button" to="/checkout" className="btn btn-danger" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Checkout</Link>
                </div>


            </div>
        </nav>
    )
}

export default CustomerHeader;