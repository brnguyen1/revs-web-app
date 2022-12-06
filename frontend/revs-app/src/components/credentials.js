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
    return localStorage.getItem("ismanager");
}

export function logOut()
{
    if(isLoggedIn())
    {
        localStorage.removeItem("user");
        localStorage.removeItem("status");
        localStorage.removeItem("employee_id");
        localStorage.removeItem("ismanager");
        document.location.reload();
        <Navigate to="/"/>
    }
}

