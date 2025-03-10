import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Categorish = () => {
     const backendLink = useSelector((state) => state.prod.link);
    const [cat, setCat] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${backendLink}/app/v1/getCategory`,
      
        { withCredentials: true, }
      );
      setCat(response.data.category);
    }
    fetch()
  }, [backendLink])
  
    return (
        <div className='mb-4 py-4'>
            <h1 className='text-xl font-semibold mb-4'>Categorish</h1>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {cat&&cat.map((items, i) => (
     <Link 
  className={`px-4 py-2 text-center md:text-lg font-semibold 
             rounded-lg shadow-md transition-all 
              hover:scale-105 hover:shadow-lg duration-300 
              border-6 border-transparent hover:border-amber-400 
              text-gray-900 hover:text-gray-100 hover:bg-amber-400`} 
  key={i} 
  to={`/cat/${items._id}`}
>
  {items.tittle}
</Link>
                ))}
            </div>
        </div>
    );
};

export default Categorish;