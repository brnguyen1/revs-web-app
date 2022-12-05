import EntityTable from "../components/EntityTable"
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeHeader from "../components/EmployeeHeader";
import AccessibilityModal from "../components/AccessibilityModal";
import * as credentials from '../components/credentials.js'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

function Server() {
    return (
        <div>
            {!credentials.isLoggedIn() &&
                <Navigate to = "/"></Navigate>
             }
            {!credentials.isManager() &&
                <Navigate to = "/"></Navigate>
            }
            <EmployeeHeader />
            <div className="container w-100">
                <div className="table-responsive text-nowrap w-100">
                    <EntityTable entityName="server" addOption/>
                </div>
            </div>
            <AccessibilityModal />
        </div>
    );
}
//menu items, employees, inventory, orderhistroy

export default Server