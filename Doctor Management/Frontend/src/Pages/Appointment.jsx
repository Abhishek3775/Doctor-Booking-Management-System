// import React, { useContext, useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { DoctorContext } from '../Context/AppContext';
// import Footer from '../Components/Footer';

// const Appointment = () => {
//   const { docId } = useParams();
//   const { doctors } = useContext(DoctorContext);
//   const [docInfo, setDocInfo] = useState(null);

//   useEffect(() => {
//     if (doctors?.length) {
//       const foundDoc = doctors.find(doc => doc._id === docId);
//       setDocInfo(foundDoc);
//     }
//   }, [docId, doctors]);

//   return (
//     <div>
//       <h2>Appointment Page</h2>
//       {docInfo ? (
//         <div>
//           <h3>{docInfo.name}</h3>
//           <p>Specialty: {docInfo.speciality}</p>
//           <img src={docInfo.image} alt="" />
//           {/* Add more doctor info here as needed */}
//         </div>
//       ) : (
//         <p>Loading doctor information...</p>
//       )}
//       <Footer />
//     </div>
//   );
// };

// export default Appointment;

// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { DoctorContext } from '../Context/AppContext';
// import { assets } from '../assets/assets';
// import Footer from '../Components/Footer';
// import RelatedDoctors from '../Components/RelatedDoctors';

// function Appointment() {

//   const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']
//   const {docId} = useParams();
//   const {doctors} = useContext(DoctorContext);
//   const [docInfo,setDocInfo] = useState(null);
//   const [docSlots,setDocSlots] = useState([]);
//   const [slotIdx,setSlotIdx] = useState(0);
//   const [slotTime,setSlotTime] = useState('')

//   const fetchDoctorsInformation = async ()=>{
//     const docInfo = doctors.find(doc =>doc._id === docId);
//     console.log("doctor information",docInfo)
//     setDocInfo(docInfo)
//   }

//   const getAvailableSlots = () => {
//     setDocSlots([]); // Clear existing slots
//     const today = new Date();

//     for (let i = 0; i < 7; i++) {
//       const currentDay = new Date(today);
//       currentDay.setDate(today.getDate() + i);

//       // Set the start and end time for the current day
//       let startTime = new Date(currentDay);
//       let endTime = new Date(currentDay);
//       endTime.setHours(21, 0, 0, 0); // 9:00 PM

//       if (i === 0) {
//         // For today, start at the next available half-hour slot
//         const now = new Date();
//         if (now.getHours() >= 21) continue; // Skip today if it's past 9 PM

//         now.setMinutes(now.getMinutes() + 30); // buffer time
//         now.setSeconds(0);
//         now.setMilliseconds(0);
//         startTime = new Date(now);
//         if (startTime.getHours() < 10) {
//           startTime.setHours(10, 0, 0, 0); // earliest start is 10:00 AM
//         }
//       } else {
//         // Other days start from 10:00 AM
//         startTime.setHours(10, 0, 0, 0);
//       }

//       let timeSlots = [];
//       let slotTime = new Date(startTime);

//       while (slotTime < endTime) {
//         const formattedTime = slotTime.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         timeSlots.push({
//           dateTime: new Date(slotTime),
//           time: formattedTime,
//         });

//         slotTime.setMinutes(slotTime.getMinutes() + 30);
//       }

//       setDocSlots(prev => [...prev, timeSlots]);
//     }
//   };

//   useEffect(()=>{
//     fetchDoctorsInformation()
//   },[docId,doctors])//is there any changes in docId and doctors the function runs immediately

//   useEffect(()=>{
//     getAvailableSlots()
//   },[docInfo])

//   useEffect(()=>{
//     // console.log(docSlots)
//   },[docSlots])

//   return docInfo && (
//     <div>
//       {/*Doctors details */}
//       <div className='flex gap-2'>
//        <div>
//          <img src={docInfo.image} alt="" className='bg-blue-500 rounded-lg object-cover h-[100%]'/>
//          </div>

//          <div className=' flex flex-col justify-center p-5 rounded border border-grey'>{/* Doc Info Name, degree and experience */}
//     <p className='flex gap-1 text-lg text-black-700'>{docInfo.name} <img src={assets.verified_icon} alt="" className='w-4' /></p>
//     <p className='text-sm text-grey-500'>{docInfo.degree}-{docInfo.speciality} <span className='bg-blue-100 rounded py-1 px-2 '>{docInfo.experience}</span></p>
//     <p className='text-grey-400'><span>About</span> <img src={assets.info_icon} alt="" /> {docInfo.name} {docInfo.about}</p>
//     <p  className='text-grey-500 font-medium mt-5'>Appointment fee: $<span className='text-grey-600'>{docInfo.fees}</span></p>
//          </div>

//       </div>
//       {/* //DOCTORS SLOTS BOOKING AREA */}

//      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-grey-700 '>
//        <p> Booking Slots</p>
//        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//         {
//           docSlots.length && docSlots.map((item,idxNum)=>(
//             <div key={idxNum} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIdx === idxNum ? 'bg-blue-600 text-white':'border border-grey-700'}`} onClick={()=>{
//               setSlotIdx(idxNum)
//             }}>
//               <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
//               <p>{item[0] && item[0].dateTime.getDate()}</p>
//             </div>
//           ))
//         }
//        </div>

//         {/** this is for the timing of the doctors slots */}
//         <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 '>
//           {docSlots.length && docSlots[slotIdx].map((item,idxNum)=>(
//             <p onClick={()=>{
//               setSlotTime(item.time)
//             }} key={idxNum} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-600 text-white':'text-grey-400 border border-grey-300 '}`}>{item.time.toLowerCase()}</p>
//           )) }
//         </div>
//         <button className='bg-blue-600 text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
//      </div>
//      {/* listing related doctors  */}
//         <RelatedDoctors
//         docId = {docId}
//         speciality = {docInfo.speciality}
//         />
//       <Footer/>
//     </div>
//   )
// }

// export default Appointment

//chat gpt wala code yaha se likha hai

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DoctorContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import Footer from "../Components/Footer";
import RelatedDoctors from "../Components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

function Appointment() {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const { docId } = useParams();
  const { doctors, backendUrl, token, getDoctorsData } =
    useContext(DoctorContext);

  // console.log("doctors data in appointment",doctors._id)

  const [docInfo, setDocInfo] = useState(null); // ✅ Correct type
  const [docSlots, setDocSlots] = useState([]);
  const [slotIdx, setSlotIdx] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate = useNavigate();
  //lets create a function for the booking of the appointment

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("login to book Appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIdx][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        "http://localhost:9000/api/user/book-appointment",
        { docId, slotDate, slotTime },
        {headers:{Authorization:`Bearer ${token}`}}
      );


      if (data.success) {
        toast.success(data.message);
        console.log(data)
        console.log(data.appointmentData.docData.address)
        getDoctorsData();
        navigate("/MyAppointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const selectedDoctor = doctors.find((doc) => doc._id === docId);
    if (selectedDoctor) {
      setDocInfo(selectedDoctor);
    }
  }, [docId, doctors]);

  const getAvailableSlots = () => {
    const today = new Date();
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);

      let startTime = new Date(currentDay);
      let endTime = new Date(currentDay);
      endTime.setHours(21, 0, 0, 0); // 9:00 PM

      if (i === 0) {
        const now = new Date();
        if (now.getHours() >= 21) continue;

        now.setMinutes(now.getMinutes() + 30);
        now.setSeconds(0);
        now.setMilliseconds(0);

        startTime = new Date(now);
        if (startTime.getHours() < 10) {
          startTime.setHours(10, 0, 0, 0);
        }
      } else {
        startTime.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      let slotTime = new Date(startTime);

      while (slotTime < endTime) {
        const formattedTime = slotTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          dateTime: new Date(slotTime),
          time: formattedTime,
        });

        slotTime.setMinutes(slotTime.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  if (!docInfo) return null; // ⛔ Don't render until data is ready

  return (
    <div>
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="bg-blue-500 rounded-lg object-cover h-full w-full max-w-[200px]"
          />
        </div>

        <div className="flex flex-col justify-center p-5 rounded border border-gray-300">
          <p className="flex gap-1 text-lg text-gray-800">
            {docInfo.name}
            <img src={assets.verified_icon} alt="verified" className="w-4" />
          </p>
          <p className="text-sm text-gray-500">
            {docInfo.degree} - {docInfo.speciality}{" "}
            <span className="bg-blue-100 rounded py-1 px-2">
              {docInfo.experience}
            </span>
          </p>
          <p className="text-gray-400 mt-2">
            <span className="font-medium">About:</span>{" "}
            <img src={assets.info_icon} alt="info" className="inline w-4" />{" "}
            {docInfo.about}
          </p>
          <p className="text-gray-500 font-medium mt-5">
            Appointment fee: ${" "}
            <span className="text-gray-600">{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-6 sm:ml-72 sm:pl-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-auto mt-4">
          {docSlots.length > 0 &&
            docSlots.map((item, idxNum) => (
              <div
                key={idxNum}
                className={`text-center py-4 px-3 min-w-[60px] rounded-full cursor-pointer ${
                  slotIdx === idxNum
                    ? "bg-blue-600 text-white"
                    : "border border-gray-400"
                }`}
                onClick={() => setSlotIdx(idxNum)}
              >
                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))}
        </div>

        {/* Time Slots */}
        <div className="flex items-center gap-3 w-full overflow-x-auto mt-4">
          {docSlots[slotIdx]?.length > 0 ? (
            docSlots[slotIdx].map((item, idxNum) => (
              <p
                key={idxNum}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 border border-gray-300"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-400">
              No slots available for this day.
            </p>
          )}
        </div>

        <button
          disabled={!slotTime}
          onClick={bookAppointment}
          className={`mt-6 text-sm font-light px-14 py-3 rounded-full cursor-pointer ${
            slotTime
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      <Footer />
    </div>
  );
}

export default Appointment;
