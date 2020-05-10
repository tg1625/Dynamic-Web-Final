import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

//components
import Header from './components/Header';
//pages
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import UpdateProfile from './pages/UpdateProfile';
import ViewPost from './pages/ViewPost';

//styles
import './styles/App.css';


/*----------- FIREBASE --------------*/
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import axios from 'axios';

function App() {

  const [loggedIn, SetLoggedIn] = useState(false); //checking if users are logged in
  const [loading, SetLoading] = useState(true); // loading state so we don't display info before its ready 
  const [userInfo, SetUserInfo] = useState({});

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDq0kNN6_mua4b68uQNq9eVB7UMZsTxzjc",
    authDomain: "final-project-f0e1e.firebaseapp.com",
    databaseURL: "https://final-project-f0e1e.firebaseio.com",
    projectId: "final-project-f0e1e",
    storageBucket: "final-project-f0e1e.appspot.com",
    messagingSenderId: "697304196124",
    appId: "1:697304196124:web:1b4cf713fd36b0c59debd9"
  };
  //use effect to only initialize the app once
  useEffect(() => {
    if(!firebase.apps.length){ //checks if firebase is initialized (firebase.apps is an array)
      // only initialize app once
      firebase.initializeApp(firebaseConfig);
    }
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION) //using session storage, instead of cookie storage or local
      .catch(function(e) {
        console.log('AUTH ERROR', e);
      });
    
  }, [firebaseConfig]);

  //Check if the user is logged in
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) { //runs everytime the auth state is changed
      console.log("User is", user);
      if (user) {
        // User is signed in.
        SetLoggedIn(true);
        SetUserInfo(user);
      } else {
        // No user is signed in.
        SetLoggedIn(false);
        SetUserInfo({});
        console.log("Setting User!");
      }
      SetLoading(false);
    });
  } ,[]);


  //Login
  function LoginFunction(e){
    e.preventDefault();
    //console.log("Form payload", e); //this is the form stuff
    let email = e.currentTarget.loginEmail.value; //actually getting form values
    let password = e.currentTarget.loginPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response){
        console.log("Signed In", response);
        SetLoggedIn(true);
      })
      .catch(function(e) {
        console.log('Login  ERROR', e);
      });
  }

  //Logout 
  function LogoutFunction(){
    firebase.auth()
    .signOut()
    .then(function() {
      console.log("Signed out!");
      SetLoggedIn(false);
      window.location.href = "/login";
    })
    .catch(function(error) {
      // An error happened.
      console.log("Failed to log out", error);
    });
  }

  //Create Account
  function CreateAccountFunction(e){
    e.preventDefault();
    console.log("Form payload", e); //this is the form stuff
    let email = e.currentTarget.createEmail.value; //actually getting form values
    let password = e.currentTarget.createPassword.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response){
        console.log("Account Created", response);
        SetLoggedIn(true); //they are logged in now
         // var user = firebase.auth().currentUser;
         window.location.href = "/update-profile";
      })
      .catch(function(e) {
        console.log('CREATE ACCOUNT ERROR', e);
      });
     

  }

  //update Profile
  function UpdateProfileFunction(e){
    e.preventDefault();
    //getting all the form values
    var updates = {};
    updates.displayName = e.currentTarget.displayName.value;
    updates.fruit = e.currentTarget.fruit.value;
    updates.hemisphere = e.currentTarget.hemisphere.value;
    updates.switchcode = e.currentTarget.switchcode.value;

    var photoUrl = e.currentTarget.photoURL.files[0];
    //if they uploaded a profile photo
    if(photoUrl){
      // console.log("Photo is", photoUrl);
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef
        .child(`${photoUrl.name}`)
        .put(photoUrl);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL){
              var query = `https://nameless-fjord-65777.herokuapp.com/update?id=${userInfo.uid}`;
              updates.photoURL = downloadURL;
              for (const field in updates) { //adding in all updates to the query
                if(updates[field] !== ""){
                  query+=`&${field}=${updates[field]}`;  
                }
              }
              axios.get(query)
              .then(function (response){
                console.log(response);
                 window.location.href = `/user/?user=${userInfo.uid}`;
              })
              .catch(function(error){
                console.log(Error);
              });

              //updating actual profile in the firebase auth
              var user = firebase.auth().currentUser;
              //adding in update data if it exists
              var authUpdates = {};
              if(updates.displayName){authUpdates.displayName=updates.displayName;}
              if(updates.photoURL){authUpdates.photoURL=updates.photoURL;}

              user.updateProfile(authUpdates)
              .then(function() {
                // Update successful.
            }).catch(function(error) {
                // An error happened.
              });
            })
          }
        )
    }else{ //if they didn't upload an image
      var query = `https://nameless-fjord-65777.herokuapp.com/update?id=${userInfo.uid}`;
      for (const field in updates) {
        if(updates[field] !== ""){
          query+=`&${field}=${updates[field]}`;  
        }
      }
      console.log("Querying", query);
      axios.get(query)
      .then(function (response){
        console.log(response);
         window.location.href = `/user/?user=${userInfo.uid}`;
      })
      .catch(function(error){
        console.log(Error);
      });

      console.log("Now updating auth with", updates);

      //updating actual profile in the firebase auth
      // *sidenote: couldn't get the auth to update or the axios get to work outside of the whole uploadTask thing so I had to write it out twice 
      var user = firebase.auth().currentUser;
      //adding in update data if it exists
      var authUpdates = {};
      if(updates.displayName){authUpdates.displayName=updates.displayName;}
      if(updates.photoURL){authUpdates.photoURL=updates.photoURL;}

      user.updateProfile(authUpdates)
      .then(function() {
        // Update successful.
    }).catch(function(error) {
        // An error happened.
      });
    }
 
    
   

  }


  function CreatePostFunction(e){
    e.preventDefault();
    let text = e.currentTarget.postText.value;
    // let photoUrl = e.currentTarget.postPhotoURL.value;
    let photoUrl = e.currentTarget.postPhotoURL.files[0];
    let user = userInfo.uid;
    let timestamp = new Date().getTime();
    console.log("Current Time is ", timestamp);

    if(photoUrl){
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef
        .child(`${photoUrl.name}`)
        .put(photoUrl);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL){
              axios.get(
                `https://nameless-fjord-65777.herokuapp.com/create?text=${text}&photo=${downloadURL}&authorid=${user}&timestamp=${timestamp}`
              )
              .then(function (response){
                console.log(response);
                window.location.href = "/";
              })
              .catch(function(error){
                console.log(Error);
              });
            })
          }
        )
    }else{
      axios.get(
        `https://nameless-fjord-65777.herokuapp.com/create?text=${text}&photo=&authorid=${user}&timestamp=${timestamp}`
      )
      .then(function (response){
        console.log(response);
        window.location.href = "/";
      })
      .catch(function(error){
        console.log(Error);
      });
    }
    
  }

  function CreateReplyFunction(e, postid){
    e.preventDefault();
    let text = e.currentTarget.replyText.value;
    let user = userInfo.uid;
    let timestamp = new Date().getTime();
    axios.get(
      `https://nameless-fjord-65777.herokuapp.com/reply?text=${text}&authorid=${user}&postid=${postid}&timestamp=${timestamp}`
    )
    .then(function (response){
      console.log(response);
    })
    .catch(function(error){
      console.log(Error);
    });
    window.location.reload();
  }

  if(loading){
    return( 
        <div className="loading"></div>
    )
 }

  return (
    <div className="siteWrapper">

      <Header LogOutFunction={LogoutFunction} isLoggedIn={loggedIn} userInfo={userInfo}/>
      <Router>
        <Switch>
          {/* exact here makes it so the path thing doesnt cascade */}
          <Route exact path="/">
              {/*If not loading, can see the different pages */}
              {
              !loggedIn ? (<Redirect to="login"/>) : (<Home userInfo={userInfo} CreatePostFunction={CreatePostFunction}/>)
              //if not logged in log in, if logged in go to dashboard
              }
          </Route>
          <Route exact path="/login">
            { 
            !loggedIn ? (<Login LoginFunction= {LoginFunction}/>) : (<Redirect to="/"/>)
            }
          </Route>
          <Route exact path="/create-account">
            {/* {
            !loggedIn ? (<CreateAccount CreateAccountFunction={CreateAccountFunction}/>) : (<Redirect to="/"/>)
            } */}
            <CreateAccount CreateAccountFunction={CreateAccountFunction}/>
          </Route>
          <Route exact path="/update-profile">
            <UpdateProfile UpdateProfileFunction={UpdateProfileFunction}/>
          </Route>
          <Route exact path="/user">
              {/*If not loading, can see the different pages */}
              {!loggedIn ? <UserProfile/> :  <UserProfile authid={userInfo.uid} />}
              
          </Route>
          <Route exact path="/post">
            <ViewPost userInfo={userInfo} CreateReplyFunction={CreateReplyFunction} />
          </Route>
          <Route exact path="/createPost">
              {/*If not loading, can see the different pages */}
              {/* {
              !loggedIn ? (<Redirect to="login"/>) : (<CreatePost />)
              //if not logged in log in, if logged in go to profile
              } */}
              <CreatePost CreatePostFunction={CreatePostFunction} userInfo={userInfo} />
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
