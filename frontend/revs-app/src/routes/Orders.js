import EntityTable from "../components/EntityTable"

import "bootstrap/dist/css/bootstrap.min.css";
import CustomerHeader from "../components/CustomerHeader";

function Orders() {
    return (
        <div>
            <CustomerHeader />
            <div className="container w-100">
                <div className="table-responsive text-nowrap w-100">
                    <EntityTable entityName="orders" />
                </div>
            </div>
        </div>
    );
}

export default Orders