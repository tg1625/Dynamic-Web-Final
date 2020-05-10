import React from 'react';


function UpdateProfileForm({ UpdateProfileFunction }){
    return (
        <div>  
            <form className="forms" onSubmit={(formValues) => UpdateProfileFunction(formValues)}>
                <label htmlFor="displayName">Display Name</label>
                <input type="text" name="displayName" placeholder="What's your name?"/>
                <label htmlFor="photoURL">Profile Photo</label>
                <input type="file" accept="image/*" name="photoURL" placeholder="Link to a photo here!"/>
                <label htmlFor="fruit">Native Fruit</label>
                <input type="text" name="fruit" placeholder="Fruit"/>
                <label htmlFor="hemisphere">Hemisphere</label>
                <input type="text" name="hemisphere" placeholder="Hemisphere"/>
                <label htmlFor="switchcode">Switch Code</label>
                <input type="text" name="switchcode" placeholder="xxxx-xxxx-xxxx"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UpdateProfileForm;