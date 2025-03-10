import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='my-8 flex items-center justify-center flex-col'>
            <div className='text-4xl flex flex-col items-start'>
                <h1 className='font-bold'>Hey I am the code Master !</h1>
                <h2>Discover new blogs of technology and trends...</h2>
            </div>
            <div className='my-8 flex flex-col md:flex-row items-center justify-between gap-8'>
                <div className='w-full md:w-1/2'> <img src='../../../public/images.jpg' alt='blog' className='rounded w-full h-[30vh] md:h-[40vh] lg:h-[50vh] object-cover' /></div>
                <div className='w-full md:w-1/2'>
                    <h1 className='text-3xl font-bold'>Lorem Ipsum</h1>
                    <p className='mt-2 mb-8'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum amet, debitis veritatis reprehenderit est odio nobis laborum totam, error ad repellat minus deleniti alias nemo dolorum corrupti repudiandae. Eos, eaque.
                    </p>
 <Link
             
              className="
             bg-gradient-to-r from-yellow-400 to-yellow-600 
  text-white font-semibold px-6 py-2 rounded-lg 
  shadow-md hover:shadow-lg transition 
  hover:scale-105 duration-300"
            >
              Read more
            </Link>                </div>
                
            </div>
        </div>
    );
};

export default Header
