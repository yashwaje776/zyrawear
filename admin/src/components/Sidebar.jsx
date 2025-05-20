import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
   
    <div className='w-[18%] min-h-screen pt-8 border-r-2 border-gray-300'>
        <div className='flex flex-col gap-4 pl-[20%]'>

        <NavLink to={'/add'} className="flex gap-4  border items-center p-2 rounded border-gray-300">
            <img src={assets.add_icon} className='w-5 h-5'></img>
            <p>Add items</p>
        </NavLink>
        <NavLink to={'/list'} className="flex gap-4 border items-center p-2 rounded border-gray-300">
            <img src={assets.order_icon} className='w-5 h-5'></img>
            <p>List items</p>
        </NavLink>
        <NavLink to={'/orders'} className="flex gap-4 border items-center p-2 rounded border-gray-300">
            <img src={assets.order_icon} className='w-5 h-5'></img>
            <p>Orders</p>
        </NavLink>
       
        </div>

    </div>
   
  )
}

export default Sidebar
