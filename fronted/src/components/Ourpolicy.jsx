import React from 'react'
import { assets } from '../assets/assets'

const Ourpolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row text-center py-2 gap-12 justify-around'>
        <div className='flex flex-col  items-center'>
            <img className='w-12 mb-5' src={assets.exchange_icon}></img>
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'> We offer hassle free exchange policy</p>

        </div>
            
        <div className='flex flex-col  items-center'>
            <img className='w-12 mb-5' src={assets.quality_icon}></img>
            <p className='font-semibold'>Best customer support</p>
            <p className='text-gray-400'>we provide 24/7 customer support</p>

        </div>
        <div className='flex flex-col  items-center'>
            <img className='w-12 mb-5' src={assets.support_img}></img>
            <p className='font-semibold'>Best customer support</p>
            <p className='text-gray-400'>we provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default Ourpolicy
