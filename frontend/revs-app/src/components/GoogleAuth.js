import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHeader from "./CustomerHeader";
import {useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode';
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const GoogleAuth = () => {
    
    const [user,setUser] = useState({});

    function handleCallbackResponse(response){
        console.log("Encoded JWT ID token: " + response.credential);
        var auth = jwt_decode(response.credential);
        setUser(auth);
        localStorage.setItem("user",JSON.stringify(auth));
        localStorage.setItem("status","1");
        document.getElementById("signInDiv").hidden = true;           
    };

    function handleSignOut(event){
        setUser({});
        localStorage.setItem("status","0");
        localStorage.removeItem("user");
        document.getElementById("signInDiv").hidden = false;
        document.getElementById("signInDiv").hidden = false;     
    };

    function isSignedIn(){
        if(localStorage.getItem("status") == "1")
        {
            console.log("isSignedIn: True");
            return true;
        }
        else
        {
            console.log("isSignedIn: False");
            return false;
        }
    }
    

    useEffect(() => {
        if(isSignedIn())
        {
            console.log("Use E : " + JSON.parse(localStorage.getItem("user")));
            console.log("Use E 2 : " + user);
            setUser(JSON.parse(localStorage.getItem("user")));
        }
        else
        {
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
        // eslint-disable-next-line no-undef
        //google.accounts.id.prompt();    
        }     
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
                        <button onClick = {(e) => handleSignOut(e)}> Sign Out </button>
                    </center>
                </div>
            }    
        </div>

    );

}



export default GoogleAuth