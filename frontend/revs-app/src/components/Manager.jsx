import ManagerHeader from "./ManagerHeader";
import React from 'react'
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as credentials from './credentials.js'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

const Manager = () => {
    return (
        <div>
            {!credentials.isLoggedIn() &&
                
               <Navigate to = "/"></Navigate>
            }
            {!credentials.isManager() &&
                <Navigate to = "/"></Navigate>
            }
            <ManagerHeader />
            <div class="d-flex flex-wrap justify-content-evenly align-contents-around">
                {/* <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <Link role="button" to="/WST" class="btn btn-outline-secondary me-3">What Sales Together</Link>
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <Link role="button" to="/salesreport" class="btn btn-outline-secondary me-3">Sales Report</Link>
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <Link role="button" to="/excessreport" class="btn btn-outline-secondary me-3">Excess Report</Link>
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <Link role="button" to="/restockreport" class="btn btn-outline-secondary me-3">Restock Report</Link>
                        </h5>
                    </div>
                </div> */}
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <Link role="button" to="/menuitems" class="btn btn-outline-secondary me-3">Menu Items</Link>
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <Link role="button" to="/employees" class="btn btn-outline-secondary me-3">Employees</Link>
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <Link role="button" to="/inventory" class="btn btn-outline-secondary me-3">Inventory</Link>
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <Link role="button" to="/orders" class="btn btn-outline-secondary me-3">Order History</Link>
                        </h5>
                    </div>
                </div>

            </div>


        </div>
    )
}


export default Manager;