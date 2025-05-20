import React, { useState } from 'react'

const Subscribe = () => {
  const [email, setEmail] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <div className='flex flex-col items-center mt-5 py-10'>
      <p className='text-2xl font-medium '>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>Join the ZyraWear community and be the first to know about new drops, exclusive offers, and style tips</p>
      <form onSubmit={submitHandler} className='flex mt-5 w-1/2'>
        <input 
          type='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          placeholder='Enter your mail' 
          className='border border-gray-400 py-2 px-2 w-full outline-none'
        />
        <button type='submit' className='bg-black text-white px-10 py-4 text-xs'>Subscribe</button>
      </form>
    </div>
  );
};

export default Subscribe;
