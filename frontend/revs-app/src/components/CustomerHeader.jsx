import { Link } from "react-router-dom";
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./logo.png";

const CustomerHeader = () => {
    return (
        
        <nav className="navbar bg-grey shadow">
            <div className="container-fluid">
                <b>
                <a className="navbar-brand" href="/">
                    <img src={Logo} height = "55px" width = "115px"/>
                </a>
                </b>
                <div className="d-flex justify-content-between">
                </div>


            </div>
            <hr></hr>
        </nav>
    )
}

export default CustomerHeader;