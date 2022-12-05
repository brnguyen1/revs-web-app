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
        localStorage.setItem("status","0");
        document.location.reload();
    }
    document.location.reload();
}
