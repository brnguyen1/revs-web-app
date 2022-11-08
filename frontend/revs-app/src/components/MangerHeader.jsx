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
                    <Link role="button" to="/WST" class="btn btn-outline-secondary me-3">What Sales Together</Link>
                    <Link role="button" to="/salesreport" class="btn btn-outline-secondary me-3">Sales Report</Link>
                    <Link role="button" to="/excessreport" class="btn btn-outline-secondary me-3">Excess Report</Link>
                    <Link role="button" to="/restockreport" class="btn btn-outline-secondary me-3">Restock Report</Link>
                    <Link role="button" to="/menuitems" class="btn btn-outline-secondary me-3">Menu Items</Link>
                    <Link role="button" to="/additems" class="btn btn-outline-secondary me-3">Add Items</Link>
                    <Link role="button" to="/updateitems" class="btn btn-outline-secondary me-3">Update Items</Link>
                </div>
            </div>
        </nav>
    )
}

export default ManagerHeader;