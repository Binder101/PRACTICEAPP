import { useState, useEffect } from 'react';
import './StylingFiles/dashboard.css'

function Dashboard(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try{
            const response = await fetch(`http://localhost:3000/products`, {
                method : "GET",
                header : {
                    "Content-Type" : "Application/json"
                }
            });
            if(!response.ok) console.error(`HTTP error : ${response.status}`);
            const data = await response.json();
            setLoading(false);
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[])
    return(
    <div>
        {loading && <p className = "LoadingBar">Loading...</p>}
        <div className = "Grid-For-Products">
            <div className='Product'>
            </div>

        </div>
    </div>
);
}

export default Dashboard;