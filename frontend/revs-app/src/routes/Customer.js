import React from 'react'
import CustomerHeader from '../components/CustomerHeader'
import Maps from '../components/Maps';
import OrderMenuPage from '../components/OrderMenuPage';

// Customer page where orders will happen as well
function Customer() {
    return (
        <div>
            <CustomerHeader />
            <div className="row">
                <div className="col-12">
                    <OrderMenuPage type ="customer"/>
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