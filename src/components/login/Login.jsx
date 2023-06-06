import React, { useState } from 'react';
import app from '../firebase.init';
import { GoogleAuthProvider, TwitterAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';

const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app)
    const twitterProvider = new TwitterAuthProvider()
    const googledProvider = new GoogleAuthProvider()
  
    const handleTwitterSign = () => {    
    signInWithPopup(auth, twitterProvider)
    .then(result => {
        const twitterUser = result.user
        console.log(twitterUser)
    })
    .catch(error => {
        console.log(error)
    })

    }

    const handleGoogleSign = () => {
        signInWithPopup(auth, googledProvider)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
            setUser(loggedUser)
        })
        .catch(error => {
            console.log(error)
        })
    }
    const handleSignOut = () => {
        signOut(auth)
        .then(result => {
            console.log(result)
            setUser(null);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
             { user ?
                <button onClick={handleSignOut}>Sign Out in</button> :
               <div>
                 <button onClick={handleGoogleSign}>Google sign in</button>   
                 <button onClick={handleTwitterSign}>Twitter sign</button>
              </div>
                
                }
        
            { user && <div>
                <p>name:{user.displayName}</p>
                
             </div>}
        </div>
    );
};

export default Login;

