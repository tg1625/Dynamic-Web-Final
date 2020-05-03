import React from 'react';
import UserProfileComponents from '../components/UserProfileComponents';

function UserProfile({userInfo}){
    return (
        <div>
            <h1>User Profile</h1>
            <UserProfileComponents email={userInfo.email}/>
        </div>
    )
}

export default UserProfile;