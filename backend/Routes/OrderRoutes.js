import express from "express"
import { allorders, placeOrder, placeOrderRazorpay, placeOrderStripe, UpdateStatus, Userorders } from "../controllers/orderControllers.js";
import authadmin from "../middlewares/AuthAdmin.js";
import authuser from "../middlewares/Authuser.js";

const OrderRouter=express.Router();

OrderRouter.post("/placeOrder",authuser,placeOrder);
OrderRouter.post("/placeOrderRaz",authuser,placeOrderRazorpay)
OrderRouter.post("/placeOrderStripe",authuser,placeOrderStripe)
OrderRouter.post("/Userorders",authuser,Userorders) 


OrderRouter.get("/allOrders",authadmin,allorders)
OrderRouter.post("/UpdateStatus",authadmin,UpdateStatus)

export default OrderRouter