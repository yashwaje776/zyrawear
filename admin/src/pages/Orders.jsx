import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { Admincontext } from '../context/Admincontext'

const Orders = () => {
  const {orders,currencySymbol,backendUrl,handleStatus}=useContext(Admincontext);

  

  return (
    <div>
      <p className='text-gray-600'>Order Page</p>
      <div className='flex flex-col gap-4 pt-4 bg-white'>
      {
        orders.map((item,idx)=>(
           <div key={idx} className='flex border-3 gap-4 justify-between items-start px-6 py-6 border-gray-400 bg-gray-100'>
              <img src={assets.parcel_icon} className='w-12'></img>
              <div className='flex flex-col gap-2'>
                <div>
                {
                  item.items.map((i,k)=>(
                    <p  key={k} className='text-sm text-gray-600'>{i.name} x {i.quantity} {i.size},</p>
                  ))
                }
                </div>
                <p className='text-sm font-medium text-gray-700'>{item.address.firstname} {item.address.lastname}</p>
                <p className='text-sm text-gray-600'>{item.address.street}</p>
                <p className='text-sm text-gray-600'>{item.address.city} {item.address.state} {item.address.country} {item.address.zipcode}</p>
              </div>
              <div className='flex flex-col gap-3 text-sm text-gray-700'>
                <p>Items: {item.items.length}</p>
                <div>
                  <p>Method : {item.paymentMethod}</p>
                  <p className='flex'>payment : {item.payment?<span>completed</span>:<span>pending</span>}</p>
                  <p>Date: {item.date.split('T')[0]}</p>
                </div>
              </div>
              <p>{currencySymbol} {item.amount}</p>
              <select className='border rounded font-medium px-2 py-1' value={item.status} onChange={(e)=>handleStatus(item._id,e.target.value)}>
                <option>Order Placed</option>
                <option>Packing</option>
                <option>Shipped</option>
                <option>Out for Delivery</option>
                <option>Deliverd</option>
              </select>
           </div>
        ))
      }
      </div>
    </div>
  )
}

export default Orders
