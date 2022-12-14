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
 * checks if users are logged in and allows them to view all previous orders
 *
 * @return  returns a view to see all past orders
 */
function Orders() {
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
                    <div style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 12}px` }}>View Orders</div>
                    <div className="container w-100">

                        <div className="table-responsive text-nowrap w-100">

                            <EntityTable entityName="orders" />
                        </div>
                    </div>
                    <AccessibilityModal />
                </FocusLock>)}
                {!(JSON.parse(localStorage.getItem("screenfocus"))) && (<div>
                    <ManagerHeader />
                    <div style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 12}px` }}>View Orders</div>
                    <div className="container w-100">

                        <div className="table-responsive text-nowrap w-100">

                            <EntityTable entityName="orders" />
                        </div>
                    </div>
                    <AccessibilityModal />
                </div>)}
            </ArrowKeyNav>
        </div>
    );
}

export default Orders;