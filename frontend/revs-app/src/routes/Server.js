import EntityTable from "../components/EntityTable"
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import AccessibilityModal from "../components/AccessibilityModal";
import FocusLock from 'react-focus-lock';
import * as credentials from '../components/credentials.js'
import { BrowserRouter as Navigate } from 'react-router-dom'
import ArrowKeyNav from "../components/Keyboard";
import ManagerHeader from "../components/ManagerHeader";
/**
 * checks if the person logged in is an employee and shows all current employees
 *
 * @return [return description]
 */
function Server() {
    return (
        <div>
            <ArrowKeyNav>
            {!credentials.isLoggedIn() &&
                <Navigate to="/"></Navigate>
            }
            {!credentials.isManager() &&
                <Navigate to="/"></Navigate>
            }
            {JSON.parse(localStorage.getItem("screenfocus")) && (<FocusLock autoFocus returnFocus>
                <ManagerHeader />
                <div className="container w-100">
                    <div className="table-responsive text-nowrap w-100">
                        <EntityTable entityName="server" addOption />
                    </div>
                </div>
                <AccessibilityModal />
            </FocusLock>)}
            {!(JSON.parse(localStorage.getItem("screenfocus"))) && (<div>
                <ManagerHeader />
                <div className="container w-100">
                    <div className="table-responsive text-nowrap w-100">
                        <EntityTable entityName="server" addOption />
                    </div>
                </div>
                <AccessibilityModal />
            </div>)}
            </ArrowKeyNav>
        </div>
    );
}
//menu items, employees, inventory, orderhistroy

export default Server