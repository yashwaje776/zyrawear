import UserModel from "../models/userModel.js"


const addToCart=async(req,res)=>{
    try{
        const {userId,itemId,size}=req.body
        const userdata=await UserModel.findById(userId);
        let cartData=await userdata.cartData;
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        await UserModel.findByIdAndUpdate(userId,{cartData})
        console.log(userdata)
        console.log(cartData)
        res.json({success:true,message:"Item Add To Cart"});
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
   
}

const updateCart=async(req,res)=>{
    try{
        const {userId,itemId,size,cnt}=req.body
        const userdata=await UserModel.findById(userId);
        let cartData=await userdata.cartData;
        cartData[itemId][size]=cnt;
        await UserModel.findByIdAndUpdate(userId,{cartData})
        console.log(cartData)
        res.json({success:true,message:"Cart is updated"});
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

const getuserCart=async(req,res)=>{
    try{
        const {userId}=req.body;
        const userdata=await UserModel.findById(userId);
        let cartData=await userdata.cartData;
        console.log(cartData)
        res.json({success:true,cartData});

    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

const removecart=async(req,res)=>{
    try{
        const {userId,productId,size}=req.body;
        const userdata=await UserModel.findById(userId);
        let cartData=await userdata.cartData;
        delete cartData[productId][size];

        if (Object.keys(cartData[productId]).length === 0) {
            delete cartData[productId];
        }
        await UserModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,cartData});
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}



export {addToCart,updateCart,getuserCart,removecart};