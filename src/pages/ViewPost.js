import React, {useEffect, useState} from "react";
import axios from "axios";

import {useHistory} from "react-router-dom";

import Post from '../components/Post';

function ViewPost(){
   /*--- URL Parameters ---*/
   const [postID,setPostID] = useState(""); //URL search parameter
    //setting the post categories
    let history = useHistory();
    //get league from URL
    useEffect(() =>{
        if(history){
            //get search parameters
        let searchParams = history.location.search;
        const urlParams = new URLSearchParams(searchParams);
        let p = urlParams.get("post");
        console.log("PostID is ", p);
        if(p){
            setPostID(p);
        }
        }
    }, [history])

    //get API data
    const [post, setPost] = useState({}); //match data
    useEffect(() =>{   
        if(postID){ //posts with specific category
            axios.get(
                `https://nameless-fjord-65777.herokuapp.com/post/${postID}`
                )
            .then(function(response){
                setPost(response.data);
                console.log("Post is: ", response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }, [postID]);

    return (
        <div>
            <Post post={post} solo="true"/>
        </div>
    )

}

export default ViewPost;