import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    
  return (
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-30 text-sm'>
        <div className='flex flex-col gap-5'>
            <img src={assets.zyrawear} className='w-32 mb-5'></img>
            <p className='w-2/3 text-gray-600'>Your style destination — blending comfort, confidence, and trend.
Crafted with care. Inspired by you.

© 2025 ZyraWear. All rights reserved.
This site uses industry-standard practices in fashion e-commerce. Designed for modern lifestyles.</p>
        </div>
        <div className='flex flex-col'>
            <p className='mb-5 text-xl font-medium'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                 <NavLink to="/" className='flex flex-col  '>
                <p className=''> HOME</p>
                
            </NavLink>
            <NavLink to="/collection" className='flex flex-col '>
                <p> COLLECTION</p>
                
            </NavLink>
            <NavLink to="/about"className='flex flex-col  '>
                <p> ABOUT</p>
                
            </NavLink>
            <NavLink to="/contact" className='flex flex-col  '>
                <p className=''> CONTACT</p>
                
            </NavLink>
            </ul>
        </div>
        <div  className='flex flex-col'>
            <p className='mb-5 text-xl font-medium'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>
                +1-000-000-0000
                </li>
                <li>
                   abc@gmail.com
                </li>
                <li>
                    1234 Street Name, City, State, USA
                </li>

            </ul>
        </div>
      
    </div>
  )
}

export default Footer
