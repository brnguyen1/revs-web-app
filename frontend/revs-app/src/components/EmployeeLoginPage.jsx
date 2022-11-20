import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHeader from "./CustomerHeader";
import {useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode';
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import GoogleAuth from "./GoogleAuth";

const EmployeeLoginPage = () => {

    return (
        <div>
            <CustomerHeader />
            <h4 className="text-center mt-4">Employee Login Page</h4>
            <div className="d-flex justify-content-center mt-5">
            <GoogleAuth />
            </div>
        </div>

    );

}

export default EmployeeLoginPage;