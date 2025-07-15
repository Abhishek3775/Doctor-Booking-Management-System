import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    // Added flex-col for small screens, md:flex-row for medium+ screens
    <div className='flex flex-col md:flex-row md:flex-wrap bg-[#5f6fff] rounded-lg px-6 md:px-10 lg:px-20'>
      
      {/* left div  */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto'>
        
        {/* Centered text on small screens, left aligned on medium+ */}
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight text-center md:text-left'>
          Book Appointment <br />With Trusted Doctors
        </p>

        {/* Used flex-col on small screens, switched to row on md for better layout */}
        {/* Added responsive font size: text-sm (mobile), text-base (md+) */}
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm md:text-base font-light'>
          <img src={assets.group_profiles} alt="" />
          {/* Text alignment responsive: center (mobile), left (md+) */}
          <p className='text-center md:text-left'>
            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free
          </p>
        </div>

        {/* Optional: Added border for button (visual improvement) */}
        <a href="#speciality" className='w-45 bg-white flex gap-1 py-2 rounded-2xl px-1 transition-all duration-500 ease  hover:bg-transparent cursor-pointer border border-white'>
          Book appointment
          <img src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* right side of the div */}
      <div className='md:w-1/2 relative'>
        <img src={assets.header_img} alt="" className='w-full bottom-0 h-auto rounded-lg' />
      </div>
    </div>
  )
}

export default Header
