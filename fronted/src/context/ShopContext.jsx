import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { products } from "../assets/assets";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currencySymbol = "$";
    const deliveryFee = 10;

    const [usertoken,setusertoken]=useState(localStorage.getItem("usertoken")||"")

    const [search, setsearch] = useState('');
    const [showsearch, setshowsearch] = useState(false);
    const [cartItem, setcartItem] = useState({});
    const [cartcnt, setCartcnt] = useState(0);
    const [subtotal, setsubtotal] = useState(0);
    const [total, settotal] = useState(0);

    const [order,setorder]=useState([]);
    
    const [products,setproducts]=useState([]);
    const backendUrl=import.meta.env.VITE_META_BACKEND_URL
    // console.log(backendUrl)
    
    //get all product
    const getallproduct=async()=>{
        try{
            const {data}=await axios.get(`${backendUrl}/api/products/get-products`)
            if(data.success){
                setproducts(data.products)
               // console.log(data.products)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error)
        }
    }



    //add product to cart
    const addProTocart = async (productId, size) => {
        if(size==""){
            toast.error("Select the size of product");
        }
        else{

            let cartData = structuredClone(cartItem);
            if (cartData[productId]) {
            if (cartData[productId][size]) {
                cartData[productId][size] += 1;
            } else {
                cartData[productId][size] = 1;
            }
        } else {
            cartData[productId] = {};
            cartData[productId][size] = 1;
        }
        setcartItem(cartData);
        console.log(backendUrl)
        console.log("Added to cart:", cartData);
        if(usertoken){
            try{
                await axios.post(`${backendUrl}/api/cart/addtoCart`,{itemId:productId,size},{headers:{token:usertoken}});
                toast.success("product add to cart ")
            }
            catch(error){
                toast.error(error.message)
            }
        }
    }
    };

    const removecart = async (productId, size) => {
        let cartData = structuredClone(cartItem);
        delete cartData[productId][size];
        if (Object.keys(cartData[productId]).length === 0) {
            delete cartData[productId];
        }
        setcartItem(cartData);
        if(usertoken){
            try{
                await axios.post(`${backendUrl}/api/cart/removecart`,{productId,size},{headers:{token:usertoken}});
            }
            catch(error){
                toast.error(error.message)
            }
        }
        console.log("Removed from cart:", cartData);
    };

    const Updatequantity=async(productId,size,cnt)=>{
        const Updatedcart={...cartItem};
        if(Updatedcart[productId] && Updatedcart[productId][size]){
          Updatedcart[productId][size]=Number(cnt);
          setcartItem(Updatedcart)
        }
        if(usertoken){
            try{
                await axios.post(`${backendUrl}/api/cart/updateCart`,{itemId:productId,size,cnt},{headers:{token:usertoken}});

            }
            catch(error){
                toast.error(error.message)
            }
        }
    }

    //get cartData
    const getCartData=async()=>{
        try{
             const {data}=await axios.post(`${backendUrl}/api/cart/getuserCart`,{},{headers:{token:usertoken}});
             if(data.success){
                setcartItem(data.cartData);
                console.log(data.cartData)
             }
             else{
                toast.error(data.message)
             }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    //get orderdata for user
    const orderData=async()=>{
        try{
            const {data}=await axios.post(`${backendUrl}/api/order/Userorders`,{},{headers:{token:usertoken}});
            if(data.success){
                setorder(data.orders);
                console.log(data.orders)
            }
            else{
                toast.error("404");
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    useEffect(() => {
        let count = 0;
        let stotal = 0;

        for (let productId in cartItem) {
            for (let size in cartItem[productId]) {
                const prodata = products.find(item => item._id === productId);
                if (prodata) {
                    count += cartItem[productId][size];
                    stotal += prodata.price * cartItem[productId][size];
                }
            }
        }

        setCartcnt(count);
        setsubtotal(stotal);
        settotal(stotal > 0 ? stotal + deliveryFee : 0);
    }, [cartItem, products]);



    useEffect(()=>{
        if(usertoken){
            getCartData();
            orderData();
        }
        //console.log(products)
    },[usertoken])

    useEffect(() => {
         getallproduct()
         
    }, [])  
    const value = {
        products,
        currencySymbol,
        deliveryFee,
        search,
        setsearch,
        showsearch,
        setshowsearch,
        cartItem,
        setcartItem,
        addProTocart,
        cartcnt,
        removecart,
        subtotal,
        total,
        usertoken,
        setusertoken,backendUrl,Updatequantity,order
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
