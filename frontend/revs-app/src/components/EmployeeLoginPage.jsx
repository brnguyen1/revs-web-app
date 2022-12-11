import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import GoogleAuth from "./GoogleAuth";
import * as credentials from './credentials.js'
import Logo from "./logo.png";
import EmployeeHeader from "./EmployeeHeader";
/**
 * This will create a login page for employees to use, will use google auth to authenticate user
 * @returns returns the employee login page with google auth enabled 
 */
const EmployeeLoginPage = () => {

    return (
        <div>

            {credentials.isLoggedIn() &&
                <EmployeeHeader />
            }
            {credentials.isLoggedIn() &&
                <h3 className="text-center mt-4" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 20}px` }}>Employee Home Page</h3>
            }
            {!credentials.isLoggedIn() &&
                <center>
                <br></br>
                 <img src={Logo} height = "240px" width = "500px"/> 
                 <h3 className="text-center mt-4" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 20}px` }}>Employee Login Page</h3>  
                </center>
                
            }

            {}
            <div className="d-flex justify-content-center mt-5">
                <GoogleAuth />
            </div>
            
        </div>
    );

}

export default EmployeeLoginPage;