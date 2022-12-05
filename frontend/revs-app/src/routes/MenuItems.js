import EntityTable from "../components/EntityTable"
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeHeader from "../components/EmployeeHeader";
import * as credentials from '../components/credentials.js'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AccessibilityModal from "../components/AccessibilityModal";

function MenuItems() {
    return (
        <div>
            {!credentials.isLoggedIn() &&
                <Navigate to="/"></Navigate>
            }
            {!credentials.isManager() &&
                <Navigate to="/"></Navigate>
            }
            <EmployeeHeader />
            <div style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 12}px` }}>View Menu Items</div>
            <div className="container w-100">

                <div className="table-responsive text-nowrap w-100">

                    <EntityTable entityName="menu" addOption />
                </div>
            </div>
            <AccessibilityModal />
        </div>
    );
}

export default MenuItems;