import React from 'react'
import "./App.css"
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Doctors from './Pages/Doctors'
import About from './Pages/About'
import Appointment from './Pages/Appointment'
import Login from './Pages/Login'
import MyAppointments from './Pages/MyAppointments'
import Profile from './Pages/Profile'
import Navbar from './Components/Navbar'
import Contact from './Pages/Contact'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/About' element={<About/>}></Route>
        <Route path='/Appointment' element={<Appointment/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/MyAppointments' element={<MyAppointments/>}></Route>
        <Route path='/MyAppointments/:docId' element={<Appointment/>}></Route>
        <Route path='/Profile' element={<Profile/>}></Route>
        <Route path='/Doctors' element={<Doctors/>}></Route>
        <Route path='/Doctors/:speciality' element={<Doctors/>}></Route>
        <Route path='/Contact' element={<Contact/>}></Route>
      </Routes>
      </BrowserRouter>
    

    </div>
  )
}

export default App
