import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdmincontextProvider from './context/AdminContext.jsx'
import DoctorcontextProvider from './context/DoctorContext.jsx'
import AppcontextProvider from './context/Appcontext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AdmincontextProvider>
    <DoctorcontextProvider>
      <AppcontextProvider>
      <App />
      </AppcontextProvider>
    </DoctorcontextProvider>
  </AdmincontextProvider>
  </BrowserRouter>
  
  
)
