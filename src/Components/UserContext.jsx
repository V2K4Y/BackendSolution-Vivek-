import { createContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";

export const ContextProvider = createContext({});

export function UserContext({children}) {
const [username, setUsername] = useState('');
const [auth, setAuth] = useState('');
const [admin, setAdmin] = useState(2);

    // console.log('UserContext render!')

    useEffect(() => {
            console.log('hello');
            setAuth(document.cookie.split(';').some(cookie => cookie.trim().startsWith('rqid=')));
        
      }, [username]);

    if(auth) {
        return (
            <Dashboard admin = {admin}/>
        )
    }
    return(
        <ContextProvider.Provider value={{setUsername: setUsername, setAdmin: setAdmin}}>
            {children}
        </ContextProvider.Provider>
    )

}