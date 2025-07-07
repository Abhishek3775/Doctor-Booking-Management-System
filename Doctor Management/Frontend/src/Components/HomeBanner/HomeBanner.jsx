import React from 'react'
import "./HomeBanner.css"
import { assets } from '../../assets/assets'
function HomeBanner() {
  return (
    <div className='HomeBanner'>
      <div className="HomeBanner-left">
      <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight text-center md:text-left'>
          Book Appointment <br />With 100+ Trusted Doctors
        </p>

        <button>Create Account</button>

      </div>
      <div className="HomeBanner-right">
        <img src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default HomeBanner
