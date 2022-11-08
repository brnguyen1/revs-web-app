import EntityTable from "../components/EntityTable"
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeHeader from "../components/EmployeeHeader";

function MenuItems() {
    return (
        <div>
            <EmployeeHeader />
            <div>View Menu Items</div>
            <div className="container w-100">
            
                <div className="table-responsive text-nowrap w-100">

                    <EntityTable entityName="menu" />
                </div>
            </div>
        </div>
    );
}

export default MenuItems;