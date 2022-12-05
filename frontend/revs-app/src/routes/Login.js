import EmployeeLoginPage from "../components/EmployeeLoginPage";
import React from 'react';
import AccessibilityModal from "../components/AccessibilityModal";
import { BrowserView, MobileView } from 'react-device-detect';
import FocusLock from 'react-focus-lock';
import Maps from "../components/Maps";


const Login = () => {
    return (
        <>
            <BrowserView>
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
            </BrowserView>
            <MobileView>
                <div>
                    <Maps/>
                </div>
            </MobileView>
        </>
    )
}

export default Login;