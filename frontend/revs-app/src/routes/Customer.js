import React from 'react'
import PlaceAnOrder from '../components/PlaceAnOrder';
import CustomerHeader from '../components/CustomerHeader'
import Maps from '../components/Maps';

// Customer page where orders will happen as well
function Customer() {
    return (
        <div>
            <CustomerHeader />
            <PlaceAnOrder />
            <Maps />
        </div>
    )
}

export default Customer;