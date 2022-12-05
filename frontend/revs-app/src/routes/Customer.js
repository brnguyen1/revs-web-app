import React from 'react'
import { useState } from "react";
import CustomerHeader from '../components/CustomerHeader'
import Maps from '../components/Maps';
import OrderMenuPage from '../components/OrderMenuPage';
import FocusLock from 'react-focus-lock';
import AccessibilityModal from '../components/AccessibilityModal';

// Customer page where orders will happen as well
function Customer() {
    const [fontSize, setFontSize] = useState(16);
    return (
        <div>
            <CustomerHeader />
            <div className="row">
                <div className="col-12">
                    <OrderMenuPage type="customer" />
                </div>
                <break></break>
                <div className="col-12">
                    <Maps />
                </div>
            </div>
            <AccessibilityModal />
        </div>
    )
}

export default Customer;