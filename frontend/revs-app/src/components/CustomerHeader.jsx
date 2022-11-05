import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const CustomerHeader = () => {
    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    Rev's American Grill
                </a>
                <div className="d-flex justify-content-between">
                    <Link role="button" to="/employeelogin" className="btn btn-outline-secondary me-3">Employee Login</Link>
                    <Link role="button" to="/checkout" className="btn btn-danger">Checkout</Link>
                </div>
            </div>
        </nav>
    )
}

export default CustomerHeader;