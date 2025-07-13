//this is home page where we render all the components
import React from 'react'
import Header from '../Components/Header'
import Speciality from '../Components/Speciality'
import TopDoctors from '../Components/TopDoctors'
import HomeBanner from '../Components/HomeBanner/HomeBanner'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div >
      <Header/>
      <Speciality/>
      <TopDoctors/>
      <HomeBanner/>
      <Footer/>
    </div>
  )
}

export default Home
