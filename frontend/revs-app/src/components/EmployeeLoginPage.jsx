import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHeader from "./CustomerHeader";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { employeeLogin } from "../redux-slices/employee-slice";

const EmployeeLoginPage = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    function validateForm() {
        //use backend to verify if valid username and password 
        return username === "529006731" && password === "password";
    }
    let navigate = useNavigate();

    const routeChange = () => {
        let path = '/ordermenu';
        navigate(path);
    }
    function handleSubmit(event) {
        routeChange();
        event.preventDefault();
    }

    return (
        <div>
            <CustomerHeader />
            <h4 class="text-center mt-4">Employee Login Page</h4>
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
                </Form>
            </div>
        </div>

    );
}

export default EmployeeLoginPage;