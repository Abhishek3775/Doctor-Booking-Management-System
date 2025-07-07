import React, { useContext, useState } from 'react';
import {AdminContext} from "../context/AdminContext"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"


const Login= () => {

    const [state,setState] = useState("Admin")
    const {setAdminToken,backendUrl} = useContext(AdminContext);
    // console.log(backendUrl)

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e)=>{
        e.preventDefault();

        try {
            
            if(state === 'Admin'){
                const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
                if(data.success){
                  localStorage.setItem("adminToken",data.token)
                    setAdminToken(data.token)
                   toast.success(data.message)
                }else{
                  toast.error(data.message)
                }
            }
        } catch (error) {
            
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
       <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <span style={{ color: '#5f6fff' }}>{state}</span> Login
        </h2>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
          {
            state=='Admin'?
            <p>Doctor Login? <span className='text-[#5f6fff] cursor-pointer' onClick={()=>{
                setState("Doctor")
            }}>click here</span></p>
            :<p>Admin Login? <span className='text-[#5f6fff] cursor-pointer' onClick={()=>setState("Admin")}>click here</span></p>
          }
         
        </form>
      </div>
    </div>
  );
};

export default Login;
