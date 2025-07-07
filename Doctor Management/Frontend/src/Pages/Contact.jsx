import React from 'react'
import { assets } from '../assets/assets'
import Footer from '../Components/Footer'

function Contact() {
  return (
    <div className='min-h-screen'>
      <h2 className='text-center '>CONTACT <span><b>US</b></span></h2>
      <div className='flex'>
        <img src={assets.contact_image} alt="About img" className='w-100' />
        <div className='flex flex-col justify-center align-center flex-end ml-5'>
            <h5>OUR OFFICE</h5>
            <p>C-14,Mukharji Nagar <br /> New Delhi(M.P) <br /><br /> Tel:-+91-9876543210 <br />cityDoctors@gmail.com</p>
            <br />
            <h2 className='text-lg'>Careers at Prescripto</h2> <br />
            <p>Learn More about teams and job openings.</p> <br />
            <button className='border p-2 hover:bg-black hover:text-white transition-all duration-500' disabled>Explore</button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact
