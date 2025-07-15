import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";


const AllAppointments = () => {
  const { adminToken, appointments, getAllAppointments ,appointmentCancel,slotDateFormat} =
    useContext(AdminContext);

  //cancel appointments

  useEffect(() => {
    if (adminToken) {
      getAllAppointments();
    }
  }, [adminToken]);

  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg font-medium ">All Appoitnments</p>

      <div className="bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1.5fr_2fr_1fr_1fr] py-3 px-6 border-b font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointment Rows */}
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 sm:grid-cols-[0.5fr_2fr_1.5fr_2fr_1fr_1fr] items-center px-4 sm:px-6 py-3 border-b text-gray-600 hover:bg-gray-100 transition"
          >
            {/* Index */}
            <p className="hidden sm:block">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt="Patient"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="block sm:hidden text-xs font-medium">
                Patient
              </span>
            </div>

            {/* Date & Time */}
            <p className="text-sm">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Doctor Info */}
            <div className="flex items-center gap-2">
              <img
                src={item.docData.image}
                alt="Doctor"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="hidden sm:block">{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p className="text-sm">${item.docData.fees}</p>

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
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
