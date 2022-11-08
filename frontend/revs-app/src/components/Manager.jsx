import ManagerHeader from "./MangerHeader";
import React from 'react'
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Manager = () => {
    return(
        <div>
            <ManagerHeader />
            <div class="d-flex flex-wrap justify-content-evenly align-contents-around">
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                        <Link role="button" to="/WST" class="btn btn-outline-secondary me-3">What Sales Together</Link>  
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                        <Link role="button" to="/salesreport" class="btn btn-outline-secondary me-3">Sales Report</Link>  
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                        <Link role="button" to="/excessreport" class="btn btn-outline-secondary me-3">Excess Report</Link>  
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                        <Link role="button" to="/restockreport" class="btn btn-outline-secondary me-3">Restock Report</Link>  
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                        <Link role="button" to="/menuitems" class="btn btn-outline-secondary me-3">Menu Items</Link>  
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                        <Link role="button" to="/additems" class="btn btn-outline-secondary me-3">Add Items</Link>  
                        </h5>
                    </div>
                </div>
                <div class="card text-center w-25 me-1 mb-4">
                    <div class="card-body">
                        <h5 class="card-title">
                        <Link role="button" to="/updateitems" class="btn btn-outline-secondary me-3">Update Items</Link>  
                        </h5>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}


export default Manager;