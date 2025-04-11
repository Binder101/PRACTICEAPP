import { use, useEffect, useState } from "react";
import './StylingFiles/appbar.css';
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';



function Appbar({user, setUser}){
    // const[user, setUser] = useState('');
    const[shouldNavigate, setShouldNavigate] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token');
        setShouldNavigate(true);
        setUser(null);
    }
    if(shouldNavigate){
        navigate('/', {replace : true});
    }

    const handleRoutingPath = (path) => {
        navigate(path);
        console.log('Done');
    }
    
    if(!user){
        return(
            <>
            <div class = "appbar"> 
            <div class = "brand-name" onClick={()=> navigate('/')}>LaPractica</div>
                <div class = "menu-options">
                    <button class = "menu-item" onClick={()=>handleRoutingPath('/login')}>Login</button>
                    <button class = "menu-item" onClick={()=>handleRoutingPath('/signup')}>Signup</button>
                    <button class = "menu-item" onClick={()=>handleRoutingPath('/')}>About</button>
                </div>
            </div>
            </>
        )
    }
    else{
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
}

export default Appbar;