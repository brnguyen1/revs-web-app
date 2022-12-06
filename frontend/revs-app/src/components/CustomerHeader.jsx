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
                <a className="location" href="/location">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="maroon" class="bi bi-pin-map" viewBox="0 0 20 12">
                            <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
                            <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                        </svg>
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