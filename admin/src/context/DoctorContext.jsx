import React, { createContext } from 'react'
import { useState } from 'react';

const Doctorcontext = createContext();

const DoctorcontextProvider = (props) => {

   
   const value = {
    
   }


  return (
    <Doctorcontext.Provider value={value}>
        {props.children}
    </Doctorcontext.Provider>
  )
}

export default DoctorcontextProvider
