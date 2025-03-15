import { useState } from "react";
import './StylingFiles/appbar.css';

function Appbar(){
    return(
        <>
        <div class = "appbar"> 
        <div class = "brand-name">LaPractica</div>
            <div class = "menu-options">
                <a href = "#login" class = "menu-item">Login</a>
                <a href = "#signup" class = "menu-item">Signup</a>
                <a href = "#about" class = "menu-item">About</a>
            </div>
        </div>
        </>
    )
}

export default Appbar;