import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

   const{ usertoken,setusertoken,backendUrl}=useContext(ShopContext)

   const [islogin,setislogin]=useState(false)
   const [name,setname]=useState("");
   const [email,setemail]=useState("")
   const [password,setpassword]=useState("")
   const navigate=useNavigate();

   const submithandler=async(e)=>{
        e.preventDefault();
        try{
          if(islogin===false){
            const {data}= await axios.post(`${backendUrl}/api/user/register`,{name,email,password});
            if(data.success){
              setusertoken(data.token);
              localStorage.setItem("usertoken",data.token)
              navigate("/")
            }
            else{
              toast.error(data.message)
            }
          }
          else{
            const {data}= await axios.post(`${backendUrl}/api/user/login`,{email,password});
            if(data.success){
              setusertoken(data.token);
              localStorage.setItem("usertoken",data.token)
              navigate("/")
            }
            else{
              toast.error(data.message)
            }

          }

        }
        catch(error){
              toast.error(error)
        }
        setname("");
        setpassword("")
        setemail("")
   }

   useEffect(()=>{
    if(usertoken){
      navigate("/")
    }
   },[usertoken])




  return (
    <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 ' onSubmit={(e)=>submithandler(e)}>
       
       {islogin ? (
          <div className='flex items-center gap-2 text-3xl mt-10'>
            <p className='prata-regular'>Login</p>
            <hr className='w-12 h-1 bg-gray-400 border-0' />
          </div>
        ) : (
          <div className='flex items-center gap-2 text-3xl mt-10'>
            <p className='prata-regular'>Sign Up</p>
            <hr className='w-12 h-1 bg-gray-400 border-0' />
          </div>
        )}
        {
          islogin?"":<input type='text' className='border w-full px-3 py-2' placeholder='Name' required={true} value={name} onChange={(e)=>setname(e.target.value)}></input>
        }
        <input type='email' className='border w-full px-3 py-2' placeholder='Email' required={true} value={email} onChange={(e)=>setemail(e.target.value)}></input>
        <input type='password' className='border w-full px-3 py-2' placeholder='Password' required={true} value={password} onChange={(e)=>setpassword(e.target.value)}></input>
        <div className='flex gap-4 justify-between w-full'>
          <p>Forgot your password?</p>
          {
            islogin?<p className='cursor-pointer' onClick={()=>setislogin(false)}>Create account</p>:<p className='cursor-pointer' onClick={()=>setislogin(true)}>Login Here</p>
          }
        </div>
        {
          islogin?<button className='bg-black text-white px-8 py-2'>Sing In</button>:<button className='bg-black text-white px-8 py-2'>Sign Up</button>
        }

        
      
    </form>
  )
}

export default Login
