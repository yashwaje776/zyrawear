import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItem, products, currencySymbol, deliveryFee, removecart, subtotal, total, Updatequantity } = useContext(ShopContext);
  const [cartProduct, setcartProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cartData = [];
    for (let productId in cartItem) {
      for (let size in cartItem[productId]) {
        if (cartItem[productId][size] >= 1) {
          let productData = products.find(item => item._id === productId);
          if (productData) {
            cartData.push({
              prodata: productData,
              size: size,
              quantity: cartItem[productId][size]
            });
          }
        }
      }
    }
    setcartProduct(cartData);
  }, [cartItem, products]);

  return (
    <div className="border-t border-gray-300">
      <div className="flex pt-10 flex-col gap-4">
        <div className="text-2xl">
          <Title text1="YOUR" text2="CART" />
        </div>

        <div className="flex flex-col gap-4">
          {cartProduct.map((item, idx) => (
            <div key={idx} className="flex rounded border border-gray-300 shadow-lg py-2 gap-4 items-center justify-between">
              <div className="flex gap-4 items-center w-[500px] ml-4">
                <img src={item.prodata.image[0]} alt={item.prodata.name} className="w-20" />
                <div className="flex flex-col gap-4">
                  <p className="text-gray-600 font-bold">{item.prodata.name}</p>
                  <div className="flex gap-4 text-gray-600 items-center">
                    <p>{currencySymbol}{item.prodata.price}</p>
                    <p className="border border-gray-300 px-3 py-1">{item.size}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  max={10}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                  onChange={(e) => {
                    let value = Math.max(1, Math.min(10, Number(e.target.value)));
                    Updatequantity(item.prodata._id, item.size, value);
                  }}
                />
              </div>
              <button onClick={() => removecart(item.prodata._id, item.size)} className="cursor-pointer">
                <img src={assets.bin_icon} alt="Remove Item" className="w-5 mr-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pl-10 mt-10">
        <div className="flex flex-col w-[500px] gap-4 p-4 rounded">
          <div className="text-2xl">
            <Title text1="CART" text2="TOTALS" />
          </div>

          <div className="text-sm flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal:</p>
              <p className="font-semibold">{currencySymbol}{subtotal}.00</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-600">Shipping Fee:</p>
              <p className="font-semibold">{currencySymbol}{deliveryFee}.00</p>
            </div>

            <div className="flex justify-between border-t pt-2 mt-2 border-gray-200">
              <p className="text-gray-900 font-bold">Total:</p>
              <p className="font-bold">{currencySymbol}{total}.00</p>
            </div>
          </div>

          <div className="flex justify-end pt-5">
            <button
              className="bg-black text-white py-2 px-4 rounded cursor-pointer"
              onClick={() => navigate("/placeOrder")} >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
