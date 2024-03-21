import React, { useContext, useState } from "react";
import { ContextProvider } from "./UserContext";
import axios from "axios";

export default React.memo(function Login() {
    // console.log('Login render')
    const [reg, setReg] = useState('login');
    const {setUsername, setAdmin} = useContext(ContextProvider)
    const [msg, setMsg] = useState('');
    const backendUrl = 'http://localhost:4000/user/';

    const formSubmit = () => {
        const username = document.getElementById('user').value;
        const password = document.getElementById('pass').value;

        axios.post(backendUrl + reg, {username, password}, {withCredentials: true})
        .then(res => {
            setUsername(res.data.username);
            setAdmin(res.data.admin);
            if(res.data.msg != "Success") setMsg(res.data.msg);
            else {
                reg == 'register' ? setMsg('User Registered !') : setMsg('Logged In');
            }
            setTimeout(()=>{
                setMsg('');
            }, 3000)
            document.getElementById('user').value = '';
            document.getElementById('pass').value = '';
            localStorage.setItem("isAdmin", res.data.admin)
            localStorage.setItem("username", res.data.username)

        })
        .catch(err => console.log("Error: ", err))
    }

    return (
        <div className="flex justify-center items-center bg-[url('./assets/todo.jpg')] h-screen">
                <div className="md:w-1/3 sm:w-1/2 rounded-xl font-sans">
                <div
                    className="flex flex-col justify-center items-center gap-3 p-5 rounded-xl bg-black/30 backdrop-blur-sm">
                    <h2 className="font-bold text-[40px] mb-5 text-white">{reg.charAt(0).toUpperCase() + reg.slice(1)}</h2>
                    <input id = 'user' className="outline-none rounded-md px-3 h-8 md:w-1/2 xs:w-full" type="text" placeholder="Username" required/>
                    <input id = 'pass' className="outline-none rounded-md px-3 h-8 md:w-1/2 xs:w-full" type="password" placeholder="Password" required/>
                    {msg ? <p className="text-red-500 p-1 bg-white/30 rounded-md">{msg}</p> : null}
                    <button className="rounded-md my-3 px-5 bg-blue-500 h-8 md:w-1/5 xs:w-full text-white text-center outline-none" onClick={formSubmit}>{reg == 'register' ? 'Register' : 'Login'}</button>
                    {reg == 'register' ? 
                        <p>Already a user ?
                         <a className="text-white no-underline cursor-pointer" onClick={() => setReg('login')}>&nbsp; Login</a>
                        </p>
                        :
                        <p>Not a user ? 
                            <a className="text-white no-underline cursor-pointer" onClick={() => setReg('register')}>&nbsp; Register</a>
                        </p>
                    }
                </div>
                </div>
        </div>
    )
})