import React, {useEffect, useState} from "react";
import axios from "axios";

function Post({post, solo}){

    //testing out a loading type of thing
    const [loading,setLoading] = useState(true);
    //getting author of the post
    const [author, setAuthor] = useState({});
    useEffect(() =>{   
        if(post){ //posts with specific category
            //console.log(`Testing URL https://nameless-fjord-65777.herokuapp.com/user/${post.authorid}`);
            axios.get(
                `https://nameless-fjord-65777.herokuapp.com/user/${post.authorid}`
                )
            .then(function(response){
                setAuthor(response.data);
                console.log("Author is: ", response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }, [post]);

    //setting the authors name and image to display
    const [name, setName] = useState("");
    const [authorImg, setAuthorImg] = useState("");
    useEffect(() =>{
        if(author){
            setName(author.displayName);
            setAuthorImg(author.photoURL);
            setLoading(false);
        }
    }, [author]);


    if(!loading){
        return (
            <div className="post">
                <div className="author">
                    <img src={`${authorImg}`} alt={`${name}'s profile`}/>
                    <a href={`/user/?user=${post.authorid}`}>{name}</a>
                    </div>

                <p>{post.text}</p>

                    <div className="postPhoto">
                        {/* load photo if there is one */}
                        {post.photo && <img alt="someting" src={`${post.photo}`}/>}
                    </div>
                
                {/* <p>Category: {post.category}</p> */}
                
                {solo !== "true" && 
                <p><a href={`post/?post=${post.postid}`}>View Post</a></p>
                    }
            </div>
        )
    }else{
        return(
            <div>Loading.....</div>
        )
    }
}

export default Post;