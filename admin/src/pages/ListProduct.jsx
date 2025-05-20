import React, { useContext } from 'react'
import { Admincontext } from '../context/admincontext'
import { assets } from '../assets/assets'

const ListProduct = () => {
        
        const{products,currencySymbol,removeproduct}=useContext(Admincontext)
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-gray-600'>All Products List</p>
      <div className='grid border border-gray-200 bg-gray-100 grid-cols-[1fr_3fr_1fr_1fr_1fr] px-1 text-gray-600 font-bold'>
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>
    
        {
          products.map((item,idx)=>(
            <div key={idx} className='grid border border-gray-200  grid-cols-[1fr_3fr_1fr_1fr_1fr] px-1 py-1 text-gray-500 text-sm items-center'>
                  <img src={item.image[0]} className='w-12'></img>
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{currencySymbol}{item.price}</p>
                  <img src={assets.cross_icon} className='w-3 h-3 cursor-pointer' onClick={()=>removeproduct(item._id)}></img>
            </div>
          ))
        }
     
      
    </div>
  )
}

export default ListProduct
