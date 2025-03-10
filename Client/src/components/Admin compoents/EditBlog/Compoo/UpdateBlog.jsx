import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const UpdateBlog = () => {
      const { id } = useParams();
    const [Data, setData] = useState({ tittle: "", desc: "" });
    const backendLink = useSelector((state) => state.prod.link);
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`${backendLink}/app/v1/getdescbyid/${id}`, { withCredentials: true });

            setData(res.data.blogs);

        }
        fetch();
    }, [id]);
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    }
    const updateHandler = async (e) => {
        e.preventDefault();
        try {
      const res = await axios.put(`${backendLink}/app/v1/editBlog/${id}`,Data, { withCredentials: true });
     toast.success(res.data.message);
    } catch (error) {
    toast.error(error.response.data.message);
    }
  
    }
  return (
     <div className='p-4 h-screen'>
            <h1 className='text-2xl font-semibold'>Update Blog</h1>
          {Data && (
                <form action='' className='my-4 flex flex-col gap-4'>
                <input
                    type="text"
                    placeholder="Enter Title"
                      className="p-4 bg-transparent outline-none text-3xl border-b w-full border-zinc-500 font-semibold"
                      value={Data.tittle}
                      name='tittle'
                      onChange={changeHandler}
                />
                <textarea
                    rows='5'
                    cols='3'
                      placeholder="Enter Description"
                      name='desc'
                      value={Data.desc}
                    onChange={changeHandler}

                    className="p-4 bg-transparent outline-none text-2xl border-b w-full border-zinc-500 font-semibold"
                />
                <div><input type='file' className='bg-zinc-900 text-2xl text-white rounded ' accept='.jpeg .png .jpg' /></div>
                <hr className='border b border-zinc-500' />
                <div>
                    <button
                        className=" mx-40 py-3 flex flex-col items-center justify-center  bg-zinc-800 w-100 bg-gradient-to-r from-yellow-400 to-yellow-600 
  text-white font-semibold px-2  rounded-lg 
  shadow-md hover:shadow-lg transition 
  hover:scale-105 duration-300"
                          onClick={updateHandler}
                    >Update
                    </button>
                </div>
            </form>
          )}

        </div>
  )
}

export default UpdateBlog
