import express from 'express'
import  {appointmentCancelFromDocSide, appointmentsDoctor, completeAppointment, doctorDashboard, doctorList, doctorProfile, loginDoctor, updateDoctorProfile} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';
import upload from '../middlewares/multer.js'



const doctorRouter = express.Router();


doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor);
doctorRouter.get('/doctor-appointments',authDoctor,appointmentsDoctor);
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.post('/update-profile',authDoctor,upload.single("image"),updateDoctorProfile)
doctorRouter.post('/cancelAppointment',authDoctor,appointmentCancelFromDocSide)
doctorRouter.post('/completeAppointment',authDoctor,completeAppointment)


export default doctorRouter