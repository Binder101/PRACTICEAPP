import { useState } from "react";
import './StylingFiles/appbar.css';
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

function Appbar(){
    
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

export default Appbar;