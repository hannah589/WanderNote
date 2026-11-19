import { useState, useEffect } from 'react'
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

//import context define in context
import { AuthContext } from "./AuthContext"

const baseURL = 'http://localhost:3001/api/auth';

export function AuthProvider({ children }){
  const [user, setUser] = useState(null) 
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check existing token on app load
  useEffect(() => {
    if (token) {
      setAuthToken(token);
      loadUser();
    }
  }, []);

  // Login
  async function login({ email, password }){
    try {
      const response = await axios.post(`${baseURL}/login`, {
        email,
        password
      });

      if (response.data) {
        localStorage.setItem('token', response.data.token);
        setAuthToken(response.data.token);
        setToken(response.data.token);

        const res = await axios.get(`${baseURL}`);

        setUser(res.data);
        setIsAuth(true);
        setIsAdmin(res.data.isAdmin);

        return res.data;
      }
    } catch (err) {
      console.log('Error logging in:', err.message);

      setIsAuth(false);
      setIsAdmin(false);
      setUser(null);
      setToken(null);

      localStorage.removeItem('token');
      setAuthToken(null);

      return null;
    }
  };

  // Load User
  async function loadUser(){
    try {
      const res = await axios.get(`${baseURL}`);

      setUser(res.data);
      setIsAuth(true);
      setIsAdmin(res.data.isAdmin);
      setToken(localStorage.getItem('token'));

      return res.data;
    } catch (err) {
      console.log('Error loading user:', err.message);

      setIsAuth(false);
      setIsAdmin(false);
      setUser(null);
      setToken(null);

      localStorage.removeItem('token');
      setAuthToken(null);

      return null;
    }
  };

  // Register
  async function register(userData){
    try {
      const response = await axios.post(`${baseURL}/register`, userData);

      if (response.data) {
        localStorage.setItem('token', response.data.token);
        setAuthToken(response.data.token);
        setToken(response.data.token);

        //send res, get logged in user
        const res = await axios.get(`${baseURL}`);

        setUser(res.data);
        setIsAuth(true);
        setIsAdmin(res.data.isAdmin);

        return res.data;
      }
    } catch (err) {
      console.log('Error registering:', err.message);

      setIsAuth(false);
      setIsAdmin(false);
      setUser(null);
      setToken(null);

      localStorage.removeItem('token');
      setAuthToken(null);

      return null;
    }
  };

  // Logout
  function logout(){
    localStorage.removeItem('token');
    setAuthToken(null);

    setToken(null);
    setUser(null);
    setIsAuth(false);
    setIsAdmin(false);
  };

  
  //return the provider to wrap around routes and use global state and it's function in the files that need them 
  return(
    <AuthContext.Provider value={{
      user, 
      token,
      isAuth, 
      isAdmin,
      login, 
      loadUser,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider> 
  )
}



