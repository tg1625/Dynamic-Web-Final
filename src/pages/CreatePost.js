import React from 'react';
import CreatePostForm from "../components/CreatePostForm"

function CreatePost({CreatePostFunction}){
    return (
        <div>
            <h1>Create Post</h1>
            <CreatePostForm CreatePostFunction={CreatePostFunction}/>
        </div>
    )
}

export default CreatePost;