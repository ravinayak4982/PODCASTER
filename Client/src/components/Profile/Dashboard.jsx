import React, { useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa"
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import axios from 'axios'
const Dashboard = () => {
  const [Avatar, setAvatar] = useState(null);
  const [Data, SetData] = useState();
  const changeImage = (e) => {
    setAvatar(e.target.files[0]);
  }
  const backendLink = useSelector((state) => state.prod.link);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${backendLink}/app/v1/getDataUser`, { withCredentials: true });
      SetData(res.data.data);

    }
    fetch();
  }, []);
  const [Password, setPassword] = useState({ password: "", newPass: "", confirmNewpass: "" });

  const changePass=(e) => {
    const { name, value } = e.target;
    setPassword({ ...Password, [name]: value });
  }
  const handlePass = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${backendLink}/app/v1/changepassword`, Password, { withCredentials: true });
      toast.success(res.data.message);
      setAvatar(null);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
  const submitAvatar = async () => {
   
    try {
    const formData = new FormData();
      formData.append('image', Avatar);
      const res = await axios.put(`${backendLink}/app/v1/changeavatar`, formData , { withCredentials: true });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error);
    }
  }
   
  return (
   
    <div className='flex flex-col'>
      <div className='flex flex-col md:flex-row items-center gap:8 md:gap-12'>
        <div>
          <div className='size-[20vh] border rounded-full'>
            <label className='w-[100%] h-[100%] flex items-center justify-center' htmlFor='imgFile'>
              {Data && Data.avatar? (
                <img src={Data.avatar } alt='' className='size-[100%] rounded-full object-cover' />
              ) :
                <FaUser className='size-[12vh] text-zinc-600' />
              }
            </label>

          </div>
          <div className='mt-4 flex items-center justify-center'>
            <input type='file' accept='.jpeg,.png,.jpg' id='imgFile' className='hidden mb-4 bg-zinc-900 text-white' onChange={changeImage} />
            <button
              type="submit"
              className="
             bg-gradient-to-r from-yellow-400 to-yellow-600 
  text-white font-semibold px-6 py-2 rounded-lg 
  shadow-md hover:shadow-lg transition 
  hover:scale-105 duration-300"
            onClick={submitAvatar}>
              Change Avatar
            </button>
          </div>
        </div>
        {Data &&
        <div className='mt-3'>
          <p className='text-zinc-700'>{Data.email}</p>
          <h1 className=' text-2xl md:text-4xl lg:text-5xl mt-2 font-semibold'>{Data.username}</h1>
        </div>}
      </div>
      <hr className='my-8'></hr>

      <div>
        <div>
          <h1 className="text-2xl font-semibold mb-4">Change account&apos;s Password</h1>
          <form className="space-y-4" onSubmit={handlePass}>
            {/* Current Password */}
            <div className="flex flex-col lg:flex-row items-center">
              <label
                htmlFor="currentPassword"
                className="w-[160px] h-10 flex items-center text-gray-800 font-bold whitespace-nowrap"
              >
                Current Password:
              </label>
              <input
                type="password"
                placeholder="current password"
                name="password"
                value={Password.password}
                onChange={changePass}
                className="
              bg-gray-50
              border-b
              border-transparent
              focus:outline-none
              focus:border-yellow-500
              focus:border-b-2
              transition-all
              duration-300
              px-4
              py-1
              h-10
              w-full
            "
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col lg:flex-row items-center">
              <label
                htmlFor="newPassword"
                className="w-[160px] h-10 flex items-center text-gray-800 font-bold whitespace-nowrap"
              >
                New Password:
              </label>
              <input
                type="password"
                placeholder="New password"
                name="newPass"
                value={Password.newPass}
                onChange={changePass}
                className="
              bg-gray-50
              border-b
              border-transparent
              focus:outline-none
              focus:border-yellow-500
              focus:border-b-2
              transition-all
              duration-300
              px-4
              py-1
              h-10
              w-full
            "
              />
            </div>

            {/* Confirm New Password */}
            <div className="flex flex-col lg:flex-row items-center">
              <label
                htmlFor="confirmNewPassword"
                className="w-[160px] h-10 flex items-center text-gray-800 font-bold whitespace-nowrap"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                placeholder="confirm new password"
                name="confirmNewpass"
                value={Password.confirmNewpass}
                onChange={changePass}
                className="
              bg-gray-50
              border-b
              border-transparent
              focus:outline-none
              focus:border-yellow-500
              focus:border-b-2
              transition-all
              duration-300
              px-4
              py-1
              h-10
              w-full
            "
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
              
                className="
             bg-gradient-to-r from-yellow-400 to-yellow-600 
  text-white font-semibold px-6 py-2 rounded-lg 
  shadow-md hover:shadow-lg transition 
  hover:scale-105 duration-300"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
