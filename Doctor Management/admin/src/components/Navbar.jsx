import React, { useContext } from 'react'
import { assets } from "../assets/assets"
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { adminToken,setAdminToken} = useContext(AdminContext)

    const navigate = useNavigate("")

  const logout = ()=>{
    navigate('/')
    adminToken && setAdminToken('');
    adminToken && localStorage.removeItem("adminToken")
  }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-sm">
      <div className="flex items-center gap-2 text-xs">
        <img src={assets.admin_logo} alt="Logo" className="h-10 w-auto" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-grey-600 ">
          {adminToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition" onClick={()=>{
        logout()
      }}>
        Logout
      </button>
    </div>
  )
}

export default Navbar
