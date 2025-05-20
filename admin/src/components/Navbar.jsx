import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { Admincontext } from '../context/admincontext'

const Navbar = () => {
    const {settoken}=useContext(Admincontext);
    const logout=()=>{
        localStorage.removeItem("token");
        settoken("");
    }
  return (
    <div className='flex justify-between  py-2 items-center '>
        <img src={assets.zyrawear} className='w-36 mx-[4%]'></img>
        <button className='bg-black text-white rounded-full px-6 h-10 mx-[4%] cursor-pointer' onClick={()=>logout()}>Logout</button>
    </div>
  )
}

export default Navbar
