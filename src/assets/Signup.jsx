import { useEffect, useState } from 'react';
import './StylingFiles/login.css';
import Appbar from './Appbar.jsx';
import Dashboard from './Dashboard.jsx';
import { Navigate } from 'react-router-dom';

function Signup({setUser}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }
    const handleChangePass = (event) =>{
        setPassword(event.target.value);
    }
    const handleChangeAuthToken = (event) => {
        setToken(event.target.value);
    }

    if(isAuthenticated) return <Navigate to = '/dashboard' replace />
 

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch(`http://localhost:3000/signup`, {
                method : "POST",
                headers : {
                    "Content-type" : 'Application/json',
                    headerAuth : token
                },
                body : JSON.stringify({
                    username : username,
                    password : password
                })
            })
            if(!response.ok) throw new Error(`HTTP Error! Status : ${response.status}`);
            const data = await response.json();
            if(data) {
                const token = data.token;
                localStorage.setItem("token", token);
                setIsAuthenticated(true);
                setUser(username);
                console.log(data);
                return <Navigate to ='/dashboard' replace />
            }
        } catch(error){
            console.error(`Error during Signup : ${error}`);
        }
    }

    return (
        <>
        {/* <Appbar/> */}
        <div class = 'login-container'>
            <form class = 'login-form' onSubmit={ handleLogin }>
                <h2>LOGIN</h2>
                <input type = 'text' placeholder = 'Username' required onChange={ handleChangeUsername }/>
                <input type = 'password' placeholder = 'Password' required onChange={ handleChangePass }/>
                <input type = 'password' placeholder = 'Authorization Token' required onChange={ handleChangeAuthToken }/>
                <button type = 'submit'>Signup</button>
            </form>
        </div>
        </>
    )
}

export default Signup;