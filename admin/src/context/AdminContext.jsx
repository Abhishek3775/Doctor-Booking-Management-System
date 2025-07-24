import axios from "axios";
import React, { createContext, useState } from "react";
import {toast} from "react-toastify"
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [doctorToken,setDoctorToken] = useState( localStorage.getItem("doctorToken")
      ? localStorage.getItem("doctorToken")
      : "");
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken")
      ? localStorage.getItem("adminToken")
      : ""
  );

  const backendUrl = `https://doctor-booking-management-system.onrender.com`;

  const [doctors, setDoctors] = useState([]);
  const [appointments,setAppointments] = useState([]);
  const [dashData,setDashData] = useState(false);
  const [doctorDashData,setDoctorDashData] = useState(false)

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      if (data.success) {
        setDoctors(data.doctors);
        // console.log(data.doctors);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //get all appointments

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: {
          Authorization: `Bearer ${adminToken}`, //  Attach token in Authorization header
        },
      });

      if(data.success){
        setAppointments(data.appointments)
        // console.log(data)
        // console.log("data aa raha hai ",data.appointments)
      }
      else{
        toast.error(error.message)
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message)
    }
  };

    //fetch all the appointments for the doctor 

  const fetchAppointmentsForDoctors = async () => {
      try {
        const { data } = await axios.get(
          backendUrl + "/api/doctor/doctor-appointments",
          {
            headers: {
              Authorization: `Bearer ${doctorToken}`,
            },
          }
        );
        // console.log(data);
        setAppointments(data.appointments);
      } catch (error) {
        // console.log(error);
      }
    };

  //cancel the appointments from the admin side

  const appointmentCancel = async (appointmentId)=>{
  try {

  const {data} = await axios.post(backendUrl+"/api/admin/appointmentCancel",{appointmentId},{
    headers: {
          Authorization: `Bearer ${adminToken}`, // ✅ Attach token in Authorization header
        },
  }
  )

  if(data.success){
    // console.log(data)
    toast.success(data.message)
    getAllAppointments()
  }else{
    toast.error(data.message)
  }
} catch (error) {
  // console.log(error)
  toast.error(error.message)
}
  }

  //cancel the appointment from doctor side

  const appointmentCancelFromDocSide = async (appointmentId)=>{
    try {
      // console.log("doctor token is fetching",doctorToken)
  const {data} = await axios.post(backendUrl+"/api/doctor/cancelAppointment",{appointmentId},{
    headers: {
          Authorization: `Bearer ${doctorToken}`, //  Attach token in Authorization header
        },
  }
  )

  if(data.success){
    // console.log(data)
    fetchAppointmentsForDoctors()
    toast.success(data.message)
  
  }else{
    toast.error(data.message)
  }
} catch (error) {
  // console.log(error)
  toast.error(error.message)
}
  }

  //complete the appointment 
  const completeAppointment = async (appointmentId)=>{
    try {
      // console.log("doctor token is fetching",doctorToken)
  const {data} = await axios.post(backendUrl+"/api/doctor/completeAppointment",{appointmentId},{
    headers: {
          Authorization: `Bearer ${doctorToken}`, //  Attach token in Authorization header
        },
  }
  )

  if(data.success){
    // console.log(data)
  
    toast.success(data.message || "appointment Completed")
    fetchAppointmentsForDoctors()
  }else{
     toast.error(error?.response?.data?.message || "Error completing appointment");
  }
} catch (error) {
  // console.log(error)
 toast.error(error?.response?.data?.message || "Error completing appointment");
}
  }

  //to get the dashboard data for the ADMIN from the api 

  const getDashData = async ()=>{
    try {
      const {data} = await axios.get(backendUrl+"/api/admin/dashboard",{
        headers:{
          Authorization:`Bearer ${adminToken}`
        }
      })

      if(data.success){
        setDashData(data.dashData)
        // console.log(data.dashData)
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      // console.log(error);
      toast.error(error.message)
    }
  }

  //get dashboard data for the DOCTOR from the api

  const getDoctorDashData = async ()=>{
    try {
      const {data} = await axios.get(backendUrl+"/api/doctor/dashboard",{
        headers:{
          Authorization:`Bearer ${doctorToken}`
        }
      })

      if(data.success){
        setDoctorDashData(data.dashData)
       
        // console.log(data.dashData)
      }else{
        toast.error(data.response.data.message)
      }

    } catch (error) {
      // console.log(error);
      // console.log("error message",error.response.data.message)
      toast.error(error.response.data.message || "failed")
    }
  }


  
  //slot date format changing 

  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    getAllDoctors,
    appointments,setAppointments,
    getAllAppointments,
    appointmentCancel,
    appointmentCancelFromDocSide,
    dashData,
    getDashData,
    slotDateFormat,
    doctorToken,setDoctorToken,
    doctorDashData,setDoctorDashData,
    getDoctorDashData,
    completeAppointment,
    fetchAppointmentsForDoctors


  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
