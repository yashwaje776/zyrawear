import express from "express"
import cors from 'cors'
import "dotenv/config"
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./Routes/UserRoutes.js";
import productRoute from "./Routes/ProductRoutes.js";
import cartRoute from "./Routes/CartRoutes.js";
import OrderRouter from "./Routes/OrderRoutes.js";

const app=express();
const port=process.env.PORT


app.use(express.json())
app.use(cors())

connectDB();
connectCloudinary()

app.use("/api/user",userRouter)
app.use("/api/products",productRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',OrderRouter)

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});

