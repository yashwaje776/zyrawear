import React, { use, useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const val = useContext(ShopContext);
    const [bestSeller, setbestSeller] = useState([]);
    useEffect(() => {
        if (val.products && val.products.length > 0) {
          const bestSellers = val.products.filter(item => item.bestseller === true);
          setbestSeller(bestSellers.slice(0,5));
        }
      }, [val.products]);
    
  return (
    <div className="my-10">
      <div className="text-center  text-3xl ">
        <Title text1="BEST" text2="SELLER"/>
      </div>

      <p className='w-3/4 m-auto text-center  text-gray-600 '>Our top-rated styles, loved by customers and perfect for any occasion.</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 py-10'>
          {
            bestSeller.map((item,idx)=>(
              <ProductItem key={idx} Id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))
          }
      </div>
    </div>
    
  )
}

export default BestSeller
