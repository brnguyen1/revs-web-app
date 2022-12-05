import { Link } from "react-router-dom";
import React from 'react'
import { useDispatch } from 'react-redux';
import { employeeLogout } from "../redux-slices/employee-slice";
import "bootstrap/dist/css/bootstrap.min.css";
import * as credentials from './credentials.js'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

const ManagerHeader = () => {
    const dispatch = useDispatch();

    return (
        <nav class="navbar bg-grey bg-secondary">
            <div class="container-fluid">
                <b>
                    <a class="navbar-brand" href="/">
                        Rev's American Grill - Manager Options
                    </a>
                </b>
                <div class="d-flex justify-content-between">
                    <Link role="button" to="/customerorder" class="btn bg-dark btn-outline-light me-3">Kiosk</Link>
                    <Link role="button" to="/ordermenu" class="btn bg-dark btn-outline-light me-3">Server Portal</Link>
                    <Link onClick={() => { credentials.logOut() }} role="button" to="/" className="btn bg-dark btn-outline-light me-3">Logout</Link>
                </div>
            </div>
        </nav>
    )
}

export default ManagerHeader;