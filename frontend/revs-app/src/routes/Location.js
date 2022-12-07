import React from 'react'
import Maps from '../components/Maps';
import FocusLock from 'react-focus-lock';
import AccessibilityModal from '../components/AccessibilityModal';
import EmployeeHeader from '../components/EmployeeHeader';
import * as credentials from '../components/credentials.js' 
import { Navigate } from 'react-router-dom';

// Customer page where orders will happen as well
/**
 * this will creae a page for the user to see the locaton of revs and check how far away they are
 *
 * @return  [return description]
 */
function Location() {
    return (
        <div>
            {JSON.parse(localStorage.getItem("screenfocus")) && (<FocusLock autoFocus returnFocus>
                <EmployeeHeader />
                <div >
                    <center>
                        <break></break>
                        <h3>275 Joe Routt Blvd</h3>
                        <h6>College Station, TX 77840</h6>
                        <br></br>
                        <h5><b><u>Hours</u></b></h5>
                        <p>Monday-Friday: 10AM - 10PM <br></br> Saturday: 11AM - 8PM <br></br> Sunday: 11AM - 9PM</p>
                        <Maps></Maps>
                    </center>
                </div>
                <AccessibilityModal />
            </FocusLock>)}
            {!(JSON.parse(localStorage.getItem("screenfocus"))) && (<div>
                <EmployeeHeader />
                <div>
                    <center>
                        <break></break>
                        <h3>275 Joe Routt Blvd</h3>
                        <h6>College Station, TX 77840</h6>
                        <br></br>
                        <h5><b><u>Hours</u></b></h5>
                        <p>Monday-Friday: 10AM - 10PM <br></br> Saturday: 11AM - 8PM <br></br> Sunday: 11AM - 9PM</p>
                        <Maps></Maps>
                    </center>
                </div>
                <AccessibilityModal />
            </div>)}
        </div>
    )
}

export default Location;