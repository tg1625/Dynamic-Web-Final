import React from 'react';
// import CreateAccountForm from '../components/CreateAccountForm';

function CreatePost({CreatePostFunction}){
    return (
        <div>
            <h1>Create Post</h1>
            <form className="forms" onSubmit={(formValues) => CreatePostFunction(formValues)}>
                <h3>Create an Account</h3>
                <label htmlFor="postText">Text</label>
                <input type="text" name="postText" placeholder="Write something!"/>
                <label htmlFor="postPhotoURL">Photo (Optional)</label>
                <input type="text" name="postPhotoURL" placeholder="Link to a photo here!"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreatePost;