import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './assets/Login';
import Landing from './assets/Landing';
import Appbar from "./assets/Appbar";
import Dashboard from "./assets/Dashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path = '/' element = {<Landing/>}/>
                <Route path = '/login' element = {<Login/>}/>
                <Route path = '/dashboard' element = {<Dashboard/>}/>
            </Routes>
        </Router>
    )
}

export default App;
