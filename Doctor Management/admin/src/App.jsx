import React, { useContext } from 'react'
import Login from './pages/Login'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AllAppointments from './pages/admin/AllAppointments'
import AddDoctor from './pages/admin/AddDoctor'
import Dashboard from './pages/admin/Dashboard'
import DoctorsLIst from './pages/admin/DoctorsLIst'

function App() {
  
  const {adminToken} = useContext(AdminContext)

  return adminToken ? (
    <div className='bg-[#f8f9fd]-600'>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorsLIst/>}/>
        </Routes>
      </div>
    </div>
  ) : (
  <>
  <Login/>
  </>)
}

export default App
