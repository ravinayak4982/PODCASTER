import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaSkullCrossbones } from "react-icons/fa6";
import { IoReorderThree } from "react-icons/io5";
import { useSelector } from 'react-redux';


const Navbar = () => {
    const links = [
        {
            name: "Home",
            to: "/"
        },
        {
            name: "All Blogs",
            to: "/all-blogs"
        },
        {
            name: "Profile",
            to: "/profile"
        },
        {
            name: "Login",
            to: "/login"
        },
    ];
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (!isLoggedIn) {
        links.splice(2, 1);
    } else {
        links.splice(3, 1);
    }
    const [MobileNav, setMobileNav] = useState(false);
    return (
        <nav className='relative flex items-center justify-between py-4 border-b border-zinc-200'>
            <div className='w-3/6 lg:w-2/6 brandName'>
                <Link
                    to="/"
                    className="
    relative
    text-3xl
    font-extrabold
    text-transparent
    bg-clip-text
    bg-gradient-to-r
    from-amber-400
    to-red-500
    hover:from-red-500
    hover:to-amber-400
    transition-transform
    duration-300
    hover:scale-105
  "
                >
                    RN Blogger
                </Link>
            </div>
            <div className='w-4/6 hidden lg:flex items-center justify-end'>
                {links.map((items, i) => (
                    <Link key={i} className='ms-4 hover:text-yellow-500 transition-all-duration-300'
                        to={items.to}
                    >
                        {items.name}</Link>
                ))}
                {!isLoggedIn && (
                    <Link to="/signup" className='ms-4 bg-black rounded px-4 py-1 text-zinc-100  bg-gradient-to-r from-yellow-400 to-yellow-600  transition-all-duration-300'>SignUp</Link>

                )}
            </div>
            <div className='w-3/6 flex lg:hidden items-center justify-end'>
                <button className='text-3xl font-bold' onClick={() => setMobileNav(!MobileNav)}><IoReorderThree /></button>
            </div>
            <div className={`fixed top-0 left-0 nav-bg h-screen w-full backdrop-blur-md p-8 ${MobileNav ? " translate-y-[0%] flex flex-col" : "translate-y-[-100%]"} transition-all duration-300`}>
                <div className='w-full flex justify-end'><button className='text-3xl' onClick={() => setMobileNav(!MobileNav)}><FaSkullCrossbones /></button></div>
                <div className='h-[100%] flex flex-col items-center justify-center'>
                    {links.map((items, i) => (
                        <Link key={i} className='mb-8  text-4xl hover:text-blue-700 transition-all-duration-300'
                            to={items.to}
                        >
                            {items.name}</Link>
                    ))}

                    {!isLoggedIn && (
                        <Link to="/signup"
                            className='text-4xl bg-black rounded px-8 py-4 text-zinc-100  hover:bg-red-700 transition-all-duration-300'>
                            SignUp
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar
