import ProductModel from "../models/ProductModels.js"
import{v2 as cloudinary } from "cloudinary"

//api to add product
const addProduct=async(req,res)=>{
    try{
            const {name,description,price,sizes,category,subCategory,bestseller} =req.body
            const image1=req.files.image1?.[0]
            const image2=req.files.image2?.[0]
            const image3=req.files.image3?.[0]
            const image4=req.files.image4?.[0]

             const images=[image1,image2,image3,image4].filter((item)=> item!==undefined)
            
            let imagesUrl=await Promise.all(
                images.map(async(item)=>{
                    let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                    return result.secure_url
                })
            )
            console.log(imagesUrl)
            const newProduct= new ProductModel({
                name,
                description,
                image:imagesUrl,
                price:Number(price),
                sizes:JSON.parse(sizes),
                category,
                subCategory,
                bestseller:bestseller==="true"?true:false,
                date:Date.now()
            })
            await newProduct.save();
            res.json({success:true, message:"product is added"})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}
//api to get all product
const getAllproduct=async(req,res)=>{
    try{
        const products=await ProductModel.find({});
        
        res.json({success:true,products})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}
//api to remove product
const removeProduct=async(req,res)=>{
    try{
        const { productId } = req.body;
        await ProductModel.findByIdAndDelete(productId);
        const data = await ProductModel.findById(productId);
        if(data){
            res.json({success:true,message:"erroororoor"})
        }
        else{
            
            res.json({success:true,message:"product is remove"})
        }
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
} 

//api to fetch information on single product
const productInfo=async(req,res)=>{
    try{
        const {id}=req.body
        const data=await ProductModel.findById(id)
        res.json({success:true,data})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}





export {addProduct,getAllproduct,removeProduct,productInfo}
