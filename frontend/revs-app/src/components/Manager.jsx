import ManagerHeader from "./ManagerHeader";
import React from 'react'
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as credentials from './credentials.js'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import ArrowKeyNav from "./Keyboard";

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
            <ArrowKeyNav>
            <div class="d-flex flex-wrap justify-content-evenly align-contents-around mt-5">                
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <Link role="button" to="/menuitems" class="btn btn-outline-dark me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Menu Items</Link>
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <Link role="button" to="/employees" class="btn btn-outline-dark me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Employees</Link>
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <Link role="button" to="/inventory" class="btn btn-outline-dark me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Inventory</Link>
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                            <Link role="button" to="/orders" class="btn btn-outline-dark me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Order History</Link>
                        </h5>
                    </div>
                </div>

            </div>
            </ArrowKeyNav>
        </div>        
    )
}


export default Manager;