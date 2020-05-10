import React, {useEffect, useState} from "react";
import axios from "axios";

import Post from "../components/Post";
import CreatePostForm from "../components/CreatePostForm";

import '../styles/Home.css';

function Home({userInfo, CreatePostFunction}){

    //get API data
    const [posts, setPosts] = useState([]); //match data
    useEffect(() =>{   
        if(userInfo){ //posts with specific category
            axios.get(
                `https://nameless-fjord-65777.herokuapp.com/`
                )
            .then(function(response){
                setPosts(response.data);
                console.log("Posts: ", response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }, [userInfo]);


    return (
        <div className="dashboard">
            <div className="userHeader">
                <div className="userInfo">
                    <div className="userImg"><img src={`${userInfo.photoURL}`} alt={`${userInfo.displayName}`}/></div>
                    <div className="userName"><a href={`/user/?user=${userInfo.uid}`}>{userInfo.displayName}</a></div>
                </div>
                <CreatePostForm CreatePostFunction={CreatePostFunction}/>
            </div>
            <div className="postsWrapper">
                    {posts && posts.map((p,i) => (
                        <Post post={p} key={i}/>
                ))}
            </div>
        </div>
    )
}

export default Home;