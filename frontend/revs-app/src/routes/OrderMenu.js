import OrderMenuPage from "../components/OrderMenuPage";
import React from 'react'
import EmployeeHeader from "../components/EmployeeHeader";
import AccessibilityModal from "../components/AccessibilityModal";
import FocusLock from 'react-focus-lock';

const OrderMenu = () => {
    return (
        <div>
            {JSON.parse(localStorage.getItem("screenfocus")) && (<FocusLock autoFocus returnFocus>
                <EmployeeHeader />
                <OrderMenuPage />
                <AccessibilityModal />
            </FocusLock>)}
            {!(JSON.parse(localStorage.getItem("screenfocus"))) && (<div>
                <EmployeeHeader />
                <OrderMenuPage />
                <AccessibilityModal />
            </div>)}
        </div>
    )
}

export default OrderMenu;