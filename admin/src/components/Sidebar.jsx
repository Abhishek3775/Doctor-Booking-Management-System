import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { adminToken,doctorToken } = useContext(AdminContext);
  return (
    <div className='min-h-screen bg-white border-r'>
      {adminToken && (
        <ul className='text-[#515151] mt-5'>
          <NavLink
            to='/admin-dashboard'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-blue-600' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt='' />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to='/all-appointments'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-blue-600' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt='' />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to='/add-doctor'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-blue-600' : ''
              }`
            }
          >
            <img src={assets.add_icon} alt='' />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to='/doctor-list'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-blue-600' : ''
              }`
            }
          >
            <img src={assets.people_icon} alt='' />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}

       {doctorToken && (
        <ul className='text-[#515151] mt-5'>
          <NavLink
            to='/doctor-dashboard'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-blue-600' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt='' />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to='/doctor-appointments'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-blue-600' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt='' />
            <p>Appointments</p>
          </NavLink>


          <NavLink
            to='/doctor-profile'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-blue-600' : ''
              }`
            }
          >
            <img src={assets.people_icon} alt='' />
            <p>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
