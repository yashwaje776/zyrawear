import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {search,setsearch,showsearch,setshowsearch}=useContext(ShopContext);
    const location=useLocation();
    useEffect(()=>{
       if(location.pathname!=='/collection'){
            setshowsearch(false)
       }
   },[location])

  return showsearch?(
    <div className=' border-t border-b border-gray-300 bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-4 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 '>
            <input type='text' placeholder='Search' className='flex-1 outline-none text-sm' value={search} onChange={(e)=>setsearch(e.target.value)}></input>
            <img src={assets.search_icon} className='w-5 cursor-pointer'></img>
        </div>
        <img onClick={()=>setshowsearch(false)} src={assets.cross_icon} className='inline w-3 cursor-pointer'></img>
    </div>
  ):null
}

export default SearchBar
