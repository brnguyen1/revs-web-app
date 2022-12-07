import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./logo.png";
import * as credentials from './credentials.js'
import { BrowserView, MobileView } from 'react-device-detect';


/**
 * This will create a header with buttons and links for the customer
 * @returns returns a header to be used for the customer side of the webpage
 */
const CustomerHeader = () => {
    return (
        <nav className="navbar btn-maroon shadow">
            <div className="container-fluid">
                <b>
                    <a className="navbar-brand" href="/">
                        <img src={Logo} height="55px" width="115px" />
                    </a>
                    <a className="location" href="/location">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#f6bd43" class="bi bi-pin-map" viewBox="-1 0 20 20">
                            <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
                            <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                        </svg>
                    </a>
                </b>
                <div className="d-flex justify-content-between">
                    <a href="/">
                        {
                            credentials.logOut()
                        }
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f6bd43" class="bi bi-lock-fill" viewBox="-1 0 20 20">
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        </svg>
                    </a>
                </div>

            </div>
            <hr></hr>
        </nav>
    )
}

export default CustomerHeader;