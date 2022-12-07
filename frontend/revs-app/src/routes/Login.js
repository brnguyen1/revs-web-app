import EmployeeLoginPage from "../components/EmployeeLoginPage";
import React from 'react';
import AccessibilityModal from "../components/AccessibilityModal";
import { BrowserView, MobileView } from 'react-device-detect';
import FocusLock from 'react-focus-lock';
import Maps from "../components/Maps";
import CustomerHeader from "../components/CustomerHeader";
import ArrowKeyNav from "../components/Keyboard";

const Login = () => {
    return (
        <>
            <BrowserView>
                <ArrowKeyNav>
                    <div>
                        {JSON.parse(localStorage.getItem("screenfocus")) && (<FocusLock autoFocus returnFocus>
                            <EmployeeLoginPage />
                            <AccessibilityModal />
                        </FocusLock>)}
                        {!(JSON.parse(localStorage.getItem("screenfocus"))) && (<div>
                            <EmployeeLoginPage />
                            <AccessibilityModal />
                        </div>)}
                    </div>
                </ArrowKeyNav>
            </BrowserView>
            <MobileView>
                <CustomerHeader />
                <div className="container-fluid justify-content-center text-center mx-auto p-5">
                    <h4>Come visit us!</h4>
                    <h3>275 Joe Routt Blvd</h3>
                    <h6>College Station, TX 77840</h6>
                    <br></br>
                    <h5><b><u>Hours</u></b></h5>
                    <p>Monday-Friday: 10AM - 10PM <br></br> Saturday: 11AM - 8PM <br></br> Sunday: 11AM - 9PM</p>
                    <Maps />
                </div>
            </MobileView>
        </>
    )
}

export default Login;