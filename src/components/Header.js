import React from "react";

function Header({LogOutFunction, isLoggedIn}){
    return(
        <header>
            <nav className="header_nav">
                {isLoggedIn && <a href="/">Home</a>}
                {!isLoggedIn && <a href="/create-account">Create Account</a>}
                {!isLoggedIn &&<a href="/login">Login</a>}
                {isLoggedIn && <button onClick={() => LogOutFunction()}>Logout</button>}
            </nav>
        </header>
    )
}

export default Header;