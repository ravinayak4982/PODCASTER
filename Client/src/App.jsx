import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from './layout/MainLayout'
import Home from './Pages/Home/Home'
import OtherLayout from './layout/OtherLayout'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
import Profile from './Pages/Profile/Profile'
import AllBlogs from './Pages/AllBlogs/AllBlogs'
import Dashboard from './components/Profile/Dashboard'
import Favourites from './components/Profile/Favourites'
import Description from './Pages/Decription/Discription'
import Categoris from './Pages/Categoris/Categoris'
import AdminLogin from './Pages/Admin Login/AdminLogin'
import AdminDahsBoard from './Pages/AdminDashBoard/AdminDahsBoard'
import AdminDashboard from './components/Admin compoents/Dashboard/Dashboard'
import AddBlog from './components/Admin compoents/AddBlog/AddBlog'
import EditBlog from './components/Admin compoents/EditBlog/EditBlog'
import UpdateBlog from './components/Admin compoents/EditBlog/Compoo/UpdateBlog'
import 'react-toastify/dist/ReactToastify.css';
  import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { authActions } from './store/authReduce'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AdminProtect from './components/ProtectedRoute/AdminProtect'

const App = () => {
  const backendLink = useSelector((state) => state.prod.link);
  console.log(backendLink);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch=async()=> {
      const res = await axios.get(`${backendLink}/app/v1/cook`);
     
       
   
    }
    fetch();
  }, [])
  
  return (
    <>
     
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<MainLayout />} >
            <Route index element={<Home />} />
            <Route path='/all-blogs' element={<AllBlogs />} />
            <Route path='/description/:id' element={<Description />} />
            <Route path='/cat/:id' element={<Categoris />} />
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} >
              <Route index element={<Dashboard />} />
              <Route path='/profile/favourites' element={<Favourites />} />

            </Route>

          </Route>
          <Route element={<OtherLayout />} >
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin-dashboard' element={<AdminProtect><AdminDahsBoard /></AdminProtect>} >
              <Route index element={<AdminDashboard />} />
              <Route path='/admin-dashboard/add-blogs' element={<AddBlog />} />
              <Route path='/admin-dashboard/edit-blogs' element={<EditBlog />} />
               <Route path='/admin-dashboard/update-blogs/:id' element={<UpdateBlog />} />
            </Route>
          </Route>
        </Routes>
      
    </>
  )
}

export default App