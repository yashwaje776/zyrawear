import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const {products,showsearch,search}=useContext(ShopContext)
   
  const [filterProduct,setfilterProduct]=useState([]);

  const [category,setCategory]=useState([]);
  const [Subcategory,setSubcategory]=useState([]);

   const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
       setCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  const togglesubCategory=(e)=>{
    if(Subcategory.includes(e.target.value)){
      let copy=Subcategory.slice();
      copy=copy.filter(item=>item!==e.target.value)
      setSubcategory(copy)
    }
    else{
      setSubcategory(prev=>[...prev,e.target.value])
    }
  }
 
 const applyfilter=()=>{
     let productscopy=products.slice();
     if(showsearch && search){
        productscopy=productscopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
     }
      if(category.length>0){
        productscopy=productscopy.filter(item=>category.includes(item.category))
      }
      if(Subcategory.length>0){
        productscopy=productscopy.filter(item=>Subcategory.includes(item.subCategory))
      }
      setfilterProduct(productscopy);
  }

  const sortProducts=(e)=>{
        let filterProductcopy=filterProduct.slice();
        if(e.target.value==='low-high'){
          filterProductcopy=filterProductcopy.sort((a,b)=>a.price-b.price)
          setfilterProduct(filterProductcopy);
        }
        else if(e.target.value==='high-low'){
          filterProductcopy=filterProductcopy.sort((a,b)=>b.price-a.price)
          setfilterProduct(filterProductcopy);
        }
        else{

          applyfilter();
        }
  }


 
  
  useEffect(()=>{
    applyfilter();
  },[Subcategory,category,products,search,showsearch])




  return (
    <div className='flex flex-col sm:flex-row border-t border-gray-300 gap-10 pt-10'>

      <div className='min-w-60'>
        <p className='text-xl cursor-pointer py-2'>FILTERS</p>
        <div className='border border-gray-300 mt-5 pl-5 py-3 text-sm'>
          <p className='c text-sm'>CATEGORIES</p>
          <div className='flex flex-col gap-1 mt-3 text-gray-700'>
            <p className='flex gap-2'><input type='checkbox' value={'Men'} onChange={toggleCategory}></input>Men</p>
            <p className='flex gap-2'><input type='checkbox' value={'Women'} onChange={toggleCategory}></input>Women</p>
            <p className='flex gap-2'><input type='checkbox' value={'Kids'} onChange={toggleCategory}></input>Kids</p>
          </div>
        </div>

        <div className='border border-gray-300 mt-5 pl-5 py-3 text-sm'>
            <p className='font-medium'>TYPE</p>
            <div className='flex flex-col gap-1 mt-3 text-gray-700'>
            <p className='flex gap-2'><input type='checkbox' value={'Topwear'} onChange={togglesubCategory}></input>Topwear</p>
            <p className='flex gap-2'><input type='checkbox' value={'Bottomwear'} onChange={togglesubCategory}></input>Bottomwear</p>
            <p className='flex gap-2'><input type='checkbox' value={'Winterwear'} onChange={togglesubCategory}></input>Winterwear</p>
            </div>
        </div>

      </div>

      <div className='flex-1'>
          <div className='flex text-2xl justify-between items-center mb-4 '>  
            <Title text1='ALL' text2='COLLECTIONS'/>
            <select className='border-2 border-gray-300  text-sm px-2 py-2' onChange={sortProducts}>
              <option value="relevant" >Sort by: Relevant</option>
              <option value="low-high" >Sort by: Low to High</option>
              <option value="high-low" >Sort by: High to Low</option>
            </select> 
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {
                filterProduct.map((item,idx)=>(
                  <ProductItem key={idx} Id={item._id} name={item.name} price={item.price} image={item.image}/>
                ))
              }
          </div>

      </div>

      
      
    </div>
  )
}

export default Collection
