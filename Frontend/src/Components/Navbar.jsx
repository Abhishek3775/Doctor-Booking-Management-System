//this is for the navbar of the page 

import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets"
import { NavLink, useNavigate } from 'react-router-dom'
import { DoctorContext } from '../Context/AppContext';
const Navbar = () => {

    const [showMenu,setShowMenu] = useState(false);
    const navigate = useNavigate()
    const {token,setToken, userData} = useContext(DoctorContext)

    const logOut = ()=>{
        setToken(false)
        localStorage.removeItem('token')
    }
    
  return (
    <div className='flex items-center justify-between text:sm py-5 mb-5 border-b  border-gray-700 border-b-2'>
      <img src={assets.logo} alt="" className='w-44 cursor-pointer' onClick={()=>navigate("/")}/>
      <ul className='flex items-center justify-center  gap-4  '>
        <li>
            <NavLink to={"/"}>Home</NavLink>
        <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden'/>
        </li>
        <li>
            <NavLink to={"/Doctors"} >All Doctors</NavLink>
            <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden'/>
            </li>
        <li>
            <NavLink to={"/About"}>About</NavLink>
            <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden'/>
        </li>
        <li>
            <NavLink to={"/Contact"}>Contact</NavLink>
            <hr className='border-none outline-none h-0.5 bg-[#5f6fff] w-3/5 m-auto hidden'/>
        
        </li>
      </ul>

    <div className='flex items-center gap-4'>
        {
            token ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className='w-9 h-9 rounded-full' src={assets.profile_pic} alt="" />
                <img className='w-2' src={assets.dropdown_icon} alt="" />
                <div className='absolute  top-0 right-0 pt-14 text-base font-medium text-grey-600 z-20 group-hover:block hidden'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 '>
                    <p className='text-black hover:text-[#005eff] cursor-pointer transition-colors duration-200' onClick={()=>navigate("/Profile")}>My Profile</p>
                        <p className='text-black hover:text-[#005eff] cursor-pointer transition-colors duration-200'onClick={()=>navigate("/MyAppointments")}>My Appointments</p>
                        <p className='text-black hover:text-[#005eff] cursor-pointer transition-colors duration-200'onClick={logOut}>Log Out</p>
                    </div>
                </div>
            </div>:<button className='bg-[#5f6fff] w-35 py-2 rounded-xl text-white cursor-pointer' onClick={()=>{ navigate("/Login") }}>Create Account</button>
        }
    
    </div>
      
    </div>
  )
}

export default Navbar
