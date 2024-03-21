import React, { createContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";

export const ContextProvider = createContext({});

export const  UserContext = React.memo(function ({children}) {
const [username, setUsername] = useState('');
const [auth, setAuth] = useState('');
const [admin, setAdmin] = useState(2);

    // console.log('UserContext render!')
    useEffect(()=>{
        const storedAdmin = localStorage.getItem('isAdmin');
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername || "");
        setAdmin(storedAdmin == "true");
    },[]);

    useEffect(() => {
            setAuth(document.cookie.split(';').some(cookie => cookie.trim().startsWith('rqid=')));
        
      }, [username]);

    if(auth) {
        return (
            <>
                <HeadWrap username={username} setUsername={setUsername}/>
                <Dashboard admin = {admin}/>
            </>
        )
    }
    return(
        <>
            <ContextProvider.Provider value={{setUsername: setUsername, setAdmin: setAdmin}}>
                {children}
            </ContextProvider.Provider>
        </>
    )

})

function HeadWrap({username, setUsername}) {
    const logout = () => {
        fetch('http://localhost:4000/service/logout', {
            method: "GET",
            credentials: 'include',
        }).then(res => res.json()).then(data => {
            localStorage.clear;
            setUsername('');
        }).catch(err => console.log('Error: ',err));
    }
    return (
      <div className='bg-gray-500 text-whit font-sans text-center p-5 mb-3'>
        <h1 className='e font-extrabold text-[40px]'>Customer service request.</h1>
        {username ? 
            <button 
                className="px-2 md:px-4 bg-red-400 text-white cursor-pointer absolute right-0 top-0 md:m-5 rounded-bl-md md:rounded-md p-2 font-sans"
                onClick={logout}>Logout
            </button> 
            : null
        }
      </div>
    )
}