import express from 'express';
import { mongoose } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {createHash} from 'crypto';
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.secret;
const passPhrase = process.env.passPhrase;

const app = express(); // Use the express library for creating apis;
app.use(cors()); // To prevent cross origin response errors;
app.use(express.json()); 

function calculateHash(value) {
    return createHash('sha256').update(value).digest('hex');
}

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
    imageLink : String,
    rating : Number,
    price : Number
})

const memberSchema = new mongoose.Schema({
    username : String,
    password : String
})

const Product = mongoose.model('Product', productSchema);
const Members  = mongoose.model('Members', memberSchema);

function authenticateJWT(req, res, next){
    const head = req.headers.authorization;
    if(!head) return res.status(404).json({ message : "Authentication header not found" });
    const token = head.split(" ")[1];
    if(!token) return  res.status(404).json({ message : "Authentication Token not found" });
    const decode = jwt.verify(token, passPhrase);
    if(!decode) return res.status(403).json({ message : "Authentication Failed" });
    req.user = decode;
    next();
}
    
app.post('/signup', async(req,res)=>{
    try{
        const member ={
            username : req.body.username,
            password : calculateHash(req.body.password),
        }
        const headerAuth = req.headers.headerauth;
        const existing = await Members.findOne({username : member.username});
        if(!existing){
            if(headerAuth == secret){
                const newMember = new Members(member);
                await newMember.save();
                newMember ? res.json({ message : "New Member created successfully",
                    token : jwt.sign({username : member.username} , passPhrase, {expiresIn : '24H'})
                }) : res.status(403).json({ message : "Couldn't create a new member"});
            } else {
                res.status(401).json({ message : "Not authorized to add members"});
            }
        } else {
            res.status(401).json({ message : "Username already exists"});
        }
    } catch(error){
        console.error(error);
        res.status(500).json({ message : `Internal Server Error`});
    }
})

app.post('/login', async(req,res)=>{
    try{
        const member = {
            username : req.body.username,
            password : calculateHash(req.body.password)
        };
        const found = await Members.findOne({ 
            username : member.username,
            password : member.password
         });
        const payload = {username : member.username};
        if(found) {
            res.json({message : "Logged in Successfully",
            token : jwt.sign(payload, passPhrase, {expiresIn : "24h"})
            })
        }
        else res.status(401).json({ message : "Unauthorized"});
    } catch(error){
        console.error(error);
        res.status(500).json({ message : 'Internal Server Error'});
    }
})

app.get(`/products`, authenticateJWT, async(req, res)=>{
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

app.get(`/products/:id`, authenticateJWT,  async(req,res)=>{
    try{
        const _id = mongoose.Types.ObjectId(req.params.id);
        console.log(`id : ${_id}`);
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

app.post(`/postProducts`, authenticateJWT, async(req, res)=>{
    try{
        const product = {
            _name : req.body._name,
            description : req.body.description,
            imageLink : req.body.imageLink,
            rating : req.body.rating,
            price : req.body.price
        };
        const newProduct = new Product(product);
        await newProduct.save();
        res.json({message : "Product added"});
    } catch (error){
        console.error(error);
        res.status(500).json({message : "Internal Server Error"});
    }
})

app.get('/get', authenticateJWT, async(req, res)=>{
    try{
        res.json(req.user);
    } catch(error){
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