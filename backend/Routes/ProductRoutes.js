import express from "express"
import { addProduct, getAllproduct, productInfo, removeProduct } from "../controllers/productsControllers.js";
import upload from "../middlewares/multer.js";
import authadmin from "../middlewares/AuthAdmin.js";


const productRoute=express.Router();

productRoute.post("/add-product",authadmin,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct)
productRoute.get("/get-products",getAllproduct) 
productRoute.post("/remove-product",authadmin,removeProduct)
productRoute.post("/product-info",productInfo)




export default productRoute 