import express from "express";
import { addToCart, getuserCart, removecart, updateCart } from "../controllers/cartControllers.js";
import authuser from "../middlewares/Authuser.js";


const cartRoute=express.Router();

cartRoute.post('/addtoCart',authuser,addToCart);
cartRoute.post('/updateCart',authuser,updateCart);
cartRoute.post('/getuserCart',authuser,getuserCart)
cartRoute.post('/removecart',authuser,removecart)







export default cartRoute