import express from "express"

import { addDoctor,adminDashBoard,allDoctors,appointmentCancel,apppointmentsAdmin,loginAdmin} from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor",authAdmin, upload.single("image"),addDoctor) // addDoctor from admincontroller.js
adminRouter.post("/login",loginAdmin) // loginAdmdin from admincontroller.js
adminRouter.post("/all-doctors",authAdmin,allDoctors) // allDoctors from admincontroller.js
adminRouter.get("/appointments",authAdmin,apppointmentsAdmin)
adminRouter.post("/appointmentCancel",authAdmin,appointmentCancel)//cancel any appointment
adminRouter.get("/dashboard",authAdmin,adminDashBoard)

export default adminRouter 