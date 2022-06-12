// src/app.js

import { Auth, getUser } from './auth';
import { getUserFragments, postUserFragments } from './api';

async function init() {
  // Get our UI elements
  const userSection = document.querySelector('#user');
  const fragmentSection= document.querySelector('#fragment-section');
  const getIdBtn = document.querySelector('#getIdBtn');
  const postBtn = document.querySelector('#postBtn');
  const loginBtn = document.querySelector('#login');
  const logoutBtn = document.querySelector('#logout');
  

  // Wire up event handlers to deal with login and logout.
  loginBtn.onclick = () => {
    // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    Auth.federatedSignIn();
  };
  logoutBtn.onclick = () => {
    // Sign-out of the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
    Auth.signOut();
  };

  //console.log(postBtn);
 
  // See if we're signed in (i.e., we'll have a `user` object)
  const user = await getUser();
  if (!user) {
    // Disable the Logout button
    logoutBtn.disabled = true;
    fragmentSection.hidden=true;
    return;
  }
    else{
      fragmentSection.hidden=false;
    }
    
    postBtn.onclick = () => {
      const fragmentData = document.querySelector('#inputFragment').value;
      postUserFragments(user, fragmentData);
    }
  
    getIdBtn.onclick = async() => {
      const id = document.querySelector('#outputFragment').value;
      const fragments = await getUserFragments(user);
      console.log(fragments);
    }
  
  
    // Do an authenticated request to the fragments API server and log the result
    getUserFragments(user);

  // Log the user info for debugging purposes
  console.log({ user });

  // Update the UI to welcome the user
  userSection.hidden = false;

  // Show the user's username
  userSection.querySelector('.username').innerText = user.username;

  // Disable the Login button
  if(loginBtn.disabled = true){
   fragmentSection.disabled = false
  };

}



// Wait for the DOM to be ready, then start the app
addEventListener('DOMContentLoaded', init);