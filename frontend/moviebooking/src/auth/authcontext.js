import React, { createContext, useContext, useEffect, useState } from "react";

// Create Context for Auth
const AuthContext = createContext();


// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Create a provider component to wrap your app
export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false); // Initial state is false (not logged in)
    const [role, setRole] = useState();
    const[isAdmin , setIsAdmin] = useState(false);
    // const [propertiesg, setPropertiesg] = useState([]);


  useEffect(() => {
    const token = sessionStorage["token"];
    const userRole = sessionStorage["role"];

    if (token) {
      setIsLogin(true);
      setRole(userRole);
    } else {
      setIsLogin(false);
      setRole("");
    }
  }, []);

    return (
      <AuthContext.Provider value={{ isLogin, setIsLogin,role,setRole , isAdmin , setIsAdmin}}>
        {children}
      </AuthContext.Provider>
    );
  };
  