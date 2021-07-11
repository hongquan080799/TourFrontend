import React from 'react'
import './Login.css'
import FacebookLogin from 'react-facebook-login';
import {auth} from '../../firebase'
import firebase from 'firebase'
export default function Login() {
    const responseFacebook = (res)=>{
        console.log({
            accessToken:res.accessToken,
            email:res.email,
            id:res.id,
            picture:res.picture.data.url,
            name:res.name
        })
    }
    // const handleLoginFacebook = ()=>{
    //     window.FB.login(function(response) {
    //         if (response.authResponse) {
    //          console.log('Welcome!  Fetching your information.... ');
    //          window.FB.api('/me', function(response) {
    //            console.log('Good to see you, ' + response.name + '.');
    //          });
    //         } else {
    //          console.log('User cancelled login or did not fully authorize.');
    //         }
    //     });
    // }
    const handleLoginGoogle = ()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        // auth.languageCode = 'it';
        auth
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
    const checkUser = ()=>{
        auth.onAuthStateChanged(user =>{
            if(user)
            console.log(user)
            else
            console.log("u not logged in")
        })
    }
    return (
        <div className="myContainer">
            <div className="login-container">
                <div className="login-container__left">
                    <div className="login-left">
                        <img src="https://img.icons8.com/dusk/128/000000/windows-logo.png"/>
                        <p className="left-text">
                            TOMORROW NEVER WAIT
                        </p>
                    </div>
                </div>
                <div className="login-container__right">
                    <form onSubmit={(e)=> e.preventDefault()}>
                        <p className="login__head">
                            LOGIN
                        </p>
                        <input type="text" className="form-control" placeholder="Enter your username" />
                        <input type="password" className="form-control" placeholder="Enter your password" />
                        <button className="login__button">Login</button>
                        <button onClick={checkUser} > checkuser</button>
                        <button onClick={()=>auth.signOut()} > logout</button>
                        <hr/>
                        <button className="login__button-google" onClick={handleLoginGoogle}>Login with Google</button>
                        {/* <button className="login__button-google" onClick={()=>{
                            //  window.FB.getLoginStatus(function(response) {
                            //     window.FB.logout(function(response){
                            //       console.log("Logged Out!");
                                  
                            //     });
                            // //   });
                            // window.FB.api('/me', function(response) {
                            //     console.log('Good to see you, ' + response.name + '.');
                            //   });
                        }}>Login with Google</button> */}
                         {/* <button className="login__button-facebook" onClick={handleLoginFacebook}>Login with Facebook</button> */}
                        {/* <FacebookLogin
                            appId="275950150983487"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            cssClass="login__button-facebook"
                            icon="fa-facebook"
                        /> */}
                        <hr/>
                        <div className="text-center">
                            <a href="#" className="custom-link">Create an account</a><br/>
                            <a href="#" className="custom-link">Forgot password</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
