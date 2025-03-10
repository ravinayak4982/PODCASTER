import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
  import {toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const SignUp = () => {
    const backendLink = useSelector((state) => state.prod.link);
  const navigate = useNavigate();
  const [Input, setInput] = useState({ username: "", email: "", password: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input,[name]: value});
  }
const SubmitHadler = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${backendLink}/app/v1/sign`, Input, { withCredentials: true });
    
    // Display a success toast
  
    toast.success(response.data.message);
   navigate("/login");

  } catch (error) {
    // Handle cases where `error.response` is undefined
    const errorMessage = error.response?.data?.message;
    toast.error(errorMessage);
  }
  finally {
    setInput({ username: "", email: "", password: "" });
   
  }
};

  return (
    <div className='h-screen flex items-center justify-center '>
     
      <div className='p-12 shadow-2xl rounded w-[80%] md:w-[60%] lg:w-[40%] flex flex-col items-center justify-center'>
       <div className='text-2xl flex flex-col lg:flex-row gap-2 text-center'><h1 className='font-bold'>welcome!</h1><span>Signup as a new user</span>
        </div>
        <form onSubmit={SubmitHadler} className='flex flex-col w-[100%] mt-8'>
         <div className='flex flex-col mb-4'><label>Username : </label><input type='text' value={Input.username} name='username' className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400'onChange={change} required/></div>
         <div className='flex flex-col mb-4'><label>Email : </label><input type='email' value={Input.email} name='email' className='mt-2  outline-none border px-3 py-2 rounded border-zinc-400'onChange={change}  required/></div>
         <div className='flex flex-col mb-4'><label>Password : </label><input type='password' value={Input.password} name='password' className='mt-2  outline-none border px-3 py-2 rounded border-zinc-400'onChange={change}  required/></div>
         <div className='flex mt-4'> <button
            
              className="
             bg-gradient-to-r from-yellow-400 to-yellow-600 
  text-white font-semibold px-45 py-2 rounded-lg 
  shadow-md hover:shadow-lg transition 
  hover:scale-105 duration-300"
            >
            Signup
            </button></div>
        </form>
        <h4 className='mt-8'>Already have an account ? <Link to="/login" className='text-blue-600 hover:text-blue-700 hover:font-semibold'>Login</Link>  </h4>
      </div>
    </div>
  )
}

export default SignUp