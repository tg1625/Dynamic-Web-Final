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
//styles
import './App.css';


/*----------- FIREBASE --------------*/
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

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
      console.log(user);
      if (user) {
        // User is signed in.
        SetLoggedIn(true);
        SetUserInfo(user);
      } else {
        // No user is signed in.
        SetLoggedIn(false);
        SetUserInfo({});
      }
      //now we know what to load, so loading is false 
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
    })
    .catch(function(error) {
      // An error happened.
      console.log("Failed to log out", error);
    });
  }

  //Create Account
  function CreateAccountFunction(e){
    e.preventDefault();
    //console.log("Form payload", e); //this is the form stuff
    let email = e.currentTarget.createEmail.value; //actually getting form values
    let password = e.currentTarget.createPassword.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response){
        console.log("Account Created", response);
        SetLoggedIn(true); //they are loged in now
      })
      .catch(function(e) {
        console.log('CREATE ACCOUNT ERROR', e);
      });
  }

  console.log("What are we?", loggedIn);

  return (
    <div className="siteWrapper">

      <Header LogOutFunction={LogoutFunction} isLoggedIn={loggedIn}/>
      <Router>
        <Switch>
          {/* exact here makes it so the path thing doesnt cascade */}
          <Route exact path="/">
              {/*If not loading, can see the different pages */}
              {
              !loggedIn ? (<Redirect to="login"/>) : (<UserProfile userInfo={userInfo}/>)
              //if not logged in log in, if logged in go to profile
              }
          </Route>
          <Route exact path="/login">
            { 
            !loggedIn ? (<Login LoginFunction= {LoginFunction}/>) : (<Redirect to="/"/>)
            }
          </Route>
          <Route exact path="/create-account">
            {
            !loggedIn ? (<CreateAccount CreateAccountFunction={CreateAccountFunction}/>) : (<Redirect to="/"/>)
            }
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
