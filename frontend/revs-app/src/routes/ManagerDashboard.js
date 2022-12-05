import MangerPage from "../components/Manager";
import React from 'react'
import AccessibilityModal from "../components/AccessibilityModal";
import FocusLock from 'react-focus-lock';

const Manager = () => {
    return (
        <div>
            {JSON.parse(localStorage.getItem("screenfocus")) && (<FocusLock autoFocus returnFocus>
                <MangerPage />
                <AccessibilityModal />
            </FocusLock>)}
            {!(JSON.parse(localStorage.getItem("screenfocus"))) && (<div>
                <MangerPage />
                <AccessibilityModal />
            </div>)}
        </div>
    )
}

export default Manager;