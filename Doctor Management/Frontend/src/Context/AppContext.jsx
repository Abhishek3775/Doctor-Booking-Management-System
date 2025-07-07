// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// // 1. Create Context
// export const DoctorContext = createContext();

// // 2. Create Provider Component
// const AppContextProvider = ({ children }) => {
//   const [doctors, setDoctors] = useState([]);
//   const [token, setToken] = useState(localStorage.getItem("token") || false);
//   const [userData, setUserData] = useState(false);

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
  

//   // Fetch doctor list
//   const getDoctorsData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
//       console.log("data from appContext",data)
//       if (data.success) {
//         setDoctors(data.doctors);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error.message);
//       toast.error("Failed to load doctors data");
//     }
//   };

//   // Fetch user profile using token
//   const loadUserProfileData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ CORRECT format
//         },
//       });

//       if (data.success) {
//         setUserData(data.userData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error.message);
//       toast.error("Failed to load user profile");
//     }
//   };

//   // Load doctor list once
//   useEffect(() => {
//     getDoctorsData();
//   }, []);

//   // Load user profile when token changes
//   useEffect(() => {
//     if (token) {
//       loadUserProfileData();
//     } else {
//       setUserData(false);
//     }
//   }, [token]);

//   return (
//     <DoctorContext.Provider
//       value={{
//         doctors,
//         setDoctors,
//         token,
//         setToken,
//         userData,
//         setUserData,
//         loadUserProfileData,
//       }}
//     >
//       {children}
//     </DoctorContext.Provider>
//   );
// };

// export default AppContextProvider;


//chat gpt wala code 

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import appointmentModel from "../../../Backend/models/appointmentModel";

// 1. Create Context to hold global state
export const DoctorContext = createContext();

// 2. Context Provider Component
const AppContextProvider = ({ children }) => {
  // State to hold all doctors data fetched from backend
  const [doctors, setDoctors] = useState([]);

  // State to manage token (from localStorage) for authentication
  const [token, setToken] = useState(localStorage.getItem("token") || false);

  // State to store logged-in user's profile data
  const [userData, setUserData] = useState(false);

  //state to store 

  // Get backend URL from .env file
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // 3. Fetch list of doctors from the backend
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      // console.log("data from appContext", data);

      if (data.success) {
        setDoctors(data.doctors); // Save to state
      } else {
        toast.error(data.message); // Show error toast if API failed
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to load doctors data"); // Catch any network or server errors
    }
  };

  // 4. Fetch logged-in user's profile data using token
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Attach token in Authorization header
        },
      });

      if (data.success) {
        setUserData(data.userData); // Save user profile
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to load user profile"); // Catch auth or server errors
    }
  };

  // 5. Load doctor list when the component mounts (on first load)
  useEffect(() => {
    getDoctorsData(); // Load once
  }, []);

  // 6. Load user profile every time token changes (including on login)
  useEffect(() => {
    if (token) {
      loadUserProfileData(); // If token exists, fetch user data
    } else {
      setUserData(false); // If token removed (logout), reset user data
    }
  }, [token]);

  //get appointments from the backend
  const getAppointments = async ()=>{
    try {
      const {data} = await axios.get(`${backendUrl}/api/user/getAppointments`);
      if(data.success){

      }
      
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }

  // 7. Provide global state to children components using Context Provider
  return (
    <DoctorContext.Provider
      value={{
        doctors,            // List of all doctors
        setDoctors, 
        getDoctorsData,        // Function to update doctors
        token,              // JWT token
        setToken,           // Function to update token
        userData,           // Logged-in user data
        setUserData,        // Function to update user data
        loadUserProfileData // Function to re-fetch user data manually
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default AppContextProvider;

