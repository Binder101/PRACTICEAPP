import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './assets/Login';
import Landing from './assets/Landing';
import Appbar from "./assets/Appbar";
import Dashboard from "./assets/Dashboard";
import Signup from "./assets/Signup";
import axios from 'axios';
import {RecoilRoot, useSetRecoilState} from 'recoil';
import { userState } from "./store/atoms/user";

function App() {
   
    return (
        <RecoilRoot>
        <Router>
            <Appbar />
            <INIT/>
            <Routes>
                <Route path = '/' element = {<Landing/>}/>
                <Route path = '/login' element = {<Login />}/>
                <Route path = '/signup' element = {<Signup />}/>
                <Route path = '/dashboard' element = {<Dashboard/>}/>
            </Routes>
        </Router>
        </RecoilRoot>
    )
}

function INIT(){

    const setUser= useSetRecoilState(userState);
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
                setUser({isLoading : false, value : username});
            }
    }

    useEffect(()=>{
        init()
    }, [])
}

export default App;
