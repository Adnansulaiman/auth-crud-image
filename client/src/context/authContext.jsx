import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const navigate = useNavigate(); 
    const [loggedIn,setLoggedIn] = useState(!!localStorage.getItem('token'));
    
   

    const login = (token) =>{
        localStorage.setItem('token',token);
        setLoggedIn(true)
        
    }
    const logout = () =>{
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/login');
        

    }

    

    return (
        <AuthContext.Provider value={{loggedIn,setLoggedIn,logout,login}} >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth =()=> useContext(AuthContext);