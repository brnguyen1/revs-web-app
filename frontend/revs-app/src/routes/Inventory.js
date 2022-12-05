import EntityTable from "../components/EntityTable"
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeHeader from "../components/EmployeeHeader";
import AccessibilityModal from "../components/AccessibilityModal";
import FocusLock from 'react-focus-lock';
import * as credentials from '../components/credentials.js'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function Inventory() {
    return (
        <div>
            {JSON.parse(localStorage.getItem("screenfocus")) && (<FocusLock autoFocus returnFocus>
                <EmployeeHeader />
                <div style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 12}px` }}>View Menu Items</div>
                <div className="container w-100">
                    {!credentials.isLoggedIn() &&
                        <Navigate to="/"></Navigate>
                    }
                    {!credentials.isManager() &&
                        <Navigate to="/"></Navigate>
                    }
                    <div className="table-responsive text-nowrap w-100">

                        <EntityTable entityName="inventory" addOption />
                    </div>
                </div>
                <AccessibilityModal />
            </FocusLock>)}
            {!(JSON.parse(localStorage.getItem("screenfocus"))) && (<div>
                <EmployeeHeader />
                <div style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 12}px` }}>View Menu Items</div>
                <div className="container w-100">
                    {!credentials.isLoggedIn() &&
                        <Navigate to="/"></Navigate>
                    }
                    {!credentials.isManager() &&
                        <Navigate to="/"></Navigate>
                    }
                    <div className="table-responsive text-nowrap w-100">

                        <EntityTable entityName="inventory" addOption />
                    </div>
                </div>
                <AccessibilityModal />
            </div>)}
        </div>
    );
}

export default Inventory;