import { useState } from 'react';
import Appbar from './Appbar.jsx';
import './StylingFiles/login.css';

function Landing(){
    return(
        <>
        <Appbar/>
        <div class = "Title-of-project">
            <div class = "text-on-landing-page">
                <p class = "practice">PRACTICE</p>
                <p class = "equals">EQUALS</p>     
                <p class = "perfection">PERFECTION</p>
            </div>
        </div>
        </>
    )
}
export default Landing;