import React from 'react'
import { useState } from "react";
import CustomerHeader from '../components/CustomerHeader'
import Maps from '../components/Maps';
import OrderMenuPage from '../components/OrderMenuPage';
import FocusLock from 'react-focus-lock';
import AccessibilityModal from '../components/AccessibilityModal';
import ArrowKeyNav from '../components/Keyboard';

// Customer page where orders will happen as well
/**
 * this function will show the customer side of the web app and all information for the customer to see
 *
 * @return  {[type]}  returns a customer view of the webpage 
 */
function Customer() {
    return (
        <ArrowKeyNav>
        <div>
            {JSON.parse(localStorage.getItem("screenfocus")) && (<FocusLock autoFocus returnFocus>
                <CustomerHeader />
                <div className="row">
                    <div className="col-12">
                        <OrderMenuPage type="customer" />
                    </div>
                </div>
                <AccessibilityModal />
            </FocusLock>)}
            {!(JSON.parse(localStorage.getItem("screenfocus"))) && (<div>
                <CustomerHeader />
                <div className="row">
                    <div className="col-12">
                        <OrderMenuPage type="customer" />
                    </div>
                </div>
                <AccessibilityModal />
            </div>)}
        </div>
        </ArrowKeyNav>
    )
}

export default Customer;