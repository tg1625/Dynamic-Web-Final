import React, {useEffect, useState} from "react";
import axios from "axios";

function Post({post, solo}){
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

    //setting the authors name to display
    const [name, setName] = useState("");
    useEffect(() =>{
        if(author){
            setName(author.displayName);
        }
    }, [author]);



    
    return (
       <div className="post">
           <p>Author: <a href={`/user/?user=${post.authorid}`}>{name}</a></p>
           {/* load photo if there is one */}
           {post.photo && <img alt="someting" src={`${post.photo}`}/>}
           <p>{post.text}</p>
           <p>Category: {post.category}</p>
           {solo != "true" && 
           <p><a href={`post/?post=${post.postid}`}>View Post</a></p>
            }

       </div>
    )
}

export default Post;