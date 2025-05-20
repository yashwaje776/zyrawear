import React from "react";

const Title = ({ text1, text2 }) => {
  return (
        <div className="inline-flex items-center gap-2 mb-3">
          <p className="text-gray-400 ">{text1}</p>
          <span className="text-gray-700 font-medium ">{text2}</span>
          <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
        </div>
  );
};

export default Title;
