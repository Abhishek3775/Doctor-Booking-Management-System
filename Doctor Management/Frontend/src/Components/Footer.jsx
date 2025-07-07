import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
function Footer() {

    let navigate = useNavigate()
  return (
    <div className='flex flex-col  my-8 p-9 gap-2  '>
      {/* //this div is for logo company and get in touch */}
      <div className='flex justify-between align-center text-xl'>
        <img src={assets.logo} alt="" />
        <h2>Company</h2>
        <h2>Get In Touch</h2>
      </div>
      {/* //thid div is for all about company , get in touch , and what we have */}
      <div className='flex justify-between '>
        <p>Lorem ipsum dolor sit amet,
             adipisicing elit. <br />
             omnis eum saepe odit provident ullam <br />
             \ eligendi consectetur vel? Fodit tempore!</p>

        <ul className='list-style-none cursor-pointer'> 
            <li>Home</li>
            <li onClick={()=>navigate("/About")}>About</li>
            <li onClick={()=>navigate("/Contact")}>Contact us</li>
            <li >Privacy Policy</li>
        </ul>

        <ul className='list-style-none'>
            <li>+91-9876543210</li>
            <li>cityDoctors@mail.com</li>
        </ul>
      </div>
      <hr />
      <p className='text-center' style={{ wordSpacing: "0.3rem" }}>This Website is Developed By Abhishek</p>
    </div>
  )
}

export default Footer
