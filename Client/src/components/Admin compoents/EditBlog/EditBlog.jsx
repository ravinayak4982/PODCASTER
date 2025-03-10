import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const EditBlog = () => {
 const [Data, setData] = useState();
    const backendLink = useSelector((state) => state.prod.link);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${backendLink}/app/v1/all-blog`);
      setData(res.data.blogs);


    }
    fetch();
  }, [Data]);
  const deleteBlogHandler = async (id) => {
    try {
      const res = await axios.delete(`${backendLink}/app/v1/deleteBlog/${id}`, { withCredentials: true });
     toast.success(res.data.message);
    } catch (error) {
    toast.error(error.response.data.message);
    }
  }
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Edit Blogs</h1>
      <div className='grid grid-cols-3 gap-8 lg:gap-4 my-4  '>
        {Data && Data.map((items, i) => {
          return (
            <div className='bg-white rounded-xl p-4 flex items-center flex-col justify-center hover:transition 
  hover:scale-105 duration-300' key={{i}}>
              <div className='w-full '>
                <img src={items.image} alt='recent' className='rounded object-cover' />
              </div>
              <div className='mt-4'> <h1 className='text-2xl font-semibold'>{items.tittle}</h1>
                <p className='mb-4'>{items.desc.slice(0, 130)}...</p></div>
              <div className='w-[100%] flex items-center justify-between gap-4'>
                <button 
                  className='w-[100%] py-2  bg-zinc-800 bg-gradient-to-r from-red-600 to-red-800 
  text-white font-semibold px-8  rounded-lg 
  shadow-md hover:shadow-lg transition 
  hover:scale-105 duration-300' onClick={()=>deleteBlogHandler(items._id)}>
                 Delete
                </button>
                <Link to={`/admin-dashboard/update-blogs/${items._id}`}
                  className=' flex items-center justify-center w-[100%] py-2  bg-zinc-800 bg-gradient-to-r from-yellow-400 to-yellow-600 
  text-white font-semibold px-8  rounded-lg 
  shadow-md hover:shadow-lg transition 
  hover:scale-105 duration-300'>
             Edit
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default EditBlog