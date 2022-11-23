import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHeader from "./CustomerHeader";
import {useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode';
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { employeeLogin, employeeLogout, signInStatus } from "../redux-slices/employee-slice";
import { useDispatch } from 'react-redux';


const GoogleAuth = () => {
    
    const [user,setUser] = useState({});
    const dispatch = useDispatch();

    function handleCallbackResponse(response){
        if(!isSignedIn())
        {
            console.log("Encoded JWT ID token: " + response.credential);
            var auth = jwt_decode(response.credential);
            setUser(auth);
            localStorage.setItem("user",JSON.stringify(auth));
        }
        localStorage.setItem("status","1");
        document.getElementById("signInDiv").hidden = true;   
       // dispatch(employeeLogin({ username: auth.email, password: auth.name }));               
    };

    function handleSignOut(event){
        setUser({});
        localStorage.removeItem("user"); 
        localStorage.setItem("status","0");
        document.getElementById("signInDiv").hidden = false;    
       // dispatch(employeeLogout());
    };

    function isSignedIn(){
        if(localStorage.getItem("status") == "1")
        {
            return true;
        }
        else
        {
 
            return false;
        }
    }
    

    useEffect(() => {
            if(isSignedIn())
            {
                setUser(JSON.parse(localStorage.getItem("user")));
                document.getElementById("signInDiv").hidden = true;   
            }
            // eslint-disable-next-line no-undef
            google.accounts.id.initialize({
                client_id: "471568519931-j5j28lf530at8p85mm854mbal1s10f8e.apps.googleusercontent.com",
                callback: handleCallbackResponse
            });
            // eslint-disable-next-line no-undef
            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                {theme: "outline", size: "large"}
            );  
          
    },[]);
    
    return (
        <div className = "GoogleAuth">
        <div id = "signInDiv"></div>
            {isSignedIn() &&
                <div>
                    <center>
                        <h2>{"Logged In"}</h2>
                        <img src = {user.picture}></img>
                        <p>{user.email}</p>
                        <Link role="button" to="/employees" class="btn btn-outline-secondary me-3">Employees</Link>
                        <Link role="button" to="/manager" className="btn  btn-outline-secondary me-3">Manager Portal</Link>
                        
                        <button class = "btn btn-outline-secondary me-3" onClick = {(e) => handleSignOut(e)}> Sign Out </button>
                        
                    </center>
                </div>
            }    
        </div>

    );

}



export default GoogleAuth