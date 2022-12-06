import { Link } from "react-router-dom";
import React from 'react'
import Logo from "./logo.png";
import { useDispatch } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import * as credentials from './credentials.js'

const ManagerHeader = () => {
    const dispatch = useDispatch();

    return (
        <nav class="navbar bg-grey bg-secondary">
            <div class="container-fluid">
                <b>
                    <a className="navbar-brand" href="/">
                        <img src={Logo} height="55px" width="115px" />
                    </a>
                </b>
                <div class="d-flex justify-content-between">
                    <Link role="button" to="/customerorder" class="btn bg-dark btn-outline-light me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Kiosk</Link>
                    <Link role="button" to="/ordermenu" class="btn bg-dark btn-outline-light me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Server Portal</Link>
                    <Link onClick={() => { credentials.logOut() }} role="button" to="/" className="btn bg-dark btn-outline-light me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Logout</Link>
                </div>
            </div>
        </nav>
    )
}

export default ManagerHeader;