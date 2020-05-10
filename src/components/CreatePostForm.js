import React from "react";

function CreatePostForm({CreatePostFunction}){
    return(
        <form className="forms" onSubmit={(formValues) => CreatePostFunction(formValues)}>
                <label htmlFor="postText">Text</label>
                <input type="text" name="postText" placeholder="Write something!"/>
                <label htmlFor="postPhotoURL">Photo (Optional)</label>
                <input type="file" accept="image/*" name="postPhotoURL" placeholder="Link to a photo here!"/>
                <button type="submit">Submit</button>
            </form>
    )
}

export default CreatePostForm;