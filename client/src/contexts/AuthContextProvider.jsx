import { useState } from 'react'

//import context define in context
import { AuthContext } from "./AuthContext"

export function AuthContextProvider({ children }){
  const [user, setUser] = useState(null) 

  const isLoggedIn = user !== null;

  function login(userData){
    setUser(userData)
  }

  function logout(){
    setUser(null)
  }
  
  //return the provider to wrap around routes and use global state and it's function in the files that need them 
  return(
    <AuthContext.Provider value={{
      user, 
      isLoggedIn, 
      login, 
      logout,
    }}>
      {children}
    </AuthContext.Provider> 
  )
}



