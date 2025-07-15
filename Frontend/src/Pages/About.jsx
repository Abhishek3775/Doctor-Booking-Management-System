import React from 'react'
import { assets } from '../assets/assets'
import Footer from '../Components/Footer'

const About = () => {
  return (
    <div>
       <h2 className='text-center'>ABOUT <span><b>US</b></span></h2>
      <div className='flex gap-3 p-2'> {/**this is the first div in which one image inside one div and the text inside another div  */}
        {/* //left side of the about us page  image*/}
        <div>
          <img src={assets.about_image} alt="" />
        </div>
        <div> {/*this div is for just only text on the right side of the about us page*/}
          <p className='text-justify'>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.br<br /> <br />
Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way. <br />
<span > <b>Our Visioin</b></span> <br />
Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>  
      </div>{/* here is the ending for the first div */}
      <h2>WHY <span> <b>CHOOSE US?</b></span></h2>
      {/* //THIS div is for the the why choose us efficiency ,convenience and personality  */}
    <div className='flex justify-between items-center p-4 border border-black '>
      <div>
        <h4 className='bold'>EFFIENCY</h4>
        <p >Streamlined appointment scheduling <br /> that fits into your busy lifestyle.</p>
      </div>
      <div class="w-px h-32 bg-gray-400"></div> {/** this is the vertical line between effficiency and so on  */}

      <div>
        <h4 className='bold'>CONVENIENCE</h4>
        <p>Access to a network of trusted <br /> healthcare professionals in your area..</p>
      </div>
      <div class="w-px h-32 bg-gray-400"></div> {/** this is the vertical line between effficiency and so on  */} 

      <div>
        <h4 className='bold'>PERSONALIZATION</h4>
        <p>Tailored recommendations and reminders <br /> to help you stay on top of your health.</p>
      </div>
     
    </div>
    <Footer/>
    </div>
  )
}

export default About
