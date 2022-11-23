import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHeader from "./CustomerHeader";
import {useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode';
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import GoogleAuth from "./GoogleAuth";

import { useDispatch } from 'react-redux';
import { employeeLogin } from "../redux-slices/employee-slice";

const EmployeeLoginPage = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <CustomerHeader />
            {/* <h4 class="text-center mt-4">Employee Login Page</h4>
            <div class="d-flex justify-content-center mt-5">
                <Form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <Form.Group size="lg" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                autoFocus
                                type="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <div class="mt-5 d-flex justify-content-center">
                        <Button block size="lg" type="submit" onClick={() => { dispatch(employeeLogin({ username: username, password: password })) }}>
                            Login
                        </Button>
                    </div>
                </Form> */}
            <h4 className="text-center mt-4">Employee Login Page</h4>
            <div className="d-flex justify-content-center mt-5">
            <GoogleAuth />
            </div>
        </div>

    );

}

export default EmployeeLoginPage;