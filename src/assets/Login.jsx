import { useState, useNavigate } from 'react';
import './StylingFiles/login.css';
import Appbar from './Appbar.jsx';

function Login(){
    const [username, setUsername] = useState()
    const [password, setPassword] = useState();

    return (
        <>
        <Appbar/>
        <div class = 'login-container'>
            <form class = 'login-form'>
                <h2>LOGIN</h2>
                <input type = 'text' placeholder = 'username' requried/>
                <input type = 'password' placeholder = 'password' required/>
                <button type = 'submit'>Login</button>
                <p class = 'forgot-password'><a href = '#'>Forgot Password ?</a></p>
            </form>
        </div>
        </>
    )
}

export default Login;