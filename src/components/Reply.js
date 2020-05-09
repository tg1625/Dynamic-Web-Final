import React, {useEffect, useState} from "react";
import axios from "axios";


function Reply({reply}){
    //getting author of the reply
    const [author, setAuthor] = useState({});
    useEffect(() =>{   
        if(reply){ //posts with specific category
            //console.log(`Testing URL https://nameless-fjord-65777.herokuapp.com/user/${post.authorid}`);
            axios.get(
                `https://nameless-fjord-65777.herokuapp.com/user/${reply.authorid}`
                )
            .then(function(response){
                setAuthor(response.data);
                console.log("Reply author is: ", response.data);
            })
            .catch(function(error){
                console.log(error);
            });
        }
    }, [reply]);

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
        <div className="reply">
            <div className="photo">
                <img src={`${authorImg}`} alt={`${name}'s profile`}/>    
            </div>
            <div className="text">
                <a className="name" href={`/user/?user=${reply.authorid}`}>{name}</a>
                <p>{reply.text}</p>
            </div>
        </div>
    )
}

export default Reply;