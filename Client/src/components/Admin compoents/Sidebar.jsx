import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../../store/authReduce';
import { toast } from 'react-toastify';
const Sidebar = () => {
    const [Data, SetData] = useState();

  const backendLink = useSelector((state) => state.prod.link);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${backendLink}/app/v1/getDataAdmin`, { withCredentials: true });
      SetData(res.data.data);

    }
    fetch();
  }, []);
    const links = [{ to: "/admin-dashboard", name: "Dashboard" },
        { to: "/admin-dashboard/add-blogs", name: "Add Blog" },
        { to: "/admin-dashboard/edit-blogs", name: "Edit Blog" },
  ];
  
 
  const navigate = useNavigate();
    const dispatch = useDispatch();

  const logoutHandler = async () => {
    const res = await axios.post(`${backendLink}/app/v1/logout`,{withCredentials:true})
    dispatch(authActions.logout());
    navigate("/admin-login");
    toast.success(res.data.message);
    
    }
    return (
        <div className='p-4'>
            {Data ? <div>
                <h1 className='text-5xl font-semibold'>{Data.username}</h1>
                <p>{Data.email}</p>
            </div> : ""}
            <hr className='my-4' />
            <div className='flex flex-col items-center'>
            {links.map((items, i)=>(
<Link 
  className="mt-2 py-3  bg-zinc-800 bg-gradient-to-r from-yellow-400 to-yellow-600 
  text-white font-semibold px-12  rounded-lg 
  shadow-md hover:shadow-lg transition 
  hover:scale-105 duration-300"
  key={i} 
  to={items.to}
>
  {items.name}
                </Link>
                
            ))}
            </div>
             <button
       
        className="
              py-3 mt-2  bg-zinc-800 bg-gradient-to-r from-zinc-400 to-zinc-600 
  text-white font-semibold px-12  rounded-lg 
  shadow-md hover:shadow-lg transition 
  hover:scale-105 duration-300"
         onClick={logoutHandler}  
      >
       Logout
      </button>
            </div>
    );
};

export default Sidebar