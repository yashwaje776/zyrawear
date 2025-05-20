import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Admincontext } from '../context/Admincontext'
import { toast } from 'react-toastify'
import axios from 'axios'


const AddProduct = () => {

    const {backendUrl,token}=useContext(Admincontext)

     const [image1,setimage1]=useState("")
     const [image2,setimage2]=useState("")
     const [image3,setimage3]=useState("")
     const [image4,setimage4]=useState("")
     const [name,setname]=useState("")
     const [description,setdesciption]=useState("")
     const [category,setcategory]=useState("Men")
     const [subCategory,setsubCategory]=useState("Topwear")
     const [price,setprice]=useState(0);
     const [sizes,setsizes]=useState([])
     const [bestseller,setbestseller]=useState(false);
    console.log(backendUrl,token)
    const func=(currsize)=>{
        if(sizes.includes(currsize)){
            const data=sizes.filter(item=>item!==currsize)
            setsizes(data);
        }
        else{
            setsizes([...sizes,currsize])
        }
    }

    const addproduct=async()=>{
        try{
                const formData = new FormData();
                formData.append('image1', image1);
                formData.append('image2', image2);
                formData.append('image3', image3);
                formData.append('image4', image4);
                formData.append('name', name);
                formData.append('description', description);
                formData.append('category', category);
                formData.append('subCategory', subCategory);
                formData.append('price', price);
                formData.append('sizes', JSON.stringify(sizes));
                formData.append('bestseller', bestseller);
                const { data } = await axios.post(`${backendUrl}/api/products/add-product`,formData,{headers: {token},});
            if(data.success){
                toast.success("product is Added")
            }
            else{
                toast.error(data.message)
            }

        }
        catch(error){
            toast.error(error.message);
        }
    }

    const submithandler= async(e)=>{
        
        e.preventDefault();
        
        await addproduct();
        setimage1("")
        setimage2("")
        setimage3("")
        setimage4("")
        setname("")
        setdesciption("")
        setcategory("")
        setsubCategory("")
        setprice(0)
        setsizes([])
        setbestseller(false)



    }

  return (
    <form className='flex flex-col gap-4 text-gray-600' onSubmit={(e)=>submithandler(e)}>
        <p>Upload Image</p>
        <div className='flex gap-4'>
            <label htmlFor='image1'>
                <img src={image1? URL.createObjectURL(image1):assets.upload_area } className='w-20'></img>
                <input type='file' id='image1' hidden onChange={(e)=>setimage1(e.target.files[0])}></input>
            </label>
            <label htmlFor='image2'>
                <img src={image2? URL.createObjectURL(image2):assets.upload_area } className='w-20'></img>
                <input type='file' id='image2' hidden onChange={(e)=>setimage2(e.target.files[0])}></input>
            </label>
            <label htmlFor='image3'>
                <img src={image3? URL.createObjectURL(image3):assets.upload_area }className='w-20'></img>
                <input type='file' id='image3' hidden onChange={(e)=>setimage3(e.target.files[0])}></input>
            </label>
            <label htmlFor='image4'>
                <img src={image4? URL.createObjectURL(image4):assets.upload_area } className='w-20 '></img>
                <input type='file' id='image4' hidden onChange={(e)=>setimage4(e.target.files[0])}></input>
            </label>
        </div>
        <div className='flex flex-col gap-2'>
            <p>Product name</p>
            <input type='text' className='border w-[500px] py-1.5 px-2 rounded' placeholder='product name' value={name} onChange={(e)=>setname(e.target.value)}></input>
        </div>
        <div className='flex flex-col gap-2'>
            <p>Product description</p>
             <textarea className='border w-[500px] py-1.5 px-2 rounded' rows={3} placeholder='product description......' value={description} onChange={(e)=>setdesciption(e.target.value)}></textarea>
        </div>
        <div className='flex gap-8'>
            <div className='flex flex-col gap-2'>
                <p>Product category</p>
                <select className='border py-2 px-2 rounded' onChange={(e)=>setcategory(e.target.value)}>
                    <option value={"Men"}>Men</option>
                    <option value={"Women"}>Women</option>
                    <option value={"Kids"}>Kids</option>
                </select>
            </div>
            <div className='flex flex-col gap-2'>
                <p>Sub category</p>
                <select className='border py-2 px-2 rounded' onChange={(e)=>setsubCategory(e.target.value)}>
                    <option value={"Topwear"} >Topwear</option>
                    <option value={"Bottomwear"}>Bottomwear</option>
                    <option value={"Winterwear"}>Winterwear</option>
                </select>
            </div>
            <div className='flex flex-col gap-2 '>
                <p>Product Price</p>
                <input type='Number' className='border py-2 px-2 rounded' placeholder='0' value={price} onChange={(e)=>setprice(e.target.value)}></input>
            </div>
        </div>
        <div className='flex gap-2 flex-col'>
           <p>Product Size</p>
            <div className='flex gap-4'>
                <p className={` text-gray-700 px-3 py-1 text-center cursor-pointer   ${sizes.includes("S")?"bg-[#ffebf5]" :"bg-gray-300"}`} onClick={()=>func("S")} >S</p>
                <p className={` text-gray-700 px-3 py-1 text-center cursor-pointer ${sizes.includes("M")?"bg-[#ffebf5]" :"bg-gray-300"}`} onClick={()=>func("M")}>M</p>
                <p className={` text-gray-700 px-3 py-1 text-center cursor-pointer ${sizes.includes("L")?"bg-[#ffebf5]" :"bg-gray-300"}`} onClick={()=>func("L")}>L</p>
                <p className={` text-gray-700 px-3 py-1 text-center cursor-pointer ${sizes.includes("XL")?"bg-[#ffebf5]" :"bg-gray-300"}`} onClick={()=>func("XL")}>XL</p>
                <p className={` text-gray-700 px-3 py-1 text-center cursor-pointer ${sizes.includes("XXL")?"bg-[#ffebf5]" :"bg-gray-300"}`} onClick={()=>func("XXL")}>XXL</p>
            </div>
        </div>
        <div className='flex gap-2'>
            <input type='checkbox' id='bestseller' onChange={(e) => setbestseller(e.target.checked)}/>
            <p>Add to bestseller</p>
        </div>
        <button type='submit' className='bg-black text-white w-[100px] py-3 px-2 cursor-pointer'>ADD</button>
        

    </form>
  )
}

export default AddProduct
