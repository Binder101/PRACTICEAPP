import { useState } from 'react';
import './StylingFiles/login.css';
import Appbar from './Appbar.jsx';

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }
    const handleChangePass = (event) =>{
        setPassword(event.target.value);
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch(`http://localhost:3000/login`, {
                method : "POST",
                headers : {
                    "Content-type" : 'Application/json'
                },
                body : JSON.stringify({
                    username : username,
                    password : password
                })
            })
            if(!response.ok) throw new Error(`HTTP Error! Status : ${response.status}`);
            const data = await response.json();
            console.log(data);
        } catch(error){
            console.error(`Error during Login : ${error}`);
        }
    }

    return (
        <>
        <Appbar/>
        <div class = 'login-container'>
            <form class = 'login-form' onSubmit={handleLogin}>
                <h2>LOGIN</h2>
                <input type = 'text' placeholder = 'username' required onChange={ handleChangeUsername }/>
                <input type = 'password' placeholder = 'password' required onChange={ handleChangePass }/>
                <button type = 'submit'>Login</button>
                <p class = 'forgot-password'><a href = '#'>Forgot Password ?</a></p>
            </form>
        </div>
        </>
    )
}

export default Login;