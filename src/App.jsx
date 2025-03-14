import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './assets/Login';
import Landing from './assets/Landing';

function App() {
    return (
        <Router>
            <Routes>
            <Route path = '/' element = {<Landing/>}/>
            <Route path = '/login' element = {<Login/>}/>
            </Routes>
        </Router>
    )
}

export default App;
