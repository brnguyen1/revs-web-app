import { Navigate } from "react-router-dom";

const status = localStorage.getItem("status");
/**
 * will check if user is logged in
 *
 * @return  {[type]}  will return true or false if user is logged in
 */
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
/**
 * will check if the user is a manager 
 *
 * @return  {[type]}  returns true or false if the user is a manager or not
 */
export function isManager(){
    const managerStat = localStorage.getItem("ismanager");
    if(managerStat.toLowerCase() === "false")
    {
        return false;
    }
    return true;
}
/**
 * this function will logout the user
 *
 * 
 */
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

