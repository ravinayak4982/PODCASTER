import React, { useEffect, useState } from 'react'
import BlogCard from '../Blog Card/BlogCard';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Favourites = () => {
   const [Data, setData] = useState();
    const backendLink = useSelector((state) => state.prod.link);
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`${backendLink}/app/v1/getFavreteByUser`,{withCredentials:true});
           setData(res.data.favreteBlog);


        }
        fetch();
    }, [])
  return (
    <div className=''>
      <h1 className='text-xl font-semibold mb-4 mt-8'>Favourites Blogs</h1>
      <div className='flex flex-col gap-8 lg:gap-4'>
        {Data && Data.map((items, i) => {
          return (
            <div key={i} className='flex flex-col lg:flex-row gap-2 lg:gap-4'>
              <BlogCard items={items} />
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Favourites
