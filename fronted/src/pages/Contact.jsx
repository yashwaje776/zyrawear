import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import Subscribe from "../components/Subscribe";

const Contact = () => {
  return (
    <div className="border-t border-gray-300 ">
      <div className="pt-10 text-2xl text-center">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="flex flex-col sm:flex-row my-10 gap-10 w-full justify-center items-center mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[450px] "
          alt="Contact"
        />

        <div className="flex flex-col justify-center items-center text-center gap-4 sm:items-start sm:text-left sm:max-w-md">
          <h2 className="text-2xl font-semibold">Our Store</h2>

          <p className="text-gray-700">
            54709 Willms Station
            <br />
            Suite 350, Washington, USA
          </p>

          <p className="text-gray-700">
            Tel: (415) 555-0132
            <br />
            Email:{" "}
            <a
              href="mailto:admin@forever.com"
              className="text-blue-600 underline"
            >
              admin@forever.com
            </a>
          </p>

          <div className="mt-4">
            <h3 className="text-xl font-medium">Careers at Forever</h3>
            <p className="text-gray-600 mb-4">
              Learn more about our teams and job openings.
            </p>
            <button className="border border-black px-5 py-3 hover:text-white hover:bg-black transition duration-300">
              Explore job
            </button>
          </div>
        </div>
      </div>

      <Subscribe />
    </div>
  );
};

export default Contact;
