import OrderMenuPage from "../components/OrderMenuPage";
import React from 'react'
import EmployeeHeader from "../components/EmployeeHeader";
import AccessibilityModal from "../components/AccessibilityModal";

const OrderMenu = () => {
    return (
        <div>
            <EmployeeHeader />
            <OrderMenuPage />
            <AccessibilityModal />
        </div>
    )
}

export default OrderMenu;