import EmployeeLoginPage from "../components/EmployeeLoginPage";
import React from 'react';
import AccessibilityModal from "../components/AccessibilityModal";
import FocusLock from 'react-focus-lock';


const EmployeeLogin = () => {
    return (
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
    )
}

export default EmployeeLogin;