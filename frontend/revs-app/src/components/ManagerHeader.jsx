import { Link } from "react-router-dom";
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";


const ManagerHeader = () => {
    return(
        <nav class="navbar bg-grey bg-secondary">
            <div class="container-fluid">
                <b>
                <a class="navbar-brand" href="/">
                    Rev's American Grill - Manager Options
                </a>
                </b>
                <div class="d-flex justify-content-between">
                    <Link role="button" to="/ordermenu" class="btn bg-dark btn-outline-light me-3">Server Portal</Link>
                    <Link role="button" to="/employeelogin" class="btn bg-dark btn-outline-light me-3">Logout</Link>
                </div>
            </div>
        </nav>
    )
}

export default ManagerHeader;