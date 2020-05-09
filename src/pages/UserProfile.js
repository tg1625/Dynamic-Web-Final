import React, {useEffect, useState} from "react";
import axios from "axios";

import {useHistory} from "react-router-dom";

import '../styles/UserProfile.css';

function UserProfile({authid}){
    //console.log({userInfo});
   /*--- URL Parameters ---*/
    //setting the post categories
    const [user,setUser] = useState(""); //URL search parameter
    let history = useHistory();
    //get league from URL
    useEffect(() =>{
        if(history){
            //get search parameters
        let searchParams = history.location.search;
        const urlParams = new URLSearchParams(searchParams);
        let user = urlParams.get("user");
        console.log("User is ", user);
        if(user){
            setUser(user);
        }
        //console.log("User is", league);
        }
    }, [history])

    //get API data
    const [profile, setProfile] = useState([]); //match data
    useEffect(() =>{   
        if(user){ //posts with specific category
            axios.get(
                `https://nameless-fjord-65777.herokuapp.com/user/${user}`
                )
            .then(function(response){
                setProfile(response.data);
                console.log("Response", response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }, [user]);

    return (
        <div className="profile">
            <div className="profileImg">
                <img alt="Profile" src={`${profile.photoURL}`}/>
                {authid == user &&
                <a href="/update-profile">Edit Profile</a>
                }
            </div>
            <div className="profileDescription">
                <h2>{profile.displayName}</h2>
                <p><strong>Switch Code:</strong> {profile.switchcode}</p>
                <p><strong>Fruit:</strong> {profile.fruit}</p>
                <p>{profile.hemisphere} Hemisphere</p>
            </div>
            {/* //<UserProfileComponents email={userInfo.email}/> */}
        </div>
    )
}

export default UserProfile;