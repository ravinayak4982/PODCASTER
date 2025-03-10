import React,{useState} from 'react'
import Sidebar from '../../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { CgArrowRightO } from "react-icons/cg";
import { GiCrossMark } from "react-icons/gi";


const Profile = () => {
  const [SidebarDiv, setSidebarDiv] = useState(false);
  return (
    <div className=' relative mb-4 py-4 flex items-start justify-between gap-8'>
      <div className={` bg-white  ${SidebarDiv ? "text-3xl h-screen  fixed top-0 left-0 w-[70%]":"hidden "}  lg:text-normal lg:h-auto lg:block  flex flex-col items-center justify-center p-4 lg:p-0 border-r lg:relative lg:w-1/6 z-[10]`}>
        <div className='absolute top-10 right-10 lg:hidden'><button onClick={()=>setSidebarDiv(!SidebarDiv)} className='text-5xl'><GiCrossMark/></button></div>
        <Sidebar />
      </div>
      <div className='absolute lg:hidden top-0 left-0 z-[2]'><button onClick={()=>setSidebarDiv(!SidebarDiv)}><CgArrowRightO className='text-4xl '/></button></div>
      <div className="w-full lg:w-5/6 h-auto max-h-auto min-h-screen"><Outlet/></div>
    </div>
  )
}

export default Profile