import { Link } from "react-router-dom";
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";


const ManagerHeader = () => {
    return(
        <nav class="navbar bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">
                    Rev's American Grill - Manager Options
                </a>
                <div class="d-flex justify-content-between">
                    <Link role="button" to="/ordermenu" class="btn btn-outline-secondary me-3">Server Portal</Link>
                    <Link role="button" to="/employeelogin" class="btn btn-outline-secondary me-3">Logout</Link>
                </div>
            </div>
        </nav>
    )
}

export default ManagerHeader;