import React from 'react';
import UpdateProfileForm from '../components/UpdateProfileForm';

function UpdateProfile({UpdateProfileFunction}){
    return (
        <div>
            <h1>Update Profile</h1>
            <UpdateProfileForm UpdateProfileFunction={UpdateProfileFunction}/> 
        </div>
    )
}

export default UpdateProfile;