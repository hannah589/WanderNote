// File: src/utils/setAuthToken.js
// This file will set our token to be sent in our http headers whenever we send a http request
// from the client side

import axios from "axios";

const setAuthToken = token => {
  console.log('setAuthToken - utils');
  // log to see if we received a token
  console.log(token);
  if(token){
    // We want to add the token to our axios requests in the http header
    // use the property 'x-auth-token'
    // This will create the key value pair: 'x-auth-token: token
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

export default setAuthToken;