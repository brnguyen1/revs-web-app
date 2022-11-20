import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHeader from "./CustomerHeader";
import {useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode';
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";




const GoogleAuth = () => {
    const [user,setUser] = useState({});

    function handleCallbackResponse(response){
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
    };

    function handleSignOut(event){
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    };


    useEffect(() => {
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

    },[]);

    const onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
          this.props.signIn();
        } else {
          this.props.signOut();
        }
      };

    const onSignInClick = () => {
        user.props.signIn();
      };
    
    const onSignOutClick = () => {
        user.props.signOut();
    };
    
    return (
        <div className = "GoogleAuth">
        <div id = "signInDiv"></div>
            {Object.keys(user).length != 0 &&   
            <button onClick = {(e) => handleSignOut(onSignOutClick)}> Sign Out </button>
            }   
            {user &&
                <div>
                    <img src = {user.picture}></img>
                </div>
            }    
        </div>

    );

}

const mapStateToProps = state => ({
    ...state
});



export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);