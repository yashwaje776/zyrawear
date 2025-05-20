import React, { use, useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const Latest_collection = () => {
    const {products} = useContext(ShopContext) 
  return (
    <div className="my-10">
      <div className="text-center  text-3xl  ">
        <Title text1="LATEST" text2="COLLECTIONS"/>
      </div>

      <p className='w-3/4 m-auto text-center  text-gray-600 '>Discover the newest arrivals in fashion-forward styles, designed to elevate your everyday look.</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 py-10'>
          {
            products.slice(0,10).map((item,idx)=>(
              <ProductItem key={idx} Id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))
          }
      </div>
    </div>
    
  )
}

export default Latest_collection
