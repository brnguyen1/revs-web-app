import { Link } from "react-router-dom";
import React from 'react'
import Logo from "./logo.png";
import * as credentials from './credentials.js'
import "bootstrap/dist/css/bootstrap.min.css";
/**
 * This will create a header with buttons and links for the employee
 * @returns returns a header to be used for the employee side of the webpage 
 */
const EmployeeHeader = () => {

    return (
        <nav className="navbar bg-grey bg-secondary">
            <div className="container-fluid" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>
                <b>
                    <a className="navbar-brand" href="/">
                        <img src={Logo} height="55px" width="115px" />
                    </a>
                </b>
                <div className="d-flex justify-content-between">
                    <a className="location" href="/location">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#f6bd43" class="bi bi-pin-map" viewBox="0 0 20 12">
                            <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
                            <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                        </svg>
                    </a>

                    {/* <Link role="button" to="/" className="btn btn-outline-secondary me-3">Home</Link> */}
                    <Link role="button" to="/customerorder" class="btn btn-maroon btn-outline-light me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Kiosk</Link>
                    <Link role="button" to="/ordermenu" className="btn btn-maroon btn-outline-light me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Create Order</Link>
                    <Link role="button" to="/queue" class="btn btn-maroon btn-outline-light me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Current Queue</Link>
                    {credentials.isManager() &&
                        <Link role="button" to="/manager" className="btn  btn-maroon btn-outline-light me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Manager Portal</Link>
                    }
                    <Link onClick={() => { credentials.logOut() }} role="button" to="/" className="btn btn-maroon btn-outline-light me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Logout</Link>


                </div>
            </div>
        </nav>
    )
}

export default EmployeeHeader;