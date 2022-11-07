import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeHeader = () => {
    return (
        <nav class="navbar bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">
                    Rev's American Grill - Employee Options
                </a>
                <div class="d-flex justify-content-between">
                    {/* <Link role="button" to="/" class="btn btn-outline-secondary me-3">Home</Link> */}
                    <Link role="button" to="/ordermenu" class="btn btn-outline-secondary me-3">Create Order</Link>
                    <Link role="button" to="/orders" class="btn btn-outline-secondary me-3">View Orders</Link>
                    <Link role="button" to="/menuitems" class="btn btn-outline-secondary me-3">View Menu Items</Link>
                    <Link role="button" to="/employeelogin" class="btn btn-outline-secondary me-3">Logout</Link>
                    <Link role="button" to="/manager" class="btn btn-outline-secondary me-3">Manger Portal</Link>

                
                </div>
            </div>
        </nav>
    )
}

export default EmployeeHeader;