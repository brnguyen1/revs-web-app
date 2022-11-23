import React from 'react'
import { useState } from "react";
import CustomerHeader from '../components/CustomerHeader'
import Maps from '../components/Maps';
import OrderMenuPage from '../components/OrderMenuPage';
import FocusLock from 'react-focus-lock';

// Customer page where orders will happen as well
function Customer() {
    const [fontSize, setFontSize] = useState(16);
    return (
        <div>
            <CustomerHeader />
            <button onClick={() => setFontSize(fontSize + 2)}>
                Increase Font Size
            </button>
            <button onClick={() => setFontSize(fontSize - 2)}>
                Decrease Font Size
            </button>

            <div className="row" >
                <div className="col-12" style={{
                    fontSize: `${fontSize}px`
                }}>
                    <OrderMenuPage type="customer" />
                </div>
                <break></break>
                <div className="col-12">

                    <Maps />
                </div>
            </div>
        </div>
    )
}

export default Customer;