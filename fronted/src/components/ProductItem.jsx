import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ Id, name, price, image }) => {
  const {currencySymbol} = useContext(ShopContext);

  return (
    <Link to={`/product/${Id}`} className="text-gray-700 cursor-pointer shadow-lg border border-gray-300 rounded overflow-hidden">
        <div className="overflow-hidden border-b border-gray-300">
          <img className=" transition duration-300 ease-in-out hover:scale-110  " src={image[0]} alt="product" />
        </div>
        <div className="p-4">
          <h3 className="text-gray-800 text-sm md:text-base font-medium truncate">
            {name}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {currencySymbol}
            {price.toFixed(2)}
          </p>
      </div>
    </Link>
  );
};

export default ProductItem;
