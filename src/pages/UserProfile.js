import React, {useEffect, useState} from "react";
import axios from "axios";

import {useHistory} from "react-router-dom";

import '../styles/UserProfile.css';
import Post from '../components/Post';

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
    const [posts, setPosts] = useState([]); //posts for that user
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
            });
            axios.get(
                `https://nameless-fjord-65777.herokuapp.com/post/user/${user}`
                )
            .then(function(response){
                setPosts(response.data);
                console.log("Posts: ", response.data);
            })
            .catch(function(error){
                console.log(error);
            });
        }
    }, [user]);
 

    return (
        <div>
        <div className="profile">
            <div className="profileImg">
                <img alt="Profile" src={`${profile.photoURL}`}/>
                {authid === user &&
                <a href="/update-profile">Edit Profile</a>
                }
            </div>
            <div className="profileDescription">
                <h2>{profile.displayName}</h2>
                <p><strong>Switch Code:</strong> {profile.switchcode}</p>
                <p><strong>Fruit:</strong> {profile.fruit}</p>
                <p>{profile.hemisphere} Hemisphere</p>
            </div>
        </div>

        <div className="postsWrapper">
        {posts && posts.map((p,i) => (
            <Post post={p} key={i}/>
        ))}
        </div>
        </div>
    )
}

export default UserProfile;