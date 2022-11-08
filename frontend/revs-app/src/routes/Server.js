import EntityTable from "../components/EntityTable"
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHeader from "../components/CustomerHeader";

function Server() {
    return (
        <div>
            <CustomerHeader />
            <div className="container w-100">
                <div className="table-responsive text-nowrap w-100">
                    <EntityTable entityName="server" />
                </div>
            </div>
        </div>
    );
}

export default Server