import express from 'express';
import { mongoose } from 'mongoose';
import cors from 'cors';

const app = express(); // Use the express library for creating apis;
app.use(cors()); // To prevent cross origin response errors;
app.use(express.json()); 

async function connectDB(){
    try {
        await mongoose.connect(`mongodb://localhost:27017/Practice`);
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
}
connectDB();

const productSchema = new mongoose.Schema({
    _name : String,
    description : String,
    rating : Number,
    price : Number
})

const Product = mongoose.model('Product', productSchema);

app.get(`/products`, async(req, res)=>{
    try{
        const products = await Product.find({});
        if(products){
            res.json({message : products});
        } else {
            res.status(404).json({message : `Products not found`});
        }
    } catch (error){
        console.error(error);
        res.status(500).json({message : "Internal Server Error"});
    }
})

app.get(`/products/:id`, async(req,res)=>{
    const _id = mongoose.Types.ObjectId(req.params.id);
    console.log(`id : ${_id}`);
    try{
        const product = await Product.findById(_id);
        if(product){
            res.json({message : product});
        } else {
            res.status(404).json({message : 'Product not found'});
        }
    } catch(error) {
        console.error(error)
        res.status(500).json({message : 'Internal Server Error'});
    }
})

app.post(`/postProducts`, async(req, res)=>{
    const product = {
        _name : req.body._name,
        description : req.body.description,
        rating : req.body.rating,
        price : req.body.price
    };
    try{
        const newProduct = new Product(product);
        await newProduct.save();
        res.json({message : "Product added"});
    } catch (error){
        console.error(error);
        res.status(500).json({message : "Internal Server Error"});
    }
})

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" }); 
});

app.listen(3000, ()=>{
    console.log(`Server Listening to port 3000`);
})