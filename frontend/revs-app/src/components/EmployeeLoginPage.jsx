import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHeader from "./CustomerHeader";
import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
// export default function Login() {



// }
const EmployeeLoginPage = () => {
    // return (
    //     <div>
    //         <CustomerHeader />
    //         <div>Employee Login Page</div>  
    //     </div>
    // )

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    function validateForm() {
        //use backend to verify if valid username and password 

        //return username.length > 0 && password.length > 0;
        return username === "529006731" && password === "password";
    
    }
    let navigate = useNavigate(); 
        
    const routeChange = () =>{ 
        let path = '/ordermenu'; 
        navigate(path);
      }
    function handleSubmit(event) {
        
        
        routeChange();
        event.preventDefault();

    }

    return (
        <div className="Login">
        <CustomerHeader />
        <div>Employee Login Page</div>  
        <div><h1></h1></div>  
        <Form onSubmit={handleSubmit}>

            <Form.Group size="lg" controlId="username">

            <Form.Label>Username</Form.Label>

            <Form.Control

                autoFocus

                type="username"

                value={username}

                onChange={(e) => setUsername(e.target.value)}

            />

            </Form.Group>

            <Form.Group size="lg" controlId="password">

            <Form.Label>Password</Form.Label>

            <Form.Control

                type="password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

            />

            </Form.Group>

            <Button block size="lg" type="submit" disabled={!validateForm()}>

            Login
            

            </Button>

        </Form>

        </div>

    );
}

export default EmployeeLoginPage;