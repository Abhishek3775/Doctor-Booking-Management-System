import express from 'express'
import  {bookAppointment, cancelAppointment, getBookedAppointment, loginUser, paymentRazorpay, registerUser, updateProfile, userProfile, verifyRazorpay}  from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter = express.Router()

userRouter.post('/register',upload.single('image'),registerUser)
userRouter.post('/userLogin',loginUser)

userRouter.get('/get-profile',authUser,userProfile)
userRouter.post('/update-profile',upload.single('image'),updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/getAppointments',authUser,getBookedAppointment)
userRouter.post('/cancelAppointment',authUser,cancelAppointment)
userRouter.post('/paymentRazorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay);




export default userRouter