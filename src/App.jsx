import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './assets/Login';
import Landing from './assets/Landing';
import Appbar from "./assets/Appbar";
import Dashboard from "./assets/Dashboard";
import axios from 'axios';

function App() {
    const [user, setUser] = useState(null);
    const init = async() => {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/get',{
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`
            }})
            const data = await response.json();
            if(data){
                const username = data.username.replace(/\b\w/g, (l) => l.toUpperCase())
                setUser(username);
            }
    }

    useEffect(()=>{
        init()
    }, [])
    return (
        <Router>
            <Appbar user = {user} setUser = {setUser}>
                <Routes>
                    <Route path = '/' element = {<Landing/>}/>
                    <Route path = '/login' element = {<Login setUser = {setUser}/>}/>
                    <Route path = '/dashboard' element = {<Dashboard/>}/>
                </Routes>
            </Appbar>
        </Router>
    )
}

export default App;
