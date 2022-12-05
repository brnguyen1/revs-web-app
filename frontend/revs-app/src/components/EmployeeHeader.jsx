import { Link } from "react-router-dom";
import React from 'react'
import { useDispatch } from 'react-redux';
import Logo from "./logo.png";
import * as credentials from './credentials.js'
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeHeader = () => {
    const dispatch = useDispatch();

    return (
        <nav className="navbar bg-grey bg-secondary">
            <div className="container-fluid" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>
                <b>
                    <a className="navbar-brand" href="/">
                        <img src={Logo} height="55px" width="115px" />
                        <t style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>(Employee)</t>
                    </a>
                </b>
                <div className="d-flex justify-content-between">
                    {/* <Link role="button" to="/" className="btn btn-outline-secondary me-3">Home</Link> */}
                    <Link role="button" to="/ordermenu" className="btn bg-dark btn-outline-light me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Create Order</Link>
                    {credentials.isManager() &&
                        <Link role="button" to="/manager" className="btn  bg-dark btn-outline-light me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Manager Portal</Link>
                    }
                    <Link onClick={() => { credentials.logOut() }} role="button" to="/" className="btn bg-dark btn-outline-light me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Logout</Link>


                </div>
            </div>
        </nav>
    )
}

export default EmployeeHeader;