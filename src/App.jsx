import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './assets/Login';
import Landing from './assets/Landing';
import Appbar from "./assets/Appbar";

function App() {
    return (
        <Router>
            <Routes>
                <Appbar/>
                <Route path = '/' element = {<Landing/>}/>
                <Route path = '/login' element = {<Login/>}/>
            </Routes>
        </Router>
    )
}

export default App;
