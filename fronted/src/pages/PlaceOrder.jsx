import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { currencySymbol,subtotal,deliveryFee, total,backendUrl,usertoken,cartItem,products,setcartItem} = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      let orderItem=[];
      for(const items in cartItem){
        for(const item in cartItem[items]){
          if(cartItem[items][item]>0){
             const iteminfo=structuredClone(products.find(product=>product._id===items));
             if(iteminfo){
              iteminfo.size=item;
              iteminfo.quantity=cartItem[items][item];
              orderItem.push(iteminfo);
            }
          }
        }
      }
    
      let orderData={
        address:formData,
        items:orderItem,
        amount:total,
      }

      const {data}=await axios.post(`${backendUrl}/api/order/placeOrder`,orderData,{headers:{token:usertoken}})
      console.log(data);
      if(data.success){
         setcartItem({})
         toast.success("Order is Placed")
         navigate("/orders");
      }
      else{
        toast.error(data.message);
      }
    }
    catch(error){
      toast.error(error.message);

    }
  };
  

  return (
    <form className='mt-10 flex flex-col md:flex-row gap-10 px-4 sm:px-8' onSubmit={handleSubmit}>
      
     
      <div className='flex flex-col gap-4 w-full md:w-1/2'>
        <div className='text-2xl'>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className='flex gap-4 flex-col sm:flex-row'>
          <input 
            type='text' 
            name='firstname'
            value={formData.firstname}
            onChange={handleChange}
            placeholder='First name' 
            className='border py-2 border-gray-400 rounded px-3 w-full' 
          />
          <input 
            type='text' 
            name='lastname'
            value={formData.lastname}
            onChange={handleChange}
            placeholder='Last name' 
            className='border py-2 border-gray-400 rounded px-3 w-full' 
          />
        </div>

        <input 
          type='email' 
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email address' 
          className='border py-2 border-gray-400 rounded px-3 w-full' 
        />
        <input 
          type='text' 
          name='street'
          value={formData.street}
          onChange={handleChange}
          placeholder='Street' 
          className='border py-2 border-gray-400 rounded px-3 w-full' 
        />

        <div className='flex gap-4 flex-col sm:flex-row'>
          <input 
            type='text' 
            name='city'
            value={formData.city}
            onChange={handleChange}
            placeholder='City' 
            className='border py-2 border-gray-400 rounded px-3 w-full' 
          />
          <input 
            type='text' 
            name='state'
            value={formData.state}
            onChange={handleChange}
            placeholder='State' 
            className='border py-2 border-gray-400 rounded px-3 w-full' 
          />
        </div>

        <div className='flex gap-4 flex-col sm:flex-row'>
          <input 
            type='text' 
            name='zipcode'
            value={formData.zipcode}
            onChange={handleChange}
            placeholder='Zipcode' 
            className='border py-2 border-gray-400 rounded px-3 w-full' 
          />
          <input 
            type='text' 
            name='country'
            value={formData.country}
            onChange={handleChange}
            placeholder='Country' 
            className='border py-2 border-gray-400 rounded px-3 w-full' 
          />
        </div>

        <input 
          type='tel' 
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          placeholder='Phone' 
          className='border py-2 border-gray-400 rounded px-3 w-full' 
        />
      </div>

   
      <div className='w-full md:w-1/2'>
        <div className='flex flex-col gap-6 p-6 rounded border border-gray-200 shadow-sm'>
          
          <div className='text-2xl'>
            <Title text1={"CART"} text2={"TOTALS"} />
          </div>

          <div className='text-sm flex flex-col gap-2'>
            <div className='flex justify-between'>
              <p className='text-gray-600'>Subtotal:</p>
              <p className='font-semibold'>{currencySymbol}{subtotal}.00</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-600'>Shipping Fee:</p>
              <p className='font-semibold'>{currencySymbol}{deliveryFee}.00</p>
            </div>
            <div className='flex justify-between border-t pt-2 mt-2 border-gray-200'>
              <p className='text-gray-900 font-bold'>Total:</p>
              <p className='font-bold'>{currencySymbol}{subtotal === 0 ? '0.00' : `${total}.00`}</p>
            </div>
          </div>

          <div className='pt-5'>
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>

          <div className='flex flex-col gap-3 sm:flex-row'>
           

            <label className='flex items-center border rounded px-4 py-3 cursor-pointer gap-4 hover:border-black w-full'>
              <input 
                type="radio" 
                name="payment" 
                className='w-4 h-4'
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")} 
              />
              <span className='text-sm'>Cash on Delivery</span>
            </label>
          </div>

          <div className='flex justify-end pt-5'>
            <button 
              type='submit' 
              className='bg-black text-white py-2 px-5 rounded hover:bg-gray-800 transition duration-200'
            >
              PLACE ORDER
            </button>
          </div>

        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
