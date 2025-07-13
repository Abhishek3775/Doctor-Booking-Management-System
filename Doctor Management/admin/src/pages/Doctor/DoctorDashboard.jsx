import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

function DoctorDashboard() {

  const { doctorDashData,setDoctorDashData,
    getDoctorDashData,doctorToken,slotDateFormat} = useContext(AdminContext)

    useEffect(()=>{
      if(doctorToken){
        getDoctorDashData()
      }
    },[doctorToken])

  return doctorDashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
      
              <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img src={assets.earning_icon} alt="" />
                <div>
                  <p>{doctorDashData.earnings}</p>
                  <p>Earnings</p>
                </div>
              </div>
      
              <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img src={assets.appointment_icon} alt="" />
                <div>
                  <p>{doctorDashData.appointment}</p>
                  <p>Appointments</p>
                </div>
              </div>
              
              <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img src={assets.patients_icon} alt="" />
                <div>
                  <p>{doctorDashData.patients}</p>
                  <p>Patients</p>
                </div>
              </div>
              
      
            </div>
      
      
      {/* //this is for the text latest bookings  */}
           
         <div className='bg-white '>
          <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
            <img src={assets.list_icon} alt="list icon" />
            <p className='font-semibold'>Latest Bookings</p>
          </div>
      
       {/* //this is for to load the latest five appointments  */}
         
          <div className='pt-4 border border-t-8'>
            {
              doctorDashData.latestAppointments.map((item,index)=>(
                <div key={index} className='flex items-center px-6 gap-3 hover:bg-gray-100'>
                  <img src={item.userData.image} alt="doctor image" className='rounded-full w-10' />
                  <div className='flex-1 text-sm '>
                    <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                    <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                  </div>
      
                   {item.cancelled ? <p className="text-red-400 text-xs font-medium">Cancelled</p> : 
                               <img
                                src={assets.cancel_icon}
                                alt="Cancel"
                                className="w-6 sm:w-8 cursor-pointer"
                                onClick={()=>{
                                  appointmentCancel(item._id)
                                }}
                              />
                              }
      
                </div>
      
              ))
            }
      
          </div>
      
         </div>
      
      
      
    </div>
  )
}

export default DoctorDashboard
