import ManagerHeader from "./ManagerHeader";
import React from 'react'
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Manager = () => {
    return(
        <div>
            <ManagerHeader />
            <div className="d-flex flex-wrap justify-content-evenly align-contents-around">
                <div className="card text-center w-25 me-1 mb-4">
                    <div className="card-body">
                        <h5 className="card-title">
                        <Link role="button" to="/WST" className="btn btn-outline-secondary me-3">What Sales Together</Link>  
                        </h5>
                    </div>
                </div>
                <div className="card text-center w-25 me-1 mb-4">
                    <div className="card-body">
                        <h5 className="card-title">
                        <Link role="button" to="/salesreport" className="btn btn-outline-secondary me-3">Sales Report</Link>  
                        </h5>
                    </div>
                </div>
                <div className="card text-center w-25 me-1 mb-4">
                    <div className="card-body">
                        <h5 className="card-title">
                        <Link role="button" to="/excessreport" className="btn btn-outline-secondary me-3">Excess Report</Link>  
                        </h5>
                    </div>
                </div>
                <div className="card text-center w-25 me-1 mb-4">
                    <div className="card-body">
                        <h5 className="card-title">
                        <Link role="button" to="/restockreport" className="btn btn-outline-secondary me-3">Restock Report</Link>  
                        </h5>
                    </div>
                </div>
                <div className="card text-center w-25 me-1 mb-4">
                    <div className="card-body">
                        <h5 className="card-title">
                        <Link role="button" to="/menuitems" className="btn btn-outline-secondary me-3">Menu Items</Link>  
                        </h5>
                    </div>
                </div>
                <div className="card text-center w-25 me-1 mb-4">
                    <div className="card-body">
                        <h5 className="card-title">
                        <Link role="button" to="/additems" className="btn btn-outline-secondary me-3">Add Items</Link>  
                        </h5>
                    </div>
                </div>
                <div className="card text-center w-25 me-1 mb-4">
                    <div className="card-body">
                        <h5 className="card-title">
                        <Link role="button" to="/updateitems" className="btn btn-outline-secondary me-3">Update Items</Link>  
                        </h5>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}


export default Manager;