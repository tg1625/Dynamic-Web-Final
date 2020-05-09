import React from "react";

function Header({LogOutFunction, isLoggedIn}){
    return(
        <header>
            <nav className="header_nav">
                {/* Not Logged In */}
                {!isLoggedIn && <a href="/create-account">Create Account</a>}
                {!isLoggedIn &&<a href="/login">Login</a>}
                {/* Logged In */}
                {isLoggedIn && <a href="/">Home</a>}
                {isLoggedIn && <a href="/createPost">Create Post</a>}
                {isLoggedIn && <a onClick={() => LogOutFunction()}>Logout</a>}
            </nav>
        </header>
    )
}

export default Header;