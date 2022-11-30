import EntityTable from "../components/EntityTable"
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeHeader from "../components/EmployeeHeader";
import * as credentials from '../components/credentials.js'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

function Orders() {
    return (
        <div>
            {!credentials.isLoggedIn() &&
                <Navigate to = "/"></Navigate>
            }
            {!credentials.isManager() &&
                <Navigate to = "/"></Navigate>
            }
            <EmployeeHeader />
            <div>View Orders</div>
            <div className="container w-100">

                <div className="table-responsive text-nowrap w-100">

                    <EntityTable entityName="orders" />
                </div>
            </div>
        </div>
    );
}

export default Orders;