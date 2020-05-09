import React, {useEffect, useState} from "react";
import axios from "axios";

import Reply from "./Reply.js";
import "../styles/Reply.css";

function Post({userInfo, post, solo, CreateReplyFunction}){
    //getting author of the post
    const [author, setAuthor] = useState({});
    const [replies, setReplies] = useState([]);
    useEffect(() =>{   
        if(post){ //posts with specific category
            //console.log(`Testing URL https://nameless-fjord-65777.herokuapp.com/user/${post.authorid}`);
            axios.get(
                `https://nameless-fjord-65777.herokuapp.com/user/${post.authorid}`
                )
            .then(function(response){
                setAuthor(response.data);
                // console.log("Author is: ", response.data);
            })
            .catch(function(error){
                console.log(error);
            });
            if(solo){
                axios.get(
                    `https://nameless-fjord-65777.herokuapp.com/replies/${post.postid}`
                    )
                .then(function(response){
                    setReplies(response.data);
                    // console.log("Replies are: ", response.data);
                })
                .catch(function(error){
                    console.log(error);
                });
            }
        }
    }, [post]);

    //setting the authors name and image to display
    const [name, setName] = useState("");
    const [authorImg, setAuthorImg] = useState("");
    useEffect(() =>{
        if(author){
            setName(author.displayName);
            setAuthorImg(author.photoURL);
        }
    }, [author]);

    return (
        <div className="post">
            <div className="content">
                <div className="photo">
                    <img src={`${authorImg}`} alt={`${name}'s profile`}/>    
                </div>
                <div className="text">
                    <a className="name" href={`/user/?user=${post.authorid}`}>{name}</a>
                    <p>{post.text}</p>

                    <div className="postPhoto">
                        {/* load photo if there is one */}
                        {post.photo && <img alt="someting" src={`${post.photo}`}/>}
                    </div>

                    {/* Load link to post if on the home page */}
                    {solo !== "true" && 
                    <a className="postLink" href={`post/?post=${post.postid}`}>View Post</a>
                    }
                </div>
            </div>
    
            {/* Load replies if on the post page */}
            <div className="replies">
                {userInfo && "uid" in userInfo &&
                    <div className="reply">
                        <div className="photo">
                            <img src={`${userInfo.photoURL}`} alt={`${userInfo.displayName}'s profile`}/>    
                        </div>
                        <div className="text">
                            <form className="forms" onSubmit={(formValues) => CreateReplyFunction(formValues, post.postid)}>
                                <input type="text" name="replyText" placeholder="Reply here"/>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                }
                {solo === "true" &&
                    replies && replies.slice(0).reverse().map((r,i) => (
                    <Reply reply={r} displayName={name} profileImg={authorImg} key={i}/>
                    ))
                }
            </div>


        </div>
    )
}

export default Post;