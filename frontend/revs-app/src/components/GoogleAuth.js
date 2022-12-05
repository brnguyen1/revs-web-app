import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHeader from "./CustomerHeader";
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { employeeLogin, employeeLogout, signInStatus } from "../redux-slices/employee-slice";
import { useDispatch } from 'react-redux';
import * as credentials from './credentials.js'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import axios from "axios";

const google = window.google;

const GoogleAuth = () => {

    const [user, setUser] = useState({});
    const dispatch = useDispatch();

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
                    document.location.reload();

                }
            })
        }

    };

    function handleSignOut(event) {
        setUser({});
        localStorage.removeItem("user");
        localStorage.setItem("status", "0");
        document.getElementById("signInDiv").hidden = false;
        document.location.reload();
        <Navigate to="/"></Navigate>
        // dispatch(employeeLogout());
    };

    useEffect(() => {
        if (credentials.isLoggedIn()) {
            setUser(JSON.parse(localStorage.getItem("user")));
            document.getElementById("signInDiv").hidden = true;
        }
        try {
            google.accounts.id.initialize({
                client_id: "471568519931-j5j28lf530at8p85mm854mbal1s10f8e.apps.googleusercontent.com",
                callback: handleCallbackResponse
            });
        }
        catch (e) {
            console.log("catch statement encountered attempting initialize")
        }

        try {
            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                { theme: "outline", size: "large" }
            );
        }
        catch (e) {
            console.log("catch statement encountered attempting render")
        }

    }, []);

    return (
        <div className="GoogleAuth">
            <div id="signInDiv"></div>
            {credentials.isLoggedIn() &&
                <div>
                    <center>
                        <img src={user.picture}></img>
                        {credentials.isManager() &&
                            <h3>{"Logged In: Manager"}</h3>
                        }
                        {!credentials.isManager() &&
                            <h3>{"Logged In: Server"}</h3>
                        }

                        <p>{user.name}</p>
                        <p>{user.email}</p>

                        {credentials.isManager() &&
                            <><Link role="button" to="/ordermenu" class="btn btn-outline-secondary me-3">Server Portal</Link><Link role="button" to="/manager" className="btn  btn-outline-secondary me-3">Manager Portal</Link></>
                        }

                        <button class="btn btn-outline-secondary me-3" onClick={(e) => handleSignOut(e)}> Sign Out </button>

                    </center>
                </div>
            }
        </div>

    );

}




export default GoogleAuth