import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";

function DoctorAppointments() {
  const {
    backendUrl,
    doctorToken,
    appointments,
    setAppointments,
    slotDateFormat,
    appointmentCancelFromDocSide,
    completeAppointment,
    fetchAppointmentsForDoctors
 
  } = useContext(AdminContext);


  // console.log("doctor token is fetching",doctorToken)

  

  useEffect(() => {
    fetchAppointmentsForDoctors();
  }, [doctorToken]);

  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg font-medium ">All Appoitnments</p>

      <div className="bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1.5fr_2fr_1fr_1fr] py-3 px-6 border-b font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Date & Time</p>
          <p>payment</p>
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

            {/*payment */}

            <p className="text-sm border text-center w-10 rounded-lg">cash</p>

            {/* Fees */}
            <p className="text-sm">${item.docData.fees}</p>

            {/*actions image it is accepted or rejected */}

         
            <div className="flex gap-1">
  {item.cancelled ? (
    <p className="text-red-500 font-semibold">Cancelled</p>
  ) : item.isCompleted ? (
    <p className="text-green-500 font-semibold">Completed</p>
  ) : (
    <>
      <img
        src={assets.cancel_icon}
        alt="Cancel"
        className="w-6 sm:w-8 cursor-pointer"
        onClick={() => appointmentCancelFromDocSide(item._id)}
      />
      <img
        src={assets.tick_icon}
        alt="Complete"
        className="w-6 sm:w-8 cursor-pointer"
        onClick={() => completeAppointment(item._id)}
      />
    </>
  )}
</div>



          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorAppointments;
