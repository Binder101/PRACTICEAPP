import { use, useEffect, useState } from "react";
import './StylingFiles/appbar.css';
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";


function Appbar(){
    const[user, setUser] = useState('');
    const[shouldNavigate, setShouldNavigate] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token');
        setShouldNavigate(true);
    }
    if(shouldNavigate){
        navigate('/', {replace : true});
    }

    const check = async() =>{
        const token = localStorage.getItem('token');
        try{
            const response = await fetch('http://localhost:3000/get',{
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                    "authorization" : `Bearer ${token}`
                }
            })

            const data = await response.json();
            if(data){
                const username = data.username.replace(/\b\w/g, (l) => l.toUpperCase())
                setUser(username);
            }
        } catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        check();
    }, [])
    
    if(!user){
        return(
            <>
            <div class = "appbar"> 
            <Link to = '/' class = "brand-name">LaPractica</Link>
                <div class = "menu-options">
                    <Link to = '/login' class = "menu-item">Login</Link>
                    <Link to = "/signup" class = "menu-item">Signup</Link>
                    <Link to = "/about" class = "menu-item">About</Link>
                </div>
            </div>
            </>
        )
    }

    return(
        <>
        <div class = "appbar"> 
        <Link to = '/' class = "brand-name">LaPractica</Link>
        <div class = "logged-menu-options">
            <p className="username"> Hi {user} </p>
            <Button variant= "contained" onClick={handleLogout}>Logout</Button>
        </div>
        </div>
        </>
    )
}

export default Appbar;