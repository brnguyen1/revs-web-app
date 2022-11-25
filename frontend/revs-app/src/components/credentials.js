import * as gAuth from "./GoogleAuth";

const status = localStorage.getItem("status");

export function isLoggedIn(){
    if(status == "1")
    {
        return true;
    }
    else
    {
        return false;
    }
}

export function isManager(){
    if(isLoggedIn())
    {
        const cred = JSON.parse(localStorage.getItem("user"));
        if(cred.email == "binhdocao@tamu.edu")
        {
            return true;
        }
        else
            return false;
    }
    return false;
}

export function logOut()
{
    if(isLoggedIn())
    {
        localStorage.removeItem("user");
        localStorage.setItem("status","0");
        document.location.reload();
    }
    document.location.reload();
}
