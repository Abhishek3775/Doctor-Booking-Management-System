import React, { createContext } from 'react'

const Appcontext = createContext();

const AppcontextProvider = (props) => {

  

    const value = {

    }

  return (
    <Appcontext.Provider value={value}>
        {props.children}
    </Appcontext.Provider>
  )
}

export default AppcontextProvider
