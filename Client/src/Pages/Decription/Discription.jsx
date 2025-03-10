import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { toast } from 'react-toastify';


const Discription = () => {
    const { id } = useParams();
    const [Data, setData] = useState();
    const [isLiked, setIsLiked] = useState(false);
    const backendLink = useSelector((state) => state.prod.link);
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`${backendLink}/app/v1/getdescbyid/${id}`, { withCredentials: true });


            setIsLiked(res.data.favourite);
            setData(res.data.blogs);

        }
        fetch();
    }, [id])
    const favreteHandler = async () => {
        try {
            if (!isLiked) {
                const res = await axios.put(`${backendLink}/app/v1/addBlogsToFaveret/${id}`, {},
                    { withCredentials: true },
                );

                toast.success(res.data.message);

            }
            else {
                const res = await axios.put(`${backendLink}/app/v1/removeBlogsToFaveret/${id}`, {},
                    { withCredentials: true },
                );
                toast.success(res.data.message);
            }
            setIsLiked(!isLiked);

        } catch (error) {
            console.log(res.data.message);
        }
    }
    return (
        <div>
            {Data &&
                <>
                    <div className='w-full flex items-center justify-center'>
                        <h1 className='text-2xl font-semibold w-5/6 '>{Data.tittle}</h1>
                        <div className='w-1/6  text-2xl lg:text-3xl flex justify-end'>
                            <button onClick={favreteHandler}>{isLiked ? <FaHeart className='hover:cursor-pointer text-red-500' /> : <FaRegHeart className='hover:cursor-pointer' />}</button>
                        </div>
                    </div>
                    <img className='mt-4 w-full h-[400px] object-cover rounded' src={Data.image} alt='blog-img' />
                    <p className='mt-4'>{Data.desc}</p>

                </>}

        </div>
    );
};

export default Discription