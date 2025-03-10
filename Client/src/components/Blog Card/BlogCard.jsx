import React from 'react'
import { Link } from 'react-router-dom';

const BlogCard = ({ items }) => {

    return (
        <>
            <div className='w-full lg:w-2/6 p-0'><img src={items.image} alt='recent'className='rounded object-cover w-full h-[300px]'/></div>
            <div className='w-full lg:w-4/6'>
                <h1 className='text-2xl font-semibold'>{items.tittle}</h1>
                {!window.location.href.includes("/profile")&&(<p className='mb-4'>{items.desc.slice(0, 130)}...</p>
)}
                <Link to={`/description/${items._id}`}
             
              className="
             bg-gradient-to-r from-yellow-400 to-yellow-600 
  text-white font-semibold px-6 py-2 rounded-lg 
  shadow-md hover:shadow-lg transition 
  hover:scale-105 duration-300"
            >
             Read more
            </Link>                
            </div>
        </>
    );
};

export default BlogCard