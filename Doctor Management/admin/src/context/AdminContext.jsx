import axios from "axios";
import React, { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken")?localStorage.getItem("adminToken"):" ");
  const backendUrl = `http://localhost:9000`;

  const [doctors,setDoctors] = useState([]);

  const getAllDoctors = async ()=>{
 
    try {
      const {data} = await axios.post(backendUrl+'/api/admin/all-doctors' , {},{headers:{
        Authorization:`Bearer ${adminToken}`
      }})
      if(data.success){
        setDoctors(data.doctors)
        console.log(data.doctors)
      }
      else{
        alert(data.message)
      }
      
    } catch (error) {
      alert(error.message)
    }
  }

  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,getAllDoctors
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
