import React, { useContext, useEffect, useState } from 'react'
import { specialityData } from '../assets/assets'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../Context/AppContext'

const Doctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(DoctorContext)

  // Keep original doctor list in a separate state
  const [filteredDoctors, setFilteredDoctors] = useState([])

  // Initially show all doctors
  useEffect(() => {
    setFilteredDoctors(doctors)
  }, [doctors])

  function filterDoctors(doctorsSpeciality) {
    const updatedDoctorsList = doctors.filter(
      (doctor) => doctor.speciality === doctorsSpeciality
    )
    setFilteredDoctors(updatedDoctorsList)
  }

  return (
    <>
      <h1>Browse through the doctors specialist</h1>
      <div className="flex">
        {/* all specialist doctors */}
        <div className="flex flex-col gap-1 p-2">
          {specialityData.map((item, index) => (
            <button
              key={index}
              className="w-45 bg-blue-50 flex gap-1 py-2 rounded px-1 transition-all duration-500 ease hover:bg-transparent hover:border-[#5f6fff] border border-[#00000] cursor-pointer"
              onClick={() => filterDoctors(item.speciality)}
            >
              {item.speciality}
            </button>
          ))}
          {/* Optional: Show All button */}
          <button
            onClick={() => setFilteredDoctors(doctors)}
            className="bg-green-200 py-2 rounded px-2 mt-2 border"
          >
            Show All
          </button>
        </div>

        {/* all doctors here */}
        <div className="w-full flex justify-center flex-wrap gap-4 gap-y-6 px-3 sm:px-0">
          {filteredDoctors.map((item, index) => (
            <div
              key={index}
              className="border w-60 border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ease"
              onClick={() => {
                navigate(`/MyAppointments/${item._id}`)
              }}
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <h1 className="text-md font-medium p-1 m-0">{item.name}</h1>
              <p className="text-sm font-light p-1 m-0">{item.speciality}</p>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <Footer />
    </>
  )
}

export default Doctors
