import React from "react";

function Header({LogOutFunction, isLoggedIn, userInfo}){
    return(
        <header>
            <nav className="header_nav">
                {/* Not Logged In */}
                {!isLoggedIn && <a href="/create-account">Create Account</a>}
                {!isLoggedIn &&<a href="/login">Login</a>}
                {/* Logged In */}
                {isLoggedIn && <a style={{float: "left"}}href="/">Home</a>}
                {isLoggedIn && userInfo && <a href={`/user/?user=${userInfo.uid}`}>Profile</a>}
                {isLoggedIn && <button onClick={() => LogOutFunction()}>Logout</button>}
            </nav>
        </header>
    )
}

export default Header;