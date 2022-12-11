import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeHeader from "../components/EmployeeHeader";
import ArrowKeyNav from '../components/Keyboard';
import AccessibilityModal from '../components/AccessibilityModal';
import CurrentQueue from '../components/CurrentQueue';

function Queue() {
    return (
        <ArrowKeyNav>
            <EmployeeHeader />
            <CurrentQueue/>
            <AccessibilityModal />
        </ArrowKeyNav>
    )
}

export default Queue;