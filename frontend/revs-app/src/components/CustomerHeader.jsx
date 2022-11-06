import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const CustomerHeader = () => {
    return (
        <nav class="navbar bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">
                    Rev's American Grill
                </a>
                <div class="d-flex justify-content-between">
                    <Link role="button" to="/" class="btn btn-outline-secondary me-3">Home</Link>
                    <Link role="button" to="/employeelogin" class="btn btn-outline-secondary me-3">Employee Login</Link>
                    <Link role="button" to="/checkout" class="btn btn-danger">Checkout</Link>
                </div>
            </div>
        </nav>
    )
}

export default CustomerHeader;