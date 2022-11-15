import { Link } from "react-router-dom";
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";


const ManagerHeader = () => {
    return(
        <nav className="navbar bg-grey bg-secondary">
            <div className="container-fluid">
                <b>
                <a className="navbar-brand" href="/">
                    Rev's American Grill - Manager Options
                </a>
                </b>
                <div className="d-flex justify-content-between">
                    <Link role="button" to="/ordermenu" className="btn bg-dark btn-outline-light me-3">Server Portal</Link>
                    <Link role="button" to="/employeelogin" className="btn bg-dark btn-outline-light me-3">Logout</Link>
                </div>
            </div>
        </nav>
    )
}

export default ManagerHeader;