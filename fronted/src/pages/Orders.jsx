import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
  const { products, currencySymbol,order} = useContext(ShopContext)

  return (
    <div className='border-t border-gray-300 bg-gray-50 min-h-screen px-6'>
      <div className='text-2xl pt-16'>
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className='mt-8 space-y-6'>
        {
        order.map((item, idx) =>
          item.items.map((i, k) => (
            <div key={`${idx}-${k}`} className='border border-gray-300 rounded-md bg-white p-4 shadow-sm flex flex-col md:flex-row md:justify-between md:items-center'>
              <div className='flex gap-4'>
                <img src={i.image[0]} alt={i.name} className='w-24 h-24 object-cover rounded-md' />
                <div>
                  <p className='font-semibold text-lg'>{i.name}</p>
                  <div className='flex flex-wrap gap-4 text-sm mt-1 text-gray-600'>
                    <p>{currencySymbol}{i.price}</p>
                    <p>Quantity: {i.quantity}</p>
                    <p>Size: {i.size}</p>
                  </div>
                  <p className='text-sm text-gray-500 mt-1'>Date: {item.date.split('T')[0]}</p>
                  <p className='text-sm text-gray-500'>Payment: {item.paymentMethod}</p>
                </div>
              </div>

              <div className='flex flex-col md:flex-row md:items-center md:gap-6 mt-4 md:mt-0'>
                <div className='flex items-center gap-2 text-green-700 font-medium'>
                  <span className='w-3 h-3 bg-green-700 rounded-full'></span>
                  <span>{item.status}</span>
                </div>
                <button className='mt-2 md:mt-0 px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition'>
                  Track Order
                </button>
              </div>
            </div>
              ))
            )

        }
       
      </div>
    </div>
  )
}

export default Orders
