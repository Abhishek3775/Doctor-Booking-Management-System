import express from "express"

import { addDoctor,allDoctors,loginAdmin} from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor",authAdmin, upload.single("image"),addDoctor) // addDoctor from admincontroller.js
adminRouter.post("/login",loginAdmin) // loginAdmdin from admincontroller.js
adminRouter.post("/all-doctors",authAdmin,allDoctors) // allDoctors from admincontroller.js

export default adminRouter 