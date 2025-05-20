import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const {setshowsearch,cartcnt,setusertoken,setcartItem,usertoken}=useContext(ShopContext)
    const [display,setdisplay]=useState(false);
    const navigate=useNavigate();
    const searchfun=()=>{
        navigate('/collection')
        setshowsearch(true)
    }
    const logOut=()=>{
        localStorage.removeItem('usertoken');
        setusertoken("");
        setcartItem({});
        navigate('/login')
    }
  return (
    <div className='flex item-center justify-between py-5 font-medium '>

        <Link to='/'><img  className='w-36 cursor-pointer' src={assets.zyrawear}></img></Link>

        <ul className='hidden sm:flex gap-5 items-center text-sm text-gray-700'>
            <NavLink to="/" className='flex flex-col  '>
                <p className=''> HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 m-auto hidden'/>
            </NavLink>
            <NavLink to="/collection" className='flex flex-col '>
                <p> COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 m-auto  hidden'/>
            </NavLink>
            <NavLink to="/about"className='flex flex-col  '>
                <p> ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 m-auto hidden'/>
            </NavLink>
            <NavLink to="/contact" className='flex flex-col  '>
                <p className=''> CONTACT</p>
                <hr className='w-2/4 h-[1.5px] bg-gray-700 m-auto hidden '/>
            </NavLink>
        </ul>

        <div className='flex items-center gap-5'>
            <img onClick={searchfun} src={assets.search_icon} className='w-5 cursor-pointer'/>
            <div className='group relative'>
                <img onClick={()=>usertoken ? null :navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer'></img>
                {usertoken && <div className='absolute pt-4 right-0 bg-white shadow-lg rounded-md hidden group-hover:block'>
                    <div className='flex flex-col gap-2 p-4 w-36 bg-slate-100 text-gray-500 rounded-md'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p className='cursor-pointer hover:text-black' onClick={()=>navigate('/orders')}>Orders</p>
                        <p className='cursor-pointer hover:text-black'onClick={logOut}>Logout</p>
                    </div>
                </div>}
            </div>

            <Link to="/cart" className='relative'>
                <img src={assets.cart_icon} className='w-5 cursor-pointer'></img>  
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white leading-4 aspect-sqaure rounded-full text-[8px]'>{cartcnt}</p> 
            </Link>

            <img onClick={()=>setdisplay(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden'></img>
            <div>
                <div className={`absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-all duration-300 ${display?"w-full":"w-0"}` }>
                    <div className='flex flex-col text-gray-700'>
                        <div onClick={()=>setdisplay(false)} className='flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-200'>
                            <img className='h-4 rotate-180' src={assets.dropdown_icon}></img>
                            <p>Back</p>
                        </div>
                        <NavLink onClick={()=>setdisplay(false)} to="/" className='py-2 pl-6 cursor-pointer border hover:bg-gray-200'>
                            <p> HOME</p>
                        </NavLink>
                        <NavLink onClick={()=>setdisplay(false)} to="/collection" className='py-2 pl-6 cursor-pointer border hover:bg-gray-200'>
                            <p> COLLECTION</p>
                        </NavLink>
                        <NavLink onClick={()=>setdisplay(false)} to="/about"className='py-2 pl-6 cursor-pointer border hover:bg-gray-200'>
                            <p> ABOUT</p>
                        </NavLink>
                        <NavLink onClick={()=>setdisplay(false)} to="/contact" className='py-2 pl-6 cursor-pointer border hover:bg-gray-200'>
                            <p> CONTACT</p>
                        </NavLink>
                    </div>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Navbar
