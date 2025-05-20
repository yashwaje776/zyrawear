import OrderModel from "../models/OrderModels.js";
import UserModel from "../models/userModel.js";


const placeOrder=async(req,res)=>{
    try{
        const {userId,items,amount,address}=req.body;
        if(!items || items.length === 0){
            res.json({success:false,message:"select the item "})
        }
        const OrderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        const newOrder=new OrderModel(OrderData);
        await newOrder.save();
        await UserModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order is placed"})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}


const placeOrderStripe=(req,res)=>{

}


const placeOrderRazorpay=(req,res)=>{

}


const allorders=async(req,res)=>{
      try{
          const orders=await OrderModel.find({});
          res.json({success:true,orders})
      }
      catch(error){
        res.json({success:false,message:error.message})
    }


}


const Userorders=async(req,res)=>{
    try{
        const {userId}=req.body;
        const orders=await OrderModel.find({userId});
        res.json({success:true,orders})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }

}


const UpdateStatus=async(req,res)=>{
    try{
        const {orderId,status}=req.body;
        const updatedOrder = await OrderModel.findByIdAndUpdate( orderId, { status: status }, { new: true } );
        res.json("order status is placed");
    }
    catch(error){
        res.json({success:false,message:error.message})
    }

}





export {placeOrder,placeOrderStripe,placeOrderRazorpay,allorders,Userorders,UpdateStatus}