import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHeader from "./CustomerHeader";
import React from "react";
import GoogleAuth from "./GoogleAuth";
import * as credentials from './credentials.js'
import EmployeeHeader from "./EmployeeHeader";
import GoogleTranslate from "./GoogleTranslate";

const EmployeeLoginPage = () => {

    return (
        <div>

            {credentials.isLoggedIn() &&
                <EmployeeHeader />
            }
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
            <h4 className="text-center mt-4" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 20}px` }}>Employee Login Page</h4>
            {/* <center><GoogleTranslate></GoogleTranslate></center> */}
            <div className="d-flex justify-content-center mt-5">
                <GoogleAuth />
            </div>
        </div>
    );

}

export default EmployeeLoginPage;