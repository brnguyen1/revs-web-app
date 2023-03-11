import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as credentials from './credentials.js'
import { BrowserRouter as Navigate } from 'react-router-dom'
import axios from "axios";

const google = window.google;
/**
 * this function will implement google auth for users to use to log in
 *
 * @return  returns information about logged in user
 */
const GoogleAuth = () => {

    const [user, setUser] = useState({});
    /**
     * checks if the user is a manager or an employee
     *
     * @param   response  response to be checked
     *
     * 
     */
    function handleCallbackResponse(response) {
        if (!credentials.isLoggedIn()) {
            console.log("Encoded JWT ID token: " + response.credential);
            var auth = jwt_decode(response.credential);
            setUser(auth);
            localStorage.setItem("user", JSON.stringify(auth));
            axios.get(process.env.REACT_APP_BACKEND_API + 'server/auth', { params: { email: auth.email } }).then(res => {
                if (res.data) {
                    console.log("valid")
                    localStorage.setItem("status", "1");
                    localStorage.setItem("ismanager", res.data.ismanager)
                    console.log(res.data)
                    localStorage.setItem("employee_id", res.data.id)
                    document.location.reload();
                }
            })
        }

    };

    useEffect(() => {
        // if (credentials.isLoggedIn()) {
        //     setUser(JSON.parse(localStorage.getItem("user")));
        //     document.getElementById("signInDiv").hidden = true;
        // }
        // try {
        //     google.accounts.id.initialize({
        //         client_id: "471568519931-j5j28lf530at8p85mm854mbal1s10f8e.apps.googleusercontent.com",
        //         callback: handleCallbackResponse
        //     });
        // }
        // catch (e) {
        //     console.log("catch statement encountered attempting initialize")
        // }

        // try {
        //     google.accounts.id.renderButton(
        //         document.getElementById("signInDiv"),
        //         { theme: "outline", size: "large"}
        //     );
        // }
        // catch (e) {
        //     console.log("catch statement encountered attempting render")
        // }
        localStorage.setItem("status", "1");
        localStorage.setItem("ismanager", true);
        localStorage.setItem("employee_id", 1);
        
    }, []);

    return (
        <div className="GoogleAuth" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>
            <div id="signInDiv"></div>
            {credentials.isLoggedIn() &&
                <div>
                    <center>
                        
                        {/* <img src={user.picture}></img>
                        <h3>{"Logged In: " + user.name}</h3>
                        {credentials.isManager() &&
                            <h5>{"(Manager)"}</h5>
                        }
                        {!credentials.isManager() &&
                            <h5>{"(Server)"}</h5>
                        }
                        <p>{user.email}</p>

                        {credentials.isManager() &&
                            <><Link role="button" to="/ordermenu" class="btn btn-outline-dark me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Server Portal</Link><Link role="button" to="/manager" className="btn btn-outline-dark me-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>Manager Portal</Link></>
                        }

                        <button style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }} class="btn btn-outline-dark me-3" onClick={() => credentials.logOut()}> Sign Out </button> */}

                    </center>
                </div>
            }
        </div>

    );

}




export default GoogleAuth