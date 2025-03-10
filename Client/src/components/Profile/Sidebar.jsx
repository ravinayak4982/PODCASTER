import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {authActions } from '../../store/authReduce';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const SideLink = [
    {
      name: 'Dashboard',
      to: "/profile"
    },
    {
      name: 'Favourites',
      to: "/profile/favourites"
    },
   
  ];
  const dispatch = useDispatch();
  const backendLink = useSelector((state) => state.prod.link);
    const navigate=useNavigate()
  const logoutHandler = async () => {
    const res = await axios.post(`${backendLink}/app/v1/logout`,{withCredentials:true})
    dispatch(authActions.logout());
    navigate("/login");
    toast.success(res.data.message);
    
    }
  return (
    <div className='w-[100%] flex flex-col gap-10 md:gap-8 lg:gap-4 pr-4'>
      {SideLink.map((items, i) => (
        <Link to={items.to} className='hover:font-semibold transition-all duration-300' key={i}>{items.name}</Link>
      ))}
      <button
       
        className="
             bg-gradient-to-r from-zinc-400 to-zinc-600 
  text-white font-semibold px-6 py-2 rounded-lg 
  shadow-md hover:shadow-lg transition 
  hover:scale-105 duration-300"
        onClick={logoutHandler}
      >
       Logout
      </button>
    </div>
  )
}

export default Sidebar
