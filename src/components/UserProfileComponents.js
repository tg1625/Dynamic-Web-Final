import React from 'react';

function UserProfileComponents({email}){
    return (
        <div>
            <p>User is logged in as {email}</p>
        </div>
    )
}

export default UserProfileComponents;