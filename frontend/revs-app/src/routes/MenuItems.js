import EntityTable from "../components/EntityTable"
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import * as credentials from '../components/credentials.js'
import { BrowserRouter as Navigate } from 'react-router-dom'
import AccessibilityModal from "../components/AccessibilityModal";
import FocusLock from 'react-focus-lock';
import ArrowKeyNav from "../components/Keyboard";
import ManagerHeader from "../components/ManagerHeader";
/**
 * this will create a page for the emplyees to see all menu items 
 *
 * @return  returns a page to see menu items
 */
function MenuItems() {
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
                <div style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 12}px` }}>View Menu Items</div>
                <div className="container w-100">

                    <div className="table-responsive text-nowrap w-100">

                        <EntityTable entityName="menu" addOption />
                    </div>
                </div>
                <AccessibilityModal />
            </FocusLock>)}
            {!(JSON.parse(localStorage.getItem("screenfocus"))) && (<div>
                <ManagerHeader />
                <div style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 12}px` }}>View Menu Items</div>
                <div className="container w-100">

                    <div className="table-responsive text-nowrap w-100">

                        <EntityTable entityName="menu" addOption />
                    </div>
                </div>
                <AccessibilityModal />
            </div>)}
            </ArrowKeyNav>
        </div>
    );
}

export default MenuItems;