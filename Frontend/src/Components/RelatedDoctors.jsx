import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom';

function RelatedDoctors({docId,speciality}) {
    const {doctors} = useContext(DoctorContext)
    const navigate = useNavigate();
    const [relatedDoc,setRelatedDoc] = useState([]);

    useEffect(()=>{
       if(doctors.length>0 && speciality){
        const doctorsData = doctors.filter((doc)=>doc.speciality === speciality && doc._id !== docId)
        setRelatedDoc(doctorsData);

       }
    },[doctors,speciality,docId])

  return (
       <div className='flex flex-col items-center gap-4 my-16 text-grey-900 md:mx-10'>
         <h2 className='text-3xl text-center font-medium'>Top Doctors to Book</h2>
         <p className='text-sm text-center '>Simply browse through our extensive list of trusted doctors</p>
         <div className='w-full flex justify-center flex-wrap gap-4  gap-y-6 px-3 sm:px-0 '>
           {relatedDoc.slice(0,4).map((item,idxNum)=>(
               <div key={idxNum} className='border w-60 border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ease' onClick={()=>{
                 navigate(`/MyAppointments/${item._id}`)
                 scrollTo(0,0)
                //  console.log(idxNum,item)
                 }}>
                 
                       <img className='bg-blue-50' src={item.image} alt="" />
                      
               <h1 className='text-md font-medium p-1 m-0 '>{item.name}</h1>
               <p className='text-sm font-light p-1 m-0 '>{item.speciality}</p>
               </div>
           ))}
         </div>
         <button className='bg-[#5f6fff] w-20 rounded-xl py-1 border-none cursor-pointer hover:bg-transparent transition-all duration-500 ease border ' onClick={()=>{
          scrollTo(0,0)
          navigate("/Doctors")}}>More</button>
       </div>
  )
}

export default RelatedDoctors
