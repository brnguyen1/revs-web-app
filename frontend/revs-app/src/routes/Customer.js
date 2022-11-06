import { React } from 'react'
import CustomerHeader from '../components/CustomerHeader'
import Maps from '../components/Maps';
import EntityTable from "../components/EntityTable";
// Customer page where orders will happen as well
function Customer() {
    return (
        <div>
            <CustomerHeader />
            <Maps />
        </div>
    )
}

export default Customer;