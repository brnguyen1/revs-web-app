import { Navigate } from "react-router-dom";

const status = localStorage.getItem("status");

export function isLoggedIn(){
    if(status === "1")
    {
        return true;
    }
    else
    {
        return false;
    }
}

export function isManager(){
    const managerStat = localStorage.getItem("ismanager");
    if(managerStat.toLowerCase() === "false")
    {
        return false;
    }
    return true;
}

export function logOut()
{
    if(isLoggedIn())
    {
        localStorage.removeItem("user");
        localStorage.removeItem("status");
        localStorage.removeItem("employee_id");
        <Navigate to="/"/>
        document.location.reload();
    }
}

