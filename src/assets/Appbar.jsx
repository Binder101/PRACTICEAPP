
import './StylingFiles/appbar.css';
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';


function Appbar({user, setUser}){

    const navigate = useNavigate();
    console.log(`User : ${user}`)
    const handleLogout = () =>{
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    }

    if(!user){
        return(
            <>
            <div class = "appbar"> 
            <div class = "brand-name" onClick={()=> navigate('/')}>LaPractica</div>
                <div class = "menu-options">
                    <Link to = "/login" class = "menu-item">Login</Link>
                    <Link to = "/signup" class = "menu-item">Signup</Link>
                    <Link to = "/" class = "menu-item">About</Link>
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