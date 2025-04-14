import { useState, useEffect } from 'react';
import './StylingFiles/dashboard.css'
import LoadingAnimation from './LoadingAnimation.jsx'; 

function Dashboard(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try{
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3000/products`, {
                method : "GET",
                headers : {
                    "Content-Type" : "Application/json",
                    "authorization" : `Bearer ${token}` // this would contain the value we initially sent as the payload during signing
                }
            });
            if(!response.ok) console.error(`HTTP error : ${response.status}`);
            const data = await response.json();
            if(data){
                const value = data.message;
                setTimeout(()=>{ setProducts(value); setLoading(false) },2500);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[])

    return(
    <div>
        {loading && <LoadingAnimation/>}
        <div className = "Grid-For-Products">
            {   
                products.map((product) => (
                    <div key={product._id} className="product-card">
                      <img src={product.imageLink} alt={product._name} />
                      <h3 className="product-name">{product._name}</h3>
                      <p className="product-price">{product.price}</p>
                      <p className="product-description">{product.description}</p>
                      <p className='product-rating'>{product.rating}</p>
                      <button className='add-to-cart'>Add to cart</button>
                    </div>
                  ))
            }
        </div>
    </div>
);
}

export default Dashboard;