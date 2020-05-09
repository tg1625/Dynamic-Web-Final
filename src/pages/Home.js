import React, {useEffect, useState} from "react";
import axios from "axios";

import {useHistory} from "react-router-dom";

import Post from "../components/Post";

import '../styles/Home.css';

function Home({userInfo}){

    /*--- URL Parameters ---*/
    //setting the post categories
    const [category,setCategory] = useState(""); //URL search parameter
    let history = useHistory();
    //get league from URL
    useEffect(() =>{
        if(history){
            //get search parameters
        let searchParams = history.location.search;
        const urlParams = new URLSearchParams(searchParams);
        let category = urlParams.get("category");
        if(category){
            setCategory(category);
        }
        //console.log("League is", league);
        }
    }, [history])

    //get API data
    const [posts, setPosts] = useState([]); //match data
    useEffect(() =>{   
        if(category){ //posts with specific category
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
        }else{ //all posts 
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
    }, [category]);


    return (
        <div>
            <h1>Home Page</h1>
            <div className="postsWrapper">
                    {posts && posts.slice(0).reverse().map((p,i) => (
                        <Post post={p} key={i}/>
                ))}
                </div>
        </div>
    )
}

export default Home;