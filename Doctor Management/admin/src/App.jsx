import React, { useContext } from "react";
import Login from "./pages/Login";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AllAppointments from "./pages/admin/AllAppointments";
import AddDoctor from "./pages/admin/AddDoctor";
import Dashboard from "./pages/admin/Dashboard";
import DoctorsLIst from "./pages/admin/DoctorsLIst";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import { ToastContainer, toast } from 'react-toastify';
import FakeCompo from "./components/FakeCompo";

function App() {
  const { adminToken, doctorToken } = useContext(AdminContext);

  return adminToken || doctorToken ? (
    <div className="bg-[#f8f9fd]-600">
        <ToastContainer/>
      <Navbar />
      <div className="flex items-start">
        
           <Sidebar />
        
       

        <Routes>
          {/* admin routes */}
          <Route path="/" element={<></>} />
          {/* <Route path='/' element={<FakeCompo/>} /> */}
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsLIst />} />

          {/* doctors Routes */}

          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
    </>
  );
}

export default App;
