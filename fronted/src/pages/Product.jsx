import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';

const Product = () => {
  const { productId } = useParams();
  const { products,currencySymbol,addProTocart} = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size,setsize]=useState("")
  const [relatedPro,setrelatedPro]=useState([])

  const fetchProductData = () => {
    const match = products.find(item => item._id === productId);
    if (match) {
      setProductData(match);
      const cat=match.category
      const subcat=match.subCategory
      let allproduct=products.slice()
      allproduct=allproduct.filter(item=>cat===item.category );
      allproduct=allproduct.filter(item=>subcat===item.subCategory);
      console.log(allproduct)
      setrelatedPro(allproduct)
      setImage(match.image?.[0] || '');
    } else {
      setProductData(null);
    }
  };

  useEffect(() => {
    fetchProductData();

  }, [productId, products]);



  if (!productData) return <div className='p-4'>Product not found or loading...</div>;

  return (
    <div className='border-t-2 border-gray-300 pt-10'>

        <div className='flex gap-12 flex-col sm:flex-row '>
            <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row '>
              <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                  {
                    productData.image.map((item,idx)=>(
                      <img onClick={()=>setImage(item)} key={idx} src={item} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-lg'></img>
                    ))
                  }
              </div>

              <div className='w-full sm:w-[80%]'>
                  <img src={image} className='w-full h-auto object-cover rounded-lg'></img>
              </div>

            </div>

            <div className='flex-1 '>
              <h1 className='text-2xl font-medium mt-2'>{productData.name}</h1>
              <div className='flex items-center gap-1 mt-1'>
                  <img src={assets.star_icon} className='w-3.5 h-3'></img>
                  <img src={assets.star_icon} className='w-3.5 h-3'></img>
                  <img src={assets.star_icon} className='w-3.5 h-3'></img>
                  <img src={assets.star_icon} className='w-3.5 h-3'></img>
                  <img src={assets.star_dull_icon} className='w-3.5 h-3 '></img>
                  <p className='ml-2'>(122)</p>
              </div>
              <p className='text-3xl font-medium mt-5'>{currencySymbol}{productData.price}  </p>
              <p className='text-gray-400 w-3/4 mt-5'>{productData.description}</p>
              <div className='flex flex-col gap-4 mt-8'>
                 <p className='text-xl'>select size</p>
                 <div className='flex gap-2'>
                  {
                    productData.sizes.map((items,idx)=>(
                      <button key={idx} className={`bg-gray-200 w-16 h-10 py-2 px-4 rounded-md border-1 ${size === items ? "border-yellow-500" : "border-transparent"}`} onClick={() => setsize(items)}> {items}</button>
                    ))
                  }
                 </div>
              </div>
              <button className='bg-black text-white mt-8 py-3 px-8 text-sm' onClick={()=>addProTocart(productData._id,size)}>ADD TO CART</button>
              <hr className='mt-8 border-gray-300'></hr>
              <div className='mt-8 text-sm text-gray-500'>
                <p>100% Original product.</p>
                <p> Cash on delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
        </div>
        <div className='flex flex-col pt-10'>
              <p className='flex text-sm'><span className='border py-2 px-4 border-gray-300 font-bold'>Description</span><span className='border py-2 px-4  border-gray-300'>Reviews (122)</span></p>
              <div className='flex border border-gray-300 flex-col text-sm text-gray-500 gap-4 px-4 py-6'>
                  <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                  <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
              </div>
        </div>
        <div className=' text-center text-3xl pt-20'>
          
        <Title text1={"RELATED"} text2={"PRODUCTS"}></Title>
        </div>
        <div className='flex gap-4 pt-2'>
          {
            relatedPro.slice(0,5).map((item,idx)=>(
             
              <ProductItem Id={item._id} name={item.name} price={item.price} image={item.image} key={idx}></ProductItem>
             
            ))
          }
        </div>

    </div>
  );
};

export default Product;
