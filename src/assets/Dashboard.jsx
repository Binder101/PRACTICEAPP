import { useState, useEffect } from 'react';
import './StylingFiles/dashboard.css'

function Dashboard(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try{
            const response = await fetch(`http://localhost:3000/products`, {
                method : "GET",
                headers : {
                    "Content-Type" : "Application/json"
                }
            });
            if(!response.ok) console.error(`HTTP error : ${response.status}`);
            const data = await response.json();
            if(data){
                const value = data.message;
                setProducts(value);
                setLoading(false);
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
        {loading && <p className = "LoadingBar">Loading...</p>}
        <div className = "Grid-For-Products">
            {   
                products.map((product) => (
                    <div key={product._id} className="product-card">
                      <img src={product.imageLink} alt={product._name} />
                      <h3 className="product-name">{product._name}</h3>
                      <p className="product-price">{product.price}</p>
                      <p className="product-description">{product.description}</p>
                      <p className='product-rating'>{product.rating}</p>
                    </div>
                  ))
            }

        </div>
    </div>
);
}

export default Dashboard;