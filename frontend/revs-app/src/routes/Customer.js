import React from 'react'
import CustomerHeader from '../components/CustomerHeader'
import OrderMenuPage from '../components/OrderMenuPage';
import FocusLock from 'react-focus-lock';
import AccessibilityModal from '../components/AccessibilityModal';
import ArrowKeyNav from '../components/Keyboard';

// Customer page where orders will happen as well
/**
 * this function will show the customer side of the web app and all information for the customer to see
 *
 * @return  returns a customer view of the webpage 
 */
function Customer() {
    return (
        <ArrowKeyNav>
            <div>
                {JSON.parse(localStorage.getItem("screenfocus")) && (<FocusLock autoFocus returnFocus>
                    <CustomerHeader />
                    <OrderMenuPage type="customer" />
                    <AccessibilityModal />
                </FocusLock>)}
                {!(JSON.parse(localStorage.getItem("screenfocus"))) && (<div>
                    <CustomerHeader />
                    <OrderMenuPage type="customer" />
                    <AccessibilityModal />
                </div>)}
            </div>
        </ArrowKeyNav>
    )
}

export default Customer;