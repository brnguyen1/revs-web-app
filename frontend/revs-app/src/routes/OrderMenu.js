import OrderMenuPage from "../components/OrderMenuPage";
import React from 'react'
import EmployeeHeader from "../components/EmployeeHeader";
import AccessibilityModal from "../components/AccessibilityModal";
import FocusLock from 'react-focus-lock';
import ArrowKeyNav from "../components/Keyboard";
/**
 * this function will create a page for emplyees to create orders for customers 
 *
 * @return returns a page for emplyees to view
 */
const OrderMenu = () => {
    return (
        <div>
            <ArrowKeyNav>
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
            </ArrowKeyNav>
        </div>
    )
}

export default OrderMenu;