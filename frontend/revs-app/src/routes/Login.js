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
                <CustomerHeader/>
                <div className="container-fluid justify-content-center text-center mx-auto p-5">
                    <h1> Come visit us!</h1>
                    <Maps/>
                </div>
            </MobileView>
        </>
    )
}

export default Login;