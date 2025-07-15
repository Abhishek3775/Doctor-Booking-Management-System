import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

const DoctorsLIst = () => {
  const {doctors,adminToken,getAllDoctors} = useContext(AdminContext)

  useEffect(()=>{
    if(adminToken){
      getAllDoctors()
    }
  },[adminToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll '>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='flex flex-wrap w-full gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index)=>(
            <div key={index} className='border border-indigo-200 rounded max-w-56 overflow-hidden cursor-pointer group'>
              <img src={item.image} alt="" className='bg-indigo-50 hover:bg-blue-500 transition-all duration-500 ease' />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsLIst
